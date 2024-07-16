import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UpdateDestination = () => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        // Fetch destination details when component mounts
        const fetchDestination = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/destinations/${id}`);
                const { name, description } = response.data;
                setName(name);
                setDescription(description);
            } catch (error) {
                console.error('Error fetching destination details:', error);
            }
        };
        fetchDestination();
    }, [id]);

    const handleUpdate = async () => {
        try {
            const response = await axios.put(`http://localhost:5000/api/destinations/${id}`, {
                name,
                description,
            });
            console.log('Update response:', response.data);
            // Handle success (e.g., show success message, redirect, etc.)
        } catch (error) {
            console.error('Error updating destination:', error);
            // Handle error (e.g., show error message)
        }
    };

    return (
        <div>
            <h1>Update Destination</h1>
            <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
                <label>
                    Destination Name:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Description:
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Update Destination</button>
            </form>
        </div>
    );
};

export default UpdateDestination;
