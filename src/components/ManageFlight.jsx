import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ManageFlight = () => {
    const [flights, setFlights] = useState([]);

    useEffect(() => {
        const fetchFlights = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/flights');
                setFlights(response.data);
            } catch (error) {
                console.error('Error fetching flights:', error);
            }
        };

        fetchFlights();
    }, []);

    const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to mark this flight as inactive?')) {
        try {
            await axios.delete(`http://localhost:5000/api/flights/${id}`);
            setFlights(flights.map(flight =>
                flight._id === id ? { ...flight, isActive: false } : flight
            ));
            // Không cần reload trang, vì setFlights đã cập nhật UI tự động
        } catch (error) {
            console.error('Error marking flight as inactive:', error);
        }
    }
};
  return (
    <div>
            <h1>List of Flights</h1>
            <table>
                <thead>
                    <tr>
                        <th>From</th>
                        <th>To</th>
                        <th>Departure Date</th>
                        <th>Return Date</th>
                        <th>Economy Passengers</th>
                        <th>Business Passengers</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {flights.map((flight) => (
                        <tr key={flight._id}>
                            <td>{flight.from}</td>
                            <td>{flight.to}</td>
                            <td>{new Date(flight.departureDate).toLocaleDateString()}</td>
                            <td>{new Date(flight.returnDate).toLocaleDateString()}</td>
                            <td>{flight.numEconomyPassengers}</td>
                            <td>{flight.numBusinessPassengers}</td>
                            <td>
                              <Link to={`/edit/${flight._id}`}>Edit</Link>
                              <button onClick={() => handleDelete(flight._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
  )
}

export default ManageFlight