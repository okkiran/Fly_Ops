import { useState, useEffect } from 'react';

function AircraftMenu({ closeMenu }) {
    const [aircrafts, setAircrafts] = useState([]);
    const [newAircraft, setNewAircraft] = useState({ code: '', description: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [editingAircraft, setEditingAircraft] = useState(null);

    // Fetch aircraft data
    useEffect(() => {
        fetch('http://localhost:8080/api/aircrafts')
            .then((response) => response.json())
            .then((data) => setAircrafts(data))
            .catch((error) => console.error('Error fetching aircrafts:', error));
    }, []);

    // Create new aircraft
    const handleCreateAircraft = () => {
        fetch('http://localhost:8080/api/aircrafts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newAircraft),
        })
            .then((response) => response.json())
            .then((createdAircraft) => {
                setAircrafts([...aircrafts, createdAircraft]);
                setNewAircraft({ code: '', description: '' }); // Reset form fields
            })
            .catch((error) => console.error('Error creating aircraft:', error));
    };

    // Start editing an aircraft
    const handleEditAircraft = (id) => {
        setIsEditing(true);
        const aircraftToEdit = aircrafts.find((aircraft) => aircraft.id === id);
        setEditingAircraft(aircraftToEdit);
    };

    // Update the edited aircraft
    const handleUpdateAircraft = () => {
        fetch(`http://localhost:8080/api/aircrafts/${editingAircraft.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editingAircraft),
        })
            .then((response) => response.json())
            .then((updatedAircraft) => {
                setAircrafts(
                    aircrafts.map((aircraft) =>
                        aircraft.id === updatedAircraft.id ? updatedAircraft : aircraft
                    )
                );
                setIsEditing(false);
                setEditingAircraft(null);
            })
            .catch((error) => console.error('Error updating aircraft:', error));
    };

    // Delete an aircraft
    const handleDeleteAircraft = (id) => {
        fetch(`http://localhost:8080/api/aircrafts/${id}`, { method: 'DELETE' })
            .then(() => {
                setAircrafts(aircrafts.filter((aircraft) => aircraft.id !== id));
            })
            .catch((error) => console.error('Error deleting aircraft:', error));
    };

    return (
        <div className="floating-menu">
            <button className="close-button" onClick={closeMenu}>
                ✖ {/* Close Icon */}
            </button>
            <h2>Manage Aircrafts</h2>

            {/* Aircraft Creation Form */}
            <div className="form-container">
                <h3>Create Aircraft</h3>
                <input
                    type="text"
                    placeholder="Code"
                    value={newAircraft.code}
                    onChange={(e) => setNewAircraft({ ...newAircraft, code: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={newAircraft.description}
                    onChange={(e) =>
                        setNewAircraft({ ...newAircraft, description: e.target.value })
                    }
                />
                <button onClick={handleCreateAircraft} className="create-button">
                    Create Aircraft
                </button>
            </div>

            {/* Aircraft Editing Form */}
            {isEditing && (
                <div className="form-container">
                    <h3>Edit Aircraft</h3>
                    <input
                        type="text"
                        value={editingAircraft.code}
                        onChange={(e) =>
                            setEditingAircraft({ ...editingAircraft, code: e.target.value })
                        }
                    />
                    <input
                        type="text"
                        value={editingAircraft.description}
                        onChange={(e) =>
                            setEditingAircraft({ ...editingAircraft, description: e.target.value })
                        }
                    />
                    <button onClick={handleUpdateAircraft} className="update-button">
                        Update Aircraft
                    </button>
                </div>
            )}

            {/* Aircrafts Table */}
            <div>
                <h3>Aircraft List</h3>
                <table className="aircraft-table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Code</th>
                        <th>Description</th>
                        <th>Created</th>
                        <th>Last Updated</th>
                        <th>Updated By</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {aircrafts.map((aircraft) => (
                        <tr key={aircraft.id}> {/* Add the key prop here */}
                            <td>{aircraft.id}</td>
                            <td>{aircraft.code}</td>
                            <td>{aircraft.description}</td>
                            <td>{aircraft.creTime}</td>
                            <td>{aircraft.updateTime}</td>
                            <td>{aircraft.updateUser}</td>
                            <td>
                                <button
                                    className="edit-button"
                                    onClick={() => handleEditAircraft(aircraft.id)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="delete-button"
                                    onClick={() => handleDeleteAircraft(aircraft.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AircraftMenu;
