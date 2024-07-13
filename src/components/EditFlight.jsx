import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditFlight() {
    const { id } = useParams();
    const [flight, setFlight] = useState({});
    const [formData, setFormData] = useState({
        from: '',
        to: '',
        departureDate: '',
        returnDate: '',
        numEconomyPassengers: '',
        numBusinessPassengers: '',
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFlight = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/flights/${id}`);
                setFlight(response.data);
                setFormData({
                    from: response.data.from,
                    to: response.data.to,
                    departureDate: new Date(response.data.departureDate).toISOString().substr(0, 10),
                    returnDate: new Date(response.data.returnDate).toISOString().substr(0, 10),
                    numEconomyPassengers: response.data.numEconomyPassengers.toString(),
                    numBusinessPassengers: response.data.numBusinessPassengers.toString(),
                });
            } catch (error) {
                console.error('Error fetching flight:', error);
            }
        };

        fetchFlight();
    }, [id]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/flights/${id}`, formData);
            navigate('/manageflight');
        } catch (error) {
            console.error('Error updating flight:', error);
        }
    };

    return (
        <div>
            <h1>Edit Flight from {flight.from} to {flight.to}</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="from"
                    placeholder="From"
                    value={formData.from}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="to"
                    placeholder="To"
                    value={formData.to}
                    onChange={handleChange}
                    required
                />
                <input
                    type="date"
                    name="departureDate"
                    placeholder="Departure Date"
                    value={formData.departureDate}
                    onChange={handleChange}
                    required
                />
                <input
                    type="date"
                    name="returnDate"
                    placeholder="Return Date"
                    value={formData.returnDate}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="numEconomyPassengers"
                    placeholder="Number of Economy Passengers"
                    value={formData.numEconomyPassengers}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="numBusinessPassengers"
                    placeholder="Number of Business Passengers"
                    value={formData.numBusinessPassengers}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Update Flight</button>
            </form>
        </div>
    );
}

export default EditFlight;
