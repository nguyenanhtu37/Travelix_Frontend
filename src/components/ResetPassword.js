import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Slider from 'react-slick';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { token } = useParams();
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

    const handleResetPassword = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
          }
        
          try {
            console.log('Sending reset password request with token:', token);
            const response = await axios.post(`http://localhost:5000/api/users/reset-password/${token}`, { password });
            if (response.status === 200) {
              alert('Password reset successfully');
              navigate('/login');
            }
          } catch (error) {
            console.error('Error resetting password:', error);
            alert(error.response.data || 'Error resetting password');
          }
    };

    return (
        <div>
            <header className="header">
        <div className="navbar">
          <Link to="/" className="navbar-brand">
            <h1>Travelix</h1>
          </Link>
          <nav className="navbar-nav">
            <ul className="nav">
              <li className="nav-item">
                <Link to="/destinationsandtripuser" className="nav-link">Destinations & Trips</Link>
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
              <li className="nav-item">
                <Link to="/about" className="nav-link">About</Link>
              </li>
              <li className="nav-item">
                <Link to="/contact" className="nav-link">Contact</Link>
              </li>
            </ul>
          </nav>
          <div className="auth-buttons">
            <Link to="/login" className="btn btn-login">Login</Link>
            <Link to="/signup" className="btn btn-secondary">Sign up</Link>
          </div>
        </div>
        <div className="header-content">
          <Slider {...settings}>
            <div>
              <img src="/images/carousel1.jpg" alt="Slide 1" />
            </div>
            <div>
              <img src="/images/carousel2.jpg" alt="Slide 2" />
            </div>
            <div>
              <img src="/images/carousel3.jpg" alt="Slide 3" />
            </div>
            <div>
              <img src="/images/carousel4.jpg" alt="Slide 4" />
            </div>
            <div>
              <img src="/images/carousel5.jpg" alt="Slide 5" />
            </div>
            <div>
              <img src="/images/carousel6.jpg" alt="Slide 6" />
            </div>
            <div>
              <img src="/images/carousel7.jpg" alt="Slide 7" />
            </div>
            <div>
              <img src="/images/carousel8.jpg" alt="Slide 8" />
            </div>
            <div>
              <img src="/images/carousel9.jpg" alt="Slide 9" />
            </div>
            <div>
              <img src="/images/carousel10.jpg" alt="Slide 10" />
            </div>
          </Slider>
        </div>
      </header>
            <h1>Reset Password</h1>
            <form onSubmit={handleResetPassword}>
                <label>
                    New Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Confirm Password:
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Reset Password</button>
            </form>
        </div>
    );
};

export default ResetPassword;
