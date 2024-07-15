import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./ChooseFlight.scss";

const ChooseFlight = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [flight, setFlight] = useState(null);
  const [numAdults, setNumAdults] = useState(1);
  const [numChildren, setNumChildren] = useState(0);
  const [seatClass, setSeatClass] = useState("economy");

  useEffect(() => {
    const fetchFlight = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/flights/choose/${id}`
        );
        setFlight(response.data);
      } catch (error) {
        console.error("Error fetching flight details:", error);
      }
    };

    fetchFlight();
  }, [id]);

  if (!flight) return <div>Loading...</div>;

  const calculateTotalPrice = () => {
    const adultPrice =
      seatClass === "economy"
        ? flight.priceAdultEconomy
        : flight.priceAdultBusiness;
    const childPrice =
      seatClass === "economy"
        ? flight.priceChildrenEconomy
        : flight.priceChildrenBusiness;
    return numAdults * adultPrice + numChildren * childPrice;
  };

  const handleBookNow = () => {
    const orderData = {
      flightDetails: {
        from: flight.from,
        to: flight.to,
        departureDate: flight.departureDate,
        numAdults: numAdults,
        numChildren: numChildren,
        seatClass: seatClass,
      },
      totalPrice: calculateTotalPrice(),
    };

    navigate("/orderflight", { state: { orderData } });
  };

  return (
    <div className="chooseflight">
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
        <h1>Booking Flight</h1>
      </div>
      <div className="bottom">
        <p>From: {flight.from}</p>
        <p>To: {flight.to}</p>
        <p>Departure Date: {new Date(flight.departureDate).toLocaleString()}</p>
        <p>Branch: {flight.branch}</p>
        <div>
          <label>
            Number of Adults:
            <input
              type="number"
              min="1"
              value={numAdults}
              onChange={(e) => setNumAdults(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Number of Children:
            <input
              type="number"
              min="0"
              value={numChildren}
              onChange={(e) => setNumChildren(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Seat Class:
            <select
              value={seatClass}
              onChange={(e) => setSeatClass(e.target.value)}
            >
              <option value="economy">Economy</option>
              <option value="business">Business</option>
            </select>
          </label>
        </div>
        <div>
          <p>Total Price: {calculateTotalPrice()} VND</p>
        </div>
        <div className="btnBook">
          <button onClick={handleBookNow}>Book Now</button>
        </div>
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

export default ChooseFlight;
