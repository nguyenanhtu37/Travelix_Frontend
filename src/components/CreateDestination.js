import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../CSS/CreateDestination.css';

const CreateDestination = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        adaptiveHeight: true,
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/destinations/create', {
                name,
                description
            });
            console.log('Destination created:', response.data);
            alert("Create destination successfully!");
            navigate('/admin');
        } catch (error) {
            console.error('Error creating destination:', error);
            alert('Create destination failed!');
        }
    };

    return (
        <div>
            <header className="header">
                <div className="navbar">
                    <Link to="/admin" className="navbar-brand">
                        <h1>Travelix</h1>
                    </Link>
                    <nav className="navbar-nav">
                        <ul className="nav">
                            <li className="nav-item">
                                <Link to="/destinationsandtrips" className="nav-link">Destinations & Trips</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/login" className="nav-link">Car List</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/login" className="nav-link">Flights List</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/login" className="nav-link">Hotels List</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/login" className="nav-link">Activities List</Link>
                            </li>
                        </ul>
                    </nav>
                    <div className="auth-buttons">
                        <Link to="/" className="btn btn-secondary">Log out</Link>
                    </div>
                </div>
            </header>

            <div className='admin-header'>
                <div className='formcontent'>
                    <h1>Create a new destination</h1>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Destination Name" value={name} onChange={(e) => setName(e.target.value)} />
                    <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                    <button type="submit">Create Destination</button>
                </form>
                </div>
            </div>

            <a href="https://business.facebook.com/latest/inbox/all?asset_id=357364224127841" target="_blank" className="messenger-button">
                <img src="images/messenger.png" alt="Messenger" className="messenger-icon"></img>
            </a>
        </div>
    );
};

export default CreateDestination;
