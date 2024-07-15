import React from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./OrderFlightDetail.scss";

const OrderFlightDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { order } = location.state;

  const handlePayment = async () => {
    try {
      // Cập nhật trạng thái của đơn đặt hàng thành "pending"
      await axios.put(
        `http://localhost:5000/api/orderflight/${order._id}/status`,
        {
          status: "pending",
        }
      );

      // Điều hướng tới trang thanh toán
      navigate("/paymentflight", { state: { order } });
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <div className="orderflightdetail">
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
        <h1>Order Detail</h1>
      </div>
      <div className="middle">
        <h2>Flight Details</h2>
        <p>From: {order.flightDetails.from}</p>
        <p>To: {order.flightDetails.to}</p>
        <p>
          Departure Date:{" "}
          {new Date(order.flightDetails.departureDate).toLocaleString()}
        </p>
        <p>Number of Adults: {order.flightDetails.numAdults}</p>
        <p>Number of Children: {order.flightDetails.numChildren}</p>
        <p>Seat Class: {order.flightDetails.seatClass}</p>
        <p>Total Price: {order.totalPrice} VND</p>
      </div>
      <div className="middle">
        <h2>Contact Information</h2>
        <p>Name: {order.contactInfo.name}</p>
        <p>Phone: {order.contactInfo.phone}</p>
        <p>Email: {order.contactInfo.email}</p>
      </div>
      <div className="bottom">
        <h2>Passenger Information</h2>
        {order.passengerInfo.map((passenger, index) => (
          <div
            key={index}
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <h3>Passenger {index + 1}</h3>
            <p>Name: {passenger.name}</p>
            <p>Age: {passenger.age}</p>
            <p>Type: {passenger.type}</p>
          </div>
        ))}
      </div>
      <div className="btnPayment">
        <button onClick={handlePayment}>Proceed to Payment</button>
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

export default OrderFlightDetail;
