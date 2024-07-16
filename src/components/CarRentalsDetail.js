// CarRentalsDetail.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../CSS/style.css';
import '../CSS/cardetails.css';
import {toast,ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CarRentalsDetail = () => {
  const { registrationNumber } = useParams();
  const [car, setCar] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startTime, setStartTime] = useState('21:00');
  const [endTime, setEndTime] = useState('20:00');
  const [totalPrice, setTotalPrice] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('');
  
  

  useEffect(() => {
    axios.get(`http://localhost:5000/api/cars/${registrationNumber}`)
      .then(response => {
        setCar(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the car details!", error);
      });
  }, [registrationNumber]);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

    const handleStartDateChange = (date) => {
    if (date >= new Date()) {
      setStartDate(date);
    } else {
      alert("Ngày nhận xe không thể nhỏ hơn ngày hôm nay");
    }
  };

  const handleEndDateChange = (date) => {
    if (date >= startDate) {
      setEndDate(date);
    } else {
      alert("Ngày trả xe không thể nhỏ hơn ngày nhận xe");
    }
  };

  const handleStartTimeChange = (time) => {
    const selectedDateTime = new Date(startDate);
    const [hours, minutes] = time.split(':');
    selectedDateTime.setHours(hours, minutes);
  
    if (selectedDateTime >= new Date()) {
      setStartTime(time);
    } else {
      alert("Giờ nhận xe không thể nhỏ hơn thời gian hiện tại");
    }
  };

  const handleEndTimeChange = (time) => {
    const selectedDateTime = new Date(endDate);
    const [hours, minutes] = time.split(':');
    selectedDateTime.setHours(hours, minutes);
  
    if (selectedDateTime > new Date(startDate) || (selectedDateTime >= new Date() && endDate > startDate)) {
      setEndTime(time);
    } else {
      alert("Giờ trả xe không thể nhỏ hơn giờ nhận xe");
    }
  };

  const generateTimeOptions = () => {
    const hours = [];
    for (let h = 0; h < 24; h++) {
      for (let m = 0; m < 60; m += 30) {
        const hour = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
        hours.push(hour);
      }
    }
    return hours;
  };

  // Render time options
  const renderTimeOptions = () => {
    const timeOptions = generateTimeOptions();
    return timeOptions.map((time, index) => (
      <option key={index} value={time}>{time}</option>
    ));
  };

  const calculateTotalDays = () => {
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Hàm tính toán tổng thành tiền
  const calculateTotalPrice = () => {
    const diffDays = calculateTotalDays();
    return diffDays * car.rentalPricePerDay;
  };

  const handleContinue = () => {
    // Tính toán tổng thành tiền khi ấn vào nút "Tiếp tục"
    const totalPrice = calculateTotalPrice();
    setTotalPrice(totalPrice);

    // Đóng modal chọn ngày giờ
    setIsModalOpen(false);
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };


  const isDateTimeValid = () => {
    const selectedStartDateTime = new Date(startDate);
    const [startHours, startMinutes] = startTime.split(':');
    selectedStartDateTime.setHours(startHours, startMinutes);
    
    const selectedEndDateTime = new Date(endDate);
    const [endHours, endMinutes] = endTime.split(':');
    selectedEndDateTime.setHours(endHours, endMinutes);
    
    return selectedStartDateTime <= selectedEndDateTime;
  };

  const handleBookNow = () => {
    if (!isDateTimeValid()) {
      alert("Vui lòng chọn ngày nhận và trả xe hợp lí");
      return;
    }

    if (paymentMethod) {
      const updatedQuantity = car.quantityAvailable - 1;

      axios.put(`http://localhost:5000/api/cars/${registrationNumber}`, { ...car, quantityAvailable: updatedQuantity })
        .then(response => {
          // Update local state after successful update in database
          setCar({ ...car, quantityAvailable: updatedQuantity });

          toast.success("Booking Successfully!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          
        })
        .catch(error => {
          console.error("Error updating quantity available:", error);
          alert("Booking failed. Please try again later.");
        });
    } else {
      alert("Choose your payment!");
    }
  };


  if (!car) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <header className="header">
        <div className="navbar">
          <Link to="/" className="navbar-brand">
            <h1>Travelix</h1>
          </Link>
          <nav className="navbar-nav">
            <ul className="nav">
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
            <Link to="/" className="btn btn-secondary">Log out</Link>
          </div>
        </div>
      </header>

        <div className="car-detail">
            <div class="car-detail__item">
                <div className="car-detail__images">
                    <img src={car.imageUrl} alt={`${car.type} ${car.model}`} />
                </div>

                <div class="car-detail__heading">
                    <h1>{car.type} {car.model} {car.year}</h1>
                </div>
            </div>

            <div class="car-detail__item center">
                <div className="car-detail__info">
                    <p><strong>License plate:</strong> {car.registrationNumber}</p>
                    <p><strong>Rental Price:</strong> {car.rentalPricePerDay} VNĐ / day</p>
                    <p><strong>Seats:</strong> {car.seatingCapacity}</p>
                    <p><strong>Fuel:</strong> Gas</p>
                    <p><strong>Quantity:</strong> {car.quantityAvailable}</p>
                </div>

                <div class="car__insurance">
                    <div class ="car__icon">
                        <i class="fa-solid fa-shield"></i>
                    </div>

                    <div class="car__insurance-text">
                        <h4>Bảo hiểm thuê xe </h4>

                        <h5>
                            Chuyến đi có mua bảo hiểm. Khách thuê bồi thường tối đa 2.000.000 VNĐ trong trường hợp có sự cố ngoài ý muốn.
                        </h5>
                    </div>
                </div>
            </div>


            
        </div>

        <div class="car__content">
            <div class ="car__convenient">
                <div class ="car__convenient-item">
                    <h3>Các tiện nghi khác</h3>
                    <ul>
                        <li><i className="fa-solid fa-map-marker-alt"></i> Bản đồ</li>
                        <li><i class="fa-brands fa-bluetooth-b"></i> Bluetooth</li>
                        <li><i className="fa-solid fa-video"></i> Camera hành trình</li>
                        <li><i className="fa-solid fa-camera"></i> Camera lùi</li>
                        <li><i className="fa-solid fa-map"></i> Định vị GPS</li>
                        <li><i class="fa-brands fa-usb"></i> Khe cắm USB</li>
                        <li><i class="fa-solid fa-car"></i> Lốp dự phòng</li>
                        <li><i class="fa-brands fa-airbnb"></i> Túi khí an toàn</li>
                    </ul>
                </div>
            
                <div className="rental-documents">
                    <div class="document__icon">
                        <h3>Giấy tờ thuê xe</h3>
                        <i class="fa-solid fa-question"></i>
                    </div>

                    <div class ="document__warn">
                        <i class="fa-solid fa-exclamation"></i>
                        <p>Chọn 1 trong 2 hình thức:</p>
                    </div>

                    <div class = "document__license">
                        <ul>
                            <li><i className="fa-solid fa-id-card"></i> GPLX (đối chiếu) & CCCD (đối chiếu VNeID)</li>
                            <li><i className="fa-solid fa-passport"></i> GPLX (đối chiếu) & Passport (giữ lại)</li>
                        </ul>
                    </div>
                </div>
            </div>


            <div class="booking">
            <div class ="car__booking">
                <div className="car__booking-dates" onClick={handleModalOpen}>
                    <div className="car__booking-date">
                        <p>Nhận xe</p>
                        <p>{startDate.toLocaleDateString('en-GB')} {startTime}</p>
                        <p>{startTime}</p>
                    </div>
                    <div className="car__booking-divider"></div>
                    <div className="car__booking-date">
                        <p>Trả xe</p>
                        <p>{endDate.toLocaleDateString('en-GB')} {endTime}</p>
                        <p>{endTime}</p>
                    </div>
                </div>

                {isModalOpen && (
                    <div className="modal">
                        <div className="modal-content">
                            <span className="close" onClick={handleModalClose}>&times;</span>
                            <h2>Thời gian</h2>
                            <div className="modal-calendar">
                                <DatePicker
                                    selected={startDate}
                                    onChange={handleStartDateChange}
                                    startDate={startDate}
                                    endDate={endDate}
                                    selectsStart
                                    dateFormat="dd/MM/yyyy"
                                />
                                <DatePicker
                                    selected={endDate}
                                    onChange={handleEndDateChange}
                                    startDate={startDate}
                                    endDate={endDate}
                                    selectsEnd
                                    dateFormat="dd/MM/yyyy"
                                />
                            </div>
                            <div className="modal-time">
                                <div>
                                    <label>Giờ nhận xe</label>
                                    <select value={startTime} onChange={(e) => handleStartTimeChange(e.target.value)}>
                                        {renderTimeOptions()}
                                    </select>
                                </div>
                                <div>
                                    <label>Giờ trả xe</label>
                                    <select value={endTime} onChange={(e) => handleEndTimeChange(e.target.value)}>
                                        {renderTimeOptions()}
                                    </select>
                                </div>
                            </div>
                            <button className="btn btn-primary" onClick={handleContinue}>Tiếp tục</button>
                        </div>
                    </div>
                )}


            </div>

                <div class="car__payment">
                    <p>Thành tiền:</p>
                    {totalPrice > 0 && <p>{totalPrice} VNĐ</p>}
                </div>

                <div className="car__choice">
            <div className="car__choice-item">
              <input
                type="radio"
                id="cash"
                name="paymentMethod"
                value="Cash"
                checked={paymentMethod === 'Cash'}
                onChange={handlePaymentMethodChange}
              />
              <label htmlFor="cash">Payment Cash</label>
            </div>

            <div className="car__choice-item">
              <input
                type="radio"
                id="paypal"
                name="paymentMethod"
                value="Paypal"
                checked={paymentMethod === 'Paypal'}
                onChange={handlePaymentMethodChange}
              />
              <label htmlFor="paypal">Paypal <i className="fa-brands fa-cc-paypal"></i></label>
            </div>
          </div>

                <div class="car__btn">
                    <button className="btn btn-primary" onClick={handleBookNow}>Book Now</button>
                </div>
            </div>
        </div>
        <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Slide}
      />



    </div>

    
  );
};

export default CarRentalsDetail;
