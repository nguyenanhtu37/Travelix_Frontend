import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import '../CSS/AdminDashboard.css';

const AdminDashboard = () => {
    const [userCount, setUserCount] = useState(0);
    const [destinationCount, setDestinationCount] = useState(0);
    const [hotelCount, setHotelCount] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        // Hàm để lấy tổng số người dùng từ API backend
        const fetchUserCount = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/users/count');
                setUserCount(response.data.count);
            } catch (error) {
                console.error('Lỗi khi lấy tổng số người dùng:', error);
            }
        };

        fetchUserCount();
    }, []); // Chạy chỉ một lần khi thành phần được mount

    useEffect(() => {
        const fetchDestinationCount = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/destinations/count');
                setDestinationCount(response.data.count);
            } catch (error) {
                console.error('Lỗi khi lấy tổng số điểm đến:', error);
            }
        };

        fetchDestinationCount();
    }, []); // Chạy chỉ một lần khi thành phần được mount

    const handleCreateDestination = () => {
        navigate('/admin/destinations/create');
    };

    return (
        <div className='admin-dashboard'>
            <header className="header">
                <div className="navbar">
                    <Link to="/" className="navbar-brand">
                        <h1>Travelix</h1>
                    </Link>
                    <nav className="navbar-nav">
                        <ul className="nav">
                            <li className="nav-item">
                                <Link to="/destinationsandtrips" className="nav-link">Destinations & Trips List</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/admin/destinations/create" className="nav-link">Create Destination</Link>
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
                <div className='blank-div'></div>
                <div className='main-title'>
                    <h1>Travelix Staticstics</h1>
                </div>
                <div className='admin-content'>
                    <div className="user-count-box">
                        <img src="./images/usericon.png" alt="User Icon" className="user-icon" />
                        <div className="user-count-text">
                            <h3>The number of destination: {destinationCount}</h3>
                        </div>
                        <a href="#" className="user-count-button" onClick={handleCreateDestination}>Create new</a>
                    </div>

                    <div className="user-count-box">
                        <img src="./images/usericon.png" alt="User Icon" className="user-icon" />
                        <div className="user-count-text">
                            <h3>The number of hotels: {hotelCount}</h3>
                        </div>
                        <a href="#" className="user-count-button">Manage</a>
                    </div>
                </div>

                <div className='admin-content'>
                    <div className="user-count-box">
                        <img src="./images/usericon.png" alt="User Icon" className="user-icon" />
                        <div className="user-count-text">
                            <h3>The number of flights: {userCount}</h3>
                        </div>
                        <a href="#" className="user-count-button">Manage</a>
                    </div>

                    <div className="user-count-box">
                        <img src="./images/usericon.png" alt="User Icon" className="user-icon" />
                        <div className="user-count-text">
                            <h3>The number of cars: {userCount}</h3>
                        </div>
                        <a href="#" className="user-count-button">Manage</a>
                    </div>
                </div>

                <div className='admin-content'>
                    <div className="user-count-box">
                        <img src="./images/usericon.png" alt="User Icon" className="user-icon" />
                        <div className="user-count-text">
                            <h3>The number of accounts: {userCount}</h3>
                        </div>
                        <a href="#" className="user-count-button">Manage</a>
                    </div>
                </div>
            </div>

            <a href="https://business.facebook.com/latest/inbox/all?asset_id=357364224127841" target="_blank" className="messenger-button">
                <img src="images/messenger.png" alt="Messenger" className="messenger-icon"></img>
            </a>
        </div>
    );
};

export default AdminDashboard;
