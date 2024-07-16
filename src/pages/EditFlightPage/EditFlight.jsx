import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./EditFlight.scss";
import success from "../../assets/images/404-tick.png";
import { Link } from "react-router-dom";
import SideBar from "../../components/SideBar/SideBar";
import NavBar from "../../components/NavBarAdmin/NavBar";

const UpdateFlight = () => {
  const { id } = useParams();
  const [flight, setFlight] = useState({});
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

  useEffect(() => {
    const fetchFlight = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/flights/${id}`
        );
        setFlight(response.data);
        setFormData({
          from: response.data.from,
          to: response.data.to,
          branch: response.data.branch,
          departureDate: new Date(response.data.departureDate)
            .toISOString()
            .substr(0, 10),
          priceAdultEconomy: response.data.priceAdultEconomy,
          priceChildrenEconomy: response.data.priceChildrenEconomy,
          priceAdultBusiness: response.data.priceAdultBusiness,
          priceChildrenBusiness: response.data.priceChildrenBusiness,
        });
      } catch (error) {
        console.error("Error fetching flight:", error);
      }
    };

    fetchFlight();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/flights/${id}`, formData);
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        navigate("/manageflight");
      }, 2000);
    } catch (error) {
      console.error("Error updating flight:", error);
    }
  };

  return (
    <div className="update">
      <SideBar />
      <div className="updateContainer">
        <NavBar />
        <div className="top">
          <h1 className="back">Update Flight</h1>
          <Link className="right" to="/manageFlight">
            Back
          </Link>
        </div>
        <div className="bottom">
          <form onSubmit={handleSubmit}>
            <div className="formInput">
              <label>From</label>
              <input
                type="text"
                name="from"
                value={formData.from}
                onChange={handleChange}
              />
            </div>
            <br />
            <div className="formInput">
              <label>To</label>
              <input
                type="text"
                name="to"
                value={formData.to}
                onChange={handleChange}
              />
            </div>
            <br />
            <div className="formInput">
              <label>Branch</label>
              <input
                type="text"
                name="branch"
                value={formData.branch}
                onChange={handleChange}
              />
            </div>
            <br />
            <div className="formInput">
              <label>Departure Date</label>
              <input
                type="date"
                name="departureDate"
                value={formData.departureDate}
                onChange={handleChange}
              />
            </div>
            <br />
            <div className="formInput">
              <label>Price of Adult (Economy)</label>
              <input
                type="number"
                name="priceAdultEconomy"
                value={formData.priceAdultEconomy}
                onChange={handleChange}
              />
            </div>
            <br />
            <div className="formInput">
              <label>Price of Children (Economy)</label>
              <input
                type="number"
                name="priceChildrenEconomy"
                value={formData.priceChildrenEconomy}
                onChange={handleChange}
              />
            </div>
            <br />
            <div className="formInput">
              <label>Price of Adult (Business)</label>
              <input
                type="number"
                name="priceAdultBusiness"
                value={formData.priceAdultBusiness}
                onChange={handleChange}
              />
            </div>
            <br />
            <div className="formInput">
              <label>Price of Children (Business)</label>
              <input
                type="number"
                name="priceChildrenBusiness"
                value={formData.priceChildrenBusiness}
                onChange={handleChange}
              />
            </div>
            <br />
            <button type="submit" className="submitBtn">
              Update Flight
            </button>
          </form>
        </div>
      </div>
      {showPopup && (
        <div className="popup">
          <img src={success} alt="" />
          <h2>Successfull</h2>
          <p>Flight has been successfully updated.</p>
        </div>
      )}
    </div>
  );
};

export default UpdateFlight;
