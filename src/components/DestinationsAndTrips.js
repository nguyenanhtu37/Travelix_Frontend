import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../CSS/LandingPage.css';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../CSS/DestinationsAndTrips.css';

const DestinationsAndTrips = () => {
    const [destinations, setDestinations] = useState([]);
    const [hotels, setHotels] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/destinations')
            .then(response => {
                setDestinations(response.data);
            })
            .catch(error => {
                console.error('Error fetching destinations:', error);
            });
    }, []);

    useEffect(() => {
        axios.get('http://localhost:5000/api/hotels')
            .then(response => {
                setHotels(response.data);
            })
            .catch(error => {
                console.error('Error fetching hotels:', error);
            });
    }, []);



    const handleUpdate = async (id) => {
        console.log('Update destination with id:', id);
    };

    const handleDelete = async (id) => {
        console.log('Delete destination with id:', id);

        const userConfirmed = window.confirm("Are you sure to delete this destination?");

        if (userConfirmed) {
            try {
                const response = await axios.delete(`http://localhost:5000/api/destinations/${id}`);
                console.log('Delete response:', response.data);
                fetchDestinations(); //update list
            } catch (error) {
                console.error('Error deleting destination:', error);
            }
        } else {
            console.log('Delete operation canceled by user.');
        }
    };


    const fetchDestinations = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/destinations');
            setDestinations(response.data);
        } catch (error) {
            console.error('Error fetching destinations:', error);
        }
    };

    return (
        <div className="landing-page">
            <header className="header">
                <div className="navbar">
                    <Link to="/admin" className="navbar-brand">
                        <h1>Travelix</h1>
                    </Link>
                    <nav className="navbar-nav">
                        <ul className="nav">
                            <li className="nav-item">
                                <Link to="#" className="nav-link">Destinations & Trips</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/cars" className="nav-link">Car Rentals</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/flights" className="nav-link">Flights</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/hotels" className="nav-link">Hotels</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/activities" className="nav-link">Activities</Link>
                            </li>
                        </ul>
                    </nav>
                    <div className="auth-buttons">
                        <Link to="/" className="btn btn-secondary">Log out</Link>
                    </div>
                </div>
                <div className="header-content">

                </div>
            </header>
            <main className="main-content">
                <div className='main-title'>
                    <h1>Destinations and Trips Management</h1>
                </div>
                <div className="destination-list">
                    <div className="destination-items">
                        {destinations.map((destination, index) => (
                            <div key={index} className="destination-item">
                                <h3>{destination.name}</h3>
                                <p>{destination.description}</p>
                                <div className="button-container">
                                    <Link to={`/admin/destinations/${destination._id}/details`}>
                                        <button className="update-button">Update</button>
                                    </Link>
                                    <button className="delete-button" onClick={() => handleDelete(destination._id)}>Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            <a href="https://business.facebook.com/latest/inbox/all?asset_id=357364224127841" target="_blank" className="messenger-button">
                <img src="images/messenger.png" alt="Messenger" className="messenger-icon"></img>
            </a>
        </div>
    );
};

export default DestinationsAndTrips;
