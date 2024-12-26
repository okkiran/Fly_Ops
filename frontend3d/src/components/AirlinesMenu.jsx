import { useState, useEffect } from 'react';

function AirlinesMenu({ closeMenu }) {
    const [airlines, setAirlines] = useState([]);
    const [newAirline, setNewAirline] = useState({ code: '', description: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [editingAirline, setEditingAirline] = useState(null);

    // Fetch airlines data
    useEffect(() => {
        fetch('http://localhost:8080/api/airlines')
            .then((response) => response.json())
            .then((data) => setAirlines(data))
            .catch((error) => console.error('Error fetching airlines:', error));
    }, []);

    // Create new airline
    const handleCreateAirline = () => {
        fetch('http://localhost:8080/api/airlines', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newAirline),
        })
            .then((response) => response.json())
            .then((createdAirline) => {
                setAirlines([...airlines, createdAirline]);
                setNewAirline({ code: '', description: '' });
            })
            .catch((error) => console.error('Error creating airline:', error));
    };

    // Start editing an airline
    const handleEditAirline = (id) => {
        setIsEditing(true);
        const airlineToEdit = airlines.find((airline) => airline.id === id);
        setEditingAirline(airlineToEdit);
    };

    // Update the edited airline
    const handleUpdateAirline = () => {
        fetch(`http://localhost:8080/api/airlines/${editingAirline.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editingAirline),
        })
            .then((response) => response.json())
            .then((updatedAirline) => {
                setAirlines(
                    airlines.map((airline) =>
                        airline.id === updatedAirline.id ? updatedAirline : airline
                    )
                );
                setIsEditing(false);
                setEditingAirline(null);
            })
            .catch((error) => console.error('Error updating airline:', error));
    };

    // Delete an airline
    const handleDeleteAirline = (id) => {
        fetch(`http://localhost:8080/api/airlines/${id}`, { method: 'DELETE' })
            .then(() => {
                setAirlines(airlines.filter((airline) => airline.id !== id));
            })
            .catch((error) => console.error('Error deleting airline:', error));
    };

    return (
        <div className="floating-menu">
            <button className="close-button" onClick={closeMenu}>
                ✖ {/* Close Icon */}
            </button>
            <h2>Manage Airlines</h2>

            {/* Airline Creation Form */}
            <div className="form-container">
                <h3>Create Airline</h3>
                <input
                    type="text"
                    placeholder="Code"
                    value={newAirline.code}
                    onChange={(e) => setNewAirline({ ...newAirline, code: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={newAirline.description}
                    onChange={(e) =>
                        setNewAirline({ ...newAirline, description: e.target.value })
                    }
                />
                <button onClick={handleCreateAirline} className="create-button">
                    Create Airline
                </button>
            </div>

            {/* Airline Editing Form */}
            {isEditing && (
                <div className="form-container">
                    <h3>Edit Airline</h3>
                    <input
                        type="text"
                        value={editingAirline.code}
                        onChange={(e) =>
                            setEditingAirline({ ...editingAirline, code: e.target.value })
                        }
                    />
                    <input
                        type="text"
                        value={editingAirline.description}
                        onChange={(e) =>
                            setEditingAirline({ ...editingAirline, description: e.target.value })
                        }
                    />
                    <button onClick={handleUpdateAirline} className="update-button">
                        Update Airline
                    </button>
                </div>
            )}

            {/* Airlines Table */}
            <div>
                <h3>Airline List</h3>
                <table className="airline-table">
                    <thead>
                    <tr>
                        <th>Code</th>
                        <th>Description</th>
                        <th>Created</th>
                        <th>Last Updated</th>
                        <th>Updated By</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {airlines.map((airline) => (
                        <tr key={airline.id}>
                            <td>{airline.code}</td>
                            <td>{airline.description}</td>
                            <td>{airline.creTime}</td>
                            <td>{airline.updateTime}</td>
                            <td>{airline.updateUser}</td>
                            <td>
                                <button
                                    className="edit-button"
                                    onClick={() => handleEditAirline(airline.id)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="delete-button"
                                    onClick={() => handleDeleteAirline(airline.id)}
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

export default AirlinesMenu;
