import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Slider from "react-slick";
import "../CSS/style.css";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  // const history = useHistory();

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

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          username,
          password,
        }
      );

      if (response.status === 200) {
        alert("Login successful!");
        localStorage.setItem("token", response.data.token); // Lưu token vào localStorage

        const role = decodeToken(response.data.token).role;
        if (role === "admin") {
          // history.push('/admin');
          navigate("/admin");
        } else if (role === "user") {
          navigate("/homepageuser");
        } else {
          alert("Unknown role");
        }
      } else {
        alert("Invalid username or password");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Error logging in");
    }
  };

  const decodeToken = (token) => {
    try {
      const decoded = jwtDecode(token);
      return decoded;
    } catch (error) {
      console.error("Error decoding token:", error);
      return {};
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
                <Link to="/destinationsandtripuser" className="nav-link">
                  Destinations & Trips
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/cars" className="nav-link">
                  Car Rentals
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/searchflight" className="nav-link">
                  Flights
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/hotels" className="nav-link">
                  Hotels
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/activities" className="nav-link">
                  Activities
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/contact" className="nav-link">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
          <div className="auth-buttons">
            <Link to="/login" className="btn btn-login">
              Login
            </Link>
            <Link to="/signup" className="btn btn-secondary">
              Sign up
            </Link>
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
        <h1>Login to Travelix</h1>
        <form onSubmit={handleLogin}>
          <div className="form-content">
            <label>
              Email address:
              <input
                className="form-items"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Enter your email address:"
              />
            </label>
            <label>
              Password:
              <input
                className="form-items"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
              />
            </label>
          </div>
          <button type="submit">Login</button>
        </form>
        <Link to="/forgot-password">Forgot Password?</Link>
      </div>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section about">
            <h3>About Travelix</h3>
            <p>
              Explore the world with Travelix, your trusted partner in
              discovering the best destinations and experiences.
            </p>
          </div>
          <div className="footer-section links">
            <h3>Quick Links</h3>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/destinations">Destinations</a>
              </li>
              <li>
                <a href="/about">About Us</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
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
            <a href="#">
              <img src="/images/amz.png" alt="Facebook"></img>
            </a>
            <a href="#">
              <img src="/images/twitter.png" alt="Twitter"></img>
            </a>
            <a href="#">
              <img src="/images/ig.png" alt="Instagram"></img>
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Travelix. All rights reserved.</p>
        </div>
      </footer>

      <a
        href="https://m.me/357364224127841"
        target="_blank"
        className="messenger-button"
      >
        <img
          src="images/messenger.png"
          alt="Messenger"
          className="messenger-icon"
        ></img>
      </a>
    </div>
  );
};

export default LoginForm;
