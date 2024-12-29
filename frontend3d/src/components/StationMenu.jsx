import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';

function StationMenu({ closeMenu }) {
    const [stations, setStations] = useState([]);  // List of added stations
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedAirport, setSelectedAirport] = useState('');
    const [airportCode, setAirportCode] = useState('');
    const [airportDescription, setAirportDescription] = useState('');  // Description
    const [countries, setCountries] = useState([]);
    const [airportsByCountry, setAirportsByCountry] = useState({});


    // Fetch stations data when the floating menu is opened
    useEffect(() => {
        // Fetch stations from the backend
        fetch('http://localhost:8080/api/stations')
            .then(response => response.json())
            .then(data => {
                // Format the times and update the stations state
                const formattedStations = data.map(station => ({
                    ...station,
                    creTime: formatDate(station.creTime),
                    updateTime: formatDate(station.updateTime)
                }));
                setStations(formattedStations);
            })
            .catch(error => console.error('Error fetching stations:', error));

        // Fetch airports data from the raw GitHub file
        fetch('https://raw.githubusercontent.com/jpatokal/openflights/master/data/airports.dat')
            .then(response => response.text())
            .then(data => {
                // Parse the CSV data
                Papa.parse(data, {
                    complete: function (results) {
                        const airportData = results.data.map((row) => ({
                            id: row[0],  // Airport ID
                            name: row[1], // Airport name
                            city: row[2], // City
                            country: row[3], // Country
                            code: row[4], // IATA code
                            latitude: row[6], // Latitude
                            longitude: row[7], // Longitude
                        }));

                        // Group airports by country
                        const airportsByCountry = airportData.reduce((acc, airport) => {
                            if (!acc[airport.country]) {
                                acc[airport.country] = [];
                            }
                            acc[airport.country].push(airport);
                            return acc;
                        }, {});

                        // Get a unique list of countries and sort them alphabetically
                        const sortedCountries = Object.keys(airportsByCountry).sort();
                        setCountries(sortedCountries);
                        setAirportsByCountry(airportsByCountry);
                    },
                    header: false,
                });
            })
            .catch(error => {
                console.error('Error fetching airports:', error);
            });
    }, []);  // Fetch stations and airports only once on initial mount


    // Format the date from the array (e.g., [2024, 12, 29, 19, 26, 20, 210583500] -> "12/29/2024, 7:26:20 PM")
    const formatDate = (dateArray) => {
        const date = new Date(dateArray[0], dateArray[1] - 1, dateArray[2], dateArray[3], dateArray[4], dateArray[5]);
        return date.toLocaleString();  // Formats the date to a readable format
    };

    // Handle country change
    const handleCountryChange = (event) => {
        const country = event.target.value;
        setSelectedCountry(country);
        setSelectedAirport('');
        setAirportCode('');
        setAirportDescription(''); // Reset description when changing country
    };

    // Handle airport selection
    const handleAirportChange = (event) => {
        const airportId = event.target.value;
        setSelectedAirport(airportId);
        const airport = airportsByCountry[selectedCountry].find(a => a.id == airportId);
        if (airport) {
            setAirportCode(airport.code);  // Auto-fill the airport code
            setAirportDescription(airport.name);
        }
    };

    // Handle the creation of a new station
    const handleCreateStation = (event) => {
        event.preventDefault();

        if (!selectedAirport) return;  // Prevent empty submissions

        const newStation = {
            id: Date.now().toString(), // Unique ID based on timestamp
            code: airportCode,
            description: airportDescription,
            country: selectedCountry,
            airportId: selectedAirport,
            airportCode: airportCode,
            creTime: new Date().toISOString(), // Current time as ISO string
            updateTime: new Date().toISOString(), // Current time as ISO string
            updateUser: 'SystemUser', // Default update user
        };

        // Save the new station to the Cosmos DB by calling the backend API
        fetch('http://localhost:8080/api/stations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newStation),
        })
            .then(response => response.json())
            .then(savedStation => {
                // Add the saved station to the state if the backend call is successful
                setStations([...stations, savedStation]);  // Add to the list of stations
                clearForm();
            })
            .catch(error => {
                console.error('Error saving station:', error);
            });
    };

    // Clear the form after station creation
    const clearForm = () => {
        setSelectedCountry('');
        setSelectedAirport('');
        setAirportCode('');
        setAirportDescription('');
    };

    return (
        <div className="floating-menu">
            <button className="close-button" onClick={closeMenu}>✖</button>
            <h2>Create New Station</h2>

            <form onSubmit={handleCreateStation}>
                {/* Country Selector */}
                <label htmlFor="country">Select Country</label>
                <select id="country" value={selectedCountry} onChange={handleCountryChange}>
                    <option value="">-- Select Country --</option>
                    {countries.map((country) => (
                        <option key={country} value={country}>{country}</option>
                    ))}
                </select>

                {/* Airport Selector (Filtered by Country) */}
                {selectedCountry && (
                    <>
                        <label htmlFor="airport">Select Airport</label>
                        <select
                            id="airport"
                            value={selectedAirport}
                            onChange={handleAirportChange}
                        >
                            <option value="">-- Select Airport --</option>
                            {airportsByCountry[selectedCountry]?.map((airport) => (
                                <option key={airport.id} value={airport.id}>
                                    {airport.name} - {airport.city} ({airport.code})
                                </option>
                            ))}
                        </select>
                    </>
                )}

                {/* Auto-filled Airport Code */}
                <label htmlFor="airportCode">Airport Code</label>
                <input
                    type="text"
                    id="airportCode"
                    value={airportCode}
                    readOnly
                    placeholder="Airport Code"
                />

                {/* Description */}
                <label htmlFor="description">Description</label>
                <input
                    type="text"
                    id="description"
                    value={airportDescription}
                    onChange={(e) => setAirportDescription(e.target.value)}
                    placeholder="Airport Description"
                />

                <button type="submit">Create Station</button>
            </form>

            {/* Display Created Stations */}
            <h3>Created Stations</h3>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Code</th>
                    <th>Description</th>
                    <th>Created Time</th>
                    <th>Updated Time</th>
                    <th>Updated By</th>
                </tr>
                </thead>
                <tbody>
                {stations.map((station) => (
                    <tr key={station.id}>
                        <td>{station.id}</td>
                        <td>{station.code}</td>
                        <td>{station.description}</td>
                        <td>{new Date(station.creTime).toLocaleString()}</td>
                        <td>{new Date(station.updateTime).toLocaleString()}</td>
                        <td>{station.updateUser}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default StationMenu;
