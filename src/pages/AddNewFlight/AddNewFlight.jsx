import React, { useEffect, useState } from "react";
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
    branch: "",
    departureDate: "",
    priceAdultEconomy: "",
    priceChildrenEconomy: "",
    priceAdultBusiness: "",
    priceChildrenBusiness: "",
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

  const [progressWidth, setProgressWidth] = useState("100%");

  useEffect(() => {
    const decreaseWidth = () => {
      setTimeout(() => {
        setProgressWidth("0%"); // Đặt độ dài ban đầu là 100%, sau đó giảm dần về 0%
      }, 2000); // Sau 2 giây, reset độ dài về 0%
    };

    decreaseWidth(); // Gọi hàm để bắt đầu giảm dần độ dài
  }, []);

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
              <label>Branch:</label>
              <input
                type="text"
                name="branch"
                value={formData.branch}
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
              <label>Price Of Adult (Economy):</label>
              <input
                type="text"
                name="priceAdultEconomy"
                value={formData.priceAdultEconomy}
                onChange={handleChange}
                required
              />
            </div>
            <br />
            <div className="formInput">
              <label>Price Of Children (Economy):</label>
              <input
                type="text"
                name="priceChildrenEconomy"
                value={formData.priceChildrenEconomy}
                onChange={handleChange}
                required
              />
            </div>
            <br />
            <div className="formInput">
              <label>Price Of Adult (Business):</label>
              <input
                type="text"
                name="priceAdultBusiness"
                value={formData.priceAdultBusiness}
                onChange={handleChange}
                required
              />
            </div>
            <br />
            <div className="formInput">
              <label>Price Of Children (Business):</label>
              <input
                type="text"
                name="priceChildrenBusiness"
                value={formData.priceChildrenBusiness}
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
