import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import '../CSS/style.css';

const SignUpForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
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

  const handleSignUp = async () => {
    const user = {
      name,
      username,
      password,
      confirmpassword,
      phone,
    };

    try {
      const response = await fetch('http://localhost:5000/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        navigate('/verify-otp', { state: user });
      } else {
        const errorData = await response.json();
        alert('Error signing up: ' + errorData.message);
      }
    } catch (error) {
      console.error('Error: ', error);
      alert('Error signing up');
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
      <div className="form-container">
        <h1>Sign up a new account</h1>
        <form onSubmit={(e) => { e.preventDefault(); handleSignUp(); }}>
          <div className="form-content">
            <label>
              Full name:
              <input
                className='form-items'
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder='Enter your full name'
              />
            </label>
            <label>
              Email address:
              <input
                className='form-items'
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder='Enter your email address: (Example: travelix@gmail.com)'
              />
            </label>
            <label>
              Password:
              <input
                className='form-items'
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder='Enter your password'
              />
            </label>
            <label>
              Confirm password:
              <input
                className='form-items'
                type="password"
                value={confirmpassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder='Repeat your password'
              />
            </label>
            <label>
              Phone number:
              <input
                className='form-items'
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                placeholder='Enter your phone number'
              />
            </label>
          </div>
          <button type="submit">Sign up</button>
        </form>
      </div>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section about">
            <h3>About Travelix</h3>
            <p>Explore the world with Travelix, your trusted partner in discovering the best destinations and experiences.</p>
          </div>
          <div className="footer-section links">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/destinations">Destinations</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer-section contact">
            <h3>Contact Us</h3>
            <p>Email: nguyenanhtu3703@gmail.com</p>
            <p>Phone: +84 839 706 916</p>
            <p>Address: Hòa Hải, Ngũ Hành Sơn, Đà Nẵng</p>
          </div>
          <div className="footer-section social">
            <h3>Follow Us</h3>
            <a href="#"><img src="/images/amz.png" alt="Facebook"></img></a>
            <a href="#"><img src="/images/twitter.png" alt="Twitter"></img></a>
            <a href="#"><img src="/images/ig.png" alt="Instagram"></img></a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Travelix. All rights reserved.</p>
        </div>
      </footer>

      <a href="https://m.me/357364224127841" target="_blank" className="messenger-button">
        <img src="images/messenger.png" alt="Messenger" className="messenger-icon"></img>
      </a>
    </div>
  );
};

export default SignUpForm;
