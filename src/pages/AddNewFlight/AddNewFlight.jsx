import React, { useState } from "react";
import "./AddNewFlight.scss";
import SideBar from "../../components/SideBar/SideBar";
import NavBar from "../../components/NavBarAdmin/NavBar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import success from "../../assets/images/404-tick.png";
import { toast, ToastContainer } from "react-toastify";

const AddNewFlight = () => {
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    departureDate: "",
    returnDate: "",
    numEconomyPassengers: 0,
    numBusinessPassengers: 0,
    price: "",
  });
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra ngày đi và ngày về
    const { departureDate, returnDate } = formData;
    const currentDate = new Date();

    if (new Date(departureDate) < currentDate) {
      alert("Ngày đi cần lớn hơn ngày hiện tại.");
      return;
    }

    if (new Date(returnDate) < new Date(departureDate)) {
      alert("Ngày về cần lớn hơn ngày đi.");
      return;
    }

    // Gửi dữ liệu lên backend
    try {
      await axios.post("http://localhost:5000/api/flights/add", formData);
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        navigate("/manageflight");
      }, 2000);
    } catch (error) {
      console.error("Error adding flight:", error);
    }
  };

  return (
    <div className="new">
      <SideBar />
      <div className="newContainer">
        <NavBar />
        <div className="top">
          <h1>Add New Flight</h1>
        </div>
        <div className="bottom">
          <form onSubmit={handleSubmit}>
            <div className="formInput">
              <label>From:</label>
              <input
                type="text"
                name="from"
                value={formData.from}
                onChange={handleChange}
                required
              />
            </div>
            <br />
            <div className="formInput">
              <label>To:</label>
              <input
                type="text"
                name="to"
                value={formData.to}
                onChange={handleChange}
                required
              />
            </div>
            <br />
            <div className="formInput">
              <label>Departure Date:</label>
              <input
                type="date"
                name="departureDate"
                value={formData.departureDate}
                onChange={handleChange}
                required
              />
            </div>
            <br />
            <div className="formInput">
              <label>Number of Economy Passengers:</label>
              <input
                type="number"
                name="numEconomyPassengers"
                value={formData.numEconomyPassengers}
                onChange={handleChange}
                required
              />
            </div>
            <br />
            <div className="formInput">
              <label>Number of Business Passengers:</label>
              <input
                type="number"
                name="numBusinessPassengers"
                value={formData.numBusinessPassengers}
                onChange={handleChange}
                required
              />
            </div>
            <br />
            <div className="formInput">
              <label>Price:</label>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
            <br />
            <button type="submit">Add Flight</button>
          </form>
        </div>
      </div>
      {showPopup && (
        <div className="popup">
          <img src={success} alt="" />
          <h2>Successfull</h2>
          <p>Flight has been successfully created.</p>
        </div>
      )}
    </div>
  );
};

export default AddNewFlight;
