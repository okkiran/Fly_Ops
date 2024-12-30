import { useState, useEffect } from 'react';

function FlightMenu({ closeMenu }) {
    const [createdAirlines, setCreatedAirlines] = useState([]); // Stores created airlines
    const [createdAircrafts, setCreatedAircrafts] = useState([]); // Stores created aircrafts
    const [createdFlights, setCreatedFlights] = useState([]); // Stores created flights
    const [createdStations, setCreatedStations] = useState([]); // Stores created stations
    const [newFlight, setNewFlight] = useState({
        flightNo: '', airline: '', aircraft: '', flightLeg: 'Arr', flightDate: '', systemAirport: '', originStation: ''
    });
    const [loading, setLoading] = useState(true);

    // Fetch created airlines data from the Airline API (previously created)
    useEffect(() => {
        fetch('http://localhost:8080/api/airlines')
            .then(response => response.json())
            .then(data => setCreatedAirlines(data))
            .catch(error => console.error('Error fetching airlines:', error));
    }, []);

    // Fetch created aircrafts data from the Aircraft API (previously created)
    useEffect(() => {
        fetch('http://localhost:8080/api/aircrafts')
            .then(response => response.json())
            .then(data => setCreatedAircrafts(data))
            .catch(error => console.error('Error fetching aircrafts:', error));
    }, []);

    // Fetch created flights data from the Flight API
    useEffect(() => {
        fetch('http://localhost:8080/api/flights')
            .then(response => response.json())
            .then(data => {
                setCreatedFlights(data);
                setLoading(false);
            })
            .catch(error => console.error('Error fetching flights:', error));
    }, []);

    // Fetch created stations data from the Stations API
    useEffect(() => {
        fetch('http://localhost:8080/api/stations')
            .then(response => response.json())
            .then(data => {
                console.log('Fetched stations:', data);  // Log the fetched data
                setCreatedStations(data);
            })
            .catch(error => {
                console.error('Error fetching stations:', error);
                setCreatedStations([]);
            });
    }, []);



    // Handle flight form changes
    const handleFlightChange = (e) => {
        setNewFlight({
            ...newFlight,
            [e.target.name]: e.target.value,
        });
    };

    // Handle flight creation
    const handleCreateFlight = () => {
        const { flightNo, airline, aircraft, flightLeg, flightDate, systemAirport, originStation } = newFlight;

        fetch('http://localhost:8080/api/flights', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                flightNo,
                airline,
                aircraft,
                flightLeg,
                flightDate,
                systemAirport,
                originStation,
                creTime: new Date(),
                updateTime: new Date(),
                updateUser: 'System',
            }),
        })
            .then(response => response.json())
            .then(createdFlight => {
                setCreatedFlights([...createdFlights, createdFlight]);
                setNewFlight({ flightNo: '', airline: '', aircraft: '', flightLeg: 'Arr', flightDate: '', systemAirport: '', originStation: '' });
            })
            .catch(error => console.error('Error creating flight:', error));
    };

    return (
        <div className="floating-menu">
            <button className="close-button" onClick={closeMenu}>✖</button>
            <h2>Manage Flights</h2>

            {/* Flight Creation Form */}
            <div className="form-container">
                <h3>Create Flight</h3>
                {loading ? <p>Loading...</p> : (
                    <form>
                        <label>Flight No:</label>
                        <input
                            type="text"
                            name="flightNo"
                            value={newFlight.flightNo}
                            onChange={handleFlightChange}
                        />
                        <br/>

                        <label>Airline:</label>
                        <select
                            name="airline"
                            value={newFlight.airline}
                            onChange={handleFlightChange}
                        >
                            <option value="">Select Airline</option>
                            {createdAirlines.map(airline => (
                                <option key={airline.id} value={airline.id}>{airline.description}</option>
                            ))}
                        </select>
                        <br/>

                        <label>Aircraft:</label>
                        <select
                            name="aircraft"
                            value={newFlight.aircraft}
                            onChange={handleFlightChange}
                        >
                            <option value="">Select Aircraft</option>
                            {createdAircrafts.map(aircraft => (
                                <option key={aircraft.id} value={aircraft.id}>{aircraft.description}</option>
                            ))}
                        </select>
                        <br/>

                        <label>Flight Leg:</label>
                        <select
                            name="flightLeg"
                            value={newFlight.flightLeg}
                            onChange={handleFlightChange}
                        >
                            <option value="Arr">Arrival</option>
                            <option value="Dep">Departure</option>
                        </select>
                        <br/>

                        <label>Flight Date:</label>
                        <input
                            type="date"
                            name="flightDate"
                            value={newFlight.flightDate}
                            onChange={handleFlightChange}
                        />
                        <br/>

                        <label>System Airport:</label>
                        <select
                            name="systemAirport"
                            value={newFlight.systemAirport}
                            onChange={handleFlightChange}
                        >
                            <option value="">Select System Airport</option>
                            {createdStations.length > 0 ? (
                                createdStations.map(station => (
                                    <option key={station.id} value={station.id}>
                                        {station.name}
                                    </option>
                                ))
                            ) : (
                                <option value="">No stations available</option>
                            )}
                        </select>
                        <br/>

                        <label>Origin Station:</label>
                        <select
                            name="originStation"
                            value={newFlight.originStation}
                            onChange={handleFlightChange}
                        >
                            <option value="">Select Origin Station</option>
                            {createdStations.length > 0 ? (
                                createdStations.map(station => (
                                    <option key={station.id} value={station.id}>
                                        {station.name}
                                    </option>
                                ))
                            ) : (
                                <option value="">No stations available</option>
                            )}
                        </select>
                        <br/>


                        <button type="button" onClick={handleCreateFlight}>Create Flight</button>
                    </form>
                )}
            </div>

            {/* Created Flights Table */}
            <div>
                <h3>Created Flights</h3>
                <table className="flight-table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Flight No</th>
                        <th>Airline</th>
                        <th>Aircraft</th>
                        <th>Flight Leg</th>
                        <th>Flight Date</th>
                        <th>Created</th>
                        <th>Last Updated</th>
                        <th>Updated By</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {createdFlights.map((flight) => (
                        <tr key={flight.id}>
                            <td>{flight.id}</td>
                            <td>{flight.flightNo}</td>
                            <td>{flight.airline.description}</td>
                            <td>{flight.aircraft.description}</td>
                            <td>{flight.flightLeg}</td>
                            <td>{flight.flightDate}</td>
                            <td>{flight.creTime}</td>
                            <td>{flight.updateTime}</td>
                            <td>{flight.updateUser}</td>
                            <td>
                                <button onClick={() => handleEditFlight(flight.id)}>Edit</button>
                                <button onClick={() => handleDeleteFlight(flight.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default FlightMenu;
