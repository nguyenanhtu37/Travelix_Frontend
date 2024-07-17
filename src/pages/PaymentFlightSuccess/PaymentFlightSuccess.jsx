import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import "./PaymentFlightSuccess.scss";
import success from "../../assets/images/404-tick.png";

const PaymentFlightSuccess = () => {
  return (
    <div className="paymentFlightSuccess">
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
      </header>
      <div className="middle">
        <img src={success} alt="" />
        <h2>Successfull</h2>
        <p>Flight has been successfully book.</p>
        <Link className="btnHome">Go to homepage</Link>
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
    </div>
  );
};

export default PaymentFlightSuccess;
