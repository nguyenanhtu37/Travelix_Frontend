import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import '../CSS/LandingPage.css';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../CSS/style.css';

const HomePageUser = () => {
    const [destinations, setDestinations] = useState([]);
    const [hotels, setHotels] = useState([]);

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

    const buttonStyle = {
        backgroundColor: 'cadetblue',
        color: '#FFFFFF',
        padding: '5px 10px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginTop: '10px',
        fontSize: '15px'
    };

    return (
        <div className="landing-page">
            <header className="header">
                <div className="navbar">
                    <Link to="#" className="navbar-brand">
                        <h1>Travelix</h1>
                    </Link>
                    <nav className="navbar-nav">
                        <ul className="nav">
                            {/* <li className="nav-item">
                                    <Link to="/" className="nav-link">Home</Link>
                                </li> */}
                            <li className="nav-item">
                                <Link to="/homepageuser" className="nav-link">Destinations & Trips</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/carrentals" className="nav-link">Car Rentals</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/searchflight" className="nav-link">Flights</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/cuises" className="nav-link">Hotels</Link>
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
                        {/* <Link to="/login" className="btn btn-login">Login</Link> */}
                        <Link to="/" className="btn btn-secondary">Log out</Link>
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
            <main className="main-content">
                <div className='main-title'>
                    <h1>Explorer the world with <span className='logoText'>Travelix</span></h1>
                </div>
                <div className="destination-list">
                    <h1>Popular Destinations</h1>
                    <div className="destination-items">
                        {destinations.map((destination, index) => (
                            <div key={index} className="destination-item">
                                {/* <image src='images/twitter.png'></image> */}
                                <h3>{destination.name}</h3>
                                <p>{destination.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className='main-title'>
                    <h1>Best deals ever! Hurry up before they're gone!</h1>
                </div>

                <div className="hotel-list">
                    <h1>Popular Hotels</h1>
                    <div className="hotel-items">
                        {hotels.map((hotel, index) => (
                            <div key={index} className="hotel-item">
                                <h3>{hotel.name}</h3>
                                <h4>{hotel.location}</h4>
                                <p>{hotel.description}</p>
                            </div>
                        ))}
                    </div>
                    <div className='buttonCSS'>
                        <button>Buy Now</button>
                    </div>
                </div>
            </main>
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

export default HomePageUser;
