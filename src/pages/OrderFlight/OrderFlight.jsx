import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./OrderFlight.scss";

const OrderFlight = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderData } = location.state;
  const [contactInfo, setContactInfo] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [passengerInfo, setPassengerInfo] = useState([]);

  useEffect(() => {
    // Tạo mảng hành khách từ số lượng người lớn và trẻ em
    const passengers = [];

    for (let i = 0; i < orderData.flightDetails.numAdults; i++) {
      passengers.push({
        type: "adult",
        name: "",
        age: "",
      });
    }

    for (let i = 0; i < orderData.flightDetails.numChildren; i++) {
      passengers.push({
        type: "child",
        name: "",
        age: "",
      });
    }

    setPassengerInfo(passengers);
  }, [orderData]);

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handlePassengerChange = (e, index) => {
    const { name, value } = e.target;
    setPassengerInfo((prevPassengers) => {
      const updatedPassengers = [...prevPassengers];
      updatedPassengers[index] = {
        ...updatedPassengers[index],
        [name]: value,
      };
      return updatedPassengers;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/orderflight/bookings",
        {
          orderData: {
            flightDetails: orderData.flightDetails,
            totalPrice: orderData.totalPrice,
            contactInfo,
            passengerInfo,
          },
        }
      );

      console.log("Booking successful:", response.data);
      navigate("/orderflightdetail", { state: { order: response.data.order } });
    } catch (error) {
      console.error("Error booking flight:", error);
      // Xử lý lỗi và thông báo cho người dùng
    }
  };

  return (
    <div className="orderflight">
      <header className="header">
        <div className="navbar">
          <Link to="/" className="navbar-brand">
            <h1>Travelix</h1>
          </Link>
          <nav className="navbar-nav">
            <ul className="nav">
              {/* <li className="nav-item">
                <Link to="/" className="nav-link">Home</Link>
              </li> */}
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
      <div className="top">
        <h1>Order Flight</h1>
      </div>
      <div className="middle">
        <h2>Flight Details</h2>
        <p>From: {orderData.flightDetails.from}</p>
        <p>To: {orderData.flightDetails.to}</p>
        <p>
          Departure Date:{" "}
          {new Date(orderData.flightDetails.departureDate).toLocaleString()}
        </p>
        <p>Number of Adults: {orderData.flightDetails.numAdults}</p>
        <p>Number of Children: {orderData.flightDetails.numChildren}</p>
        <p>Total Price: {orderData.totalPrice} VND</p>
      </div>
      <div className="bottom">
        <form onSubmit={handleSubmit}>
          <div>
            <h2>Contact Information</h2>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={contactInfo.name}
                onChange={handleContactChange}
                required
              />
            </label>
            <label>
              Phone:
              <input
                type="text"
                name="phone"
                value={contactInfo.phone}
                onChange={handleContactChange}
                required
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={contactInfo.email}
                onChange={handleContactChange}
                required
              />
            </label>
          </div>
          <div>
            <h2>Passenger Information</h2>
            {passengerInfo.map((passenger, index) => (
              <div key={index}>
                <h3>Passenger {index + 1}</h3>
                <label>
                  Name:
                  <input
                    type="text"
                    name="name"
                    value={passenger.name}
                    onChange={(e) => handlePassengerChange(e, index)}
                    required
                  />
                </label>
                <label>
                  Age:
                  <input
                    type="number"
                    name="age"
                    value={passenger.age}
                    onChange={(e) => handlePassengerChange(e, index)}
                    required
                  />
                </label>
              </div>
            ))}
          </div>
          <div className="btnOrder">
            <button type="submit">Submit</button>
          </div>
        </form>
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

export default OrderFlight;
