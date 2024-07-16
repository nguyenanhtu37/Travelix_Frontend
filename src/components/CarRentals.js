// CarRentals.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link} from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../CSS/style.css';
import '../CSS/carrentals.css';

const CarRentals = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [filterType, setFilterType] = useState('');
  const [filterSeatingCapacity, setFilterSeatingCapacity] = useState('');
  const [filterPrice, setFilterPrice] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/cars')
      .then(response => {
        setCars(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the cars!", error);
      });
  }, []);

  useEffect(() => {
    let filtered = cars;

    if (filterType) {
      filtered = filtered.filter(car => car.type === filterType);
    }

    if (filterSeatingCapacity) {
      filtered = filtered.filter(car => car.seatingCapacity === parseInt(filterSeatingCapacity));
    }

    if (filterPrice) {
      if (filterPrice === 'low') {
        filtered = filtered.filter(car => car.rentalPricePerDay <= 500000);
      } else if (filterPrice === 'high') {
        filtered = filtered.filter(car => car.rentalPricePerDay > 500000);
      }
    }

    setFilteredCars(filtered);
  }, [filterType, filterSeatingCapacity, filterPrice, cars]);


  const handleFilterType = (type) => {
    setFilterType(type);
  };

  const handleFilterSeatingCapacity = (capacity) => {
    setFilterSeatingCapacity(capacity);
  };

  const handleFilterPrice = (price) => {
    setFilterPrice(price);
  };

  return (
    

    <div class="container">
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
                                <Link to="/homepageuser" className="nav-link">Destinations & Trips</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/carrentals" className="nav-link">Car Rentals</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/flights" className="nav-link">Flights</Link>
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
        </header>


      <div className="cars">
        <h1>Car Rentals</h1>

        <div className="filter-bar">
        <button onClick={() => handleFilterType('')}>Tất cả Hãng xe</button>
        <button onClick={() => handleFilterType('Ferrari')}>Ferrari</button>
        <button onClick={() => handleFilterType('HONDA')}>Honda</button>
        <button onClick={() => handleFilterType('BMW')}>BMW</button>
        <button onClick={() => handleFilterType('MERCEDES')}>MERCEDES</button>
        <button onClick={() => handleFilterType('KIA')}>KIA</button>

        <button onClick={() => handleFilterSeatingCapacity('')}>Tất cả Chỗ ngồi</button>
        <button onClick={() => handleFilterSeatingCapacity('4')}>4 chỗ</button>
        <button onClick={() => handleFilterSeatingCapacity('7')}>7 chỗ</button>

        <button onClick={() => handleFilterPrice('')}>Tất cả Giá tiền</button>
        <button onClick={() => handleFilterPrice('low')}>Dưới 500,000 VNĐ</button>
        <button onClick={() => handleFilterPrice('high')}>Trên 500,000 VNĐ</button>
      </div>





        <div className="car__list">
          {filteredCars.map(car => (
            <div key={car.registrationNumber} className="car__item">
              <div className="cars__img">
                <img src={car.imageUrl} alt={`${car.type} ${car.model}`} />
              </div>
              <div className="car__details">
                <h2 className="car__title">{car.type} {car.model} {car.year}</h2>
                <p className="car__location">{car.location}</p>
                <p className="car__price">{car.rentalPricePerDay} VNĐ / ngày</p>
              </div>
              <div className="car__actions">
                <Link to={`/carRentalsDetail/${car.registrationNumber}`} className="btn btn-secondary">
                  Xem chi tiết
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarRentals;
