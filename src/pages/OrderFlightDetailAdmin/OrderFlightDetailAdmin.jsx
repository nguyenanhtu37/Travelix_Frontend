// OrderFlightDetail.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import "./OrderFlightDetailAdmin.scss";

const OrderFlightDetailAdmin = () => {
  const { id } = useParams(); // Lấy id từ URL
  const [orderFlight, setOrderFlight] = useState(null);

  useEffect(() => {
    const fetchOrderFlight = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/orderflight/${id}`
        );
        setOrderFlight(response.data);
      } catch (error) {
        console.error("Error fetching order flight:", error);
      }
    };

    fetchOrderFlight();
  }, [id]);

  if (!orderFlight) {
    return <div>Loading...</div>; // Xử lý khi đang fetch dữ liệu
  }

  return (
    <div className="orderFlightDetailAdmin">
      <div className="top">
        <h2>Order Flight Detail</h2>
        <Link to="/listorderflight" className="back">
          Back
        </Link>
      </div>
      <div className="middle">
        <p>
          <strong>ID:</strong> {orderFlight._id}
        </p>
        <h3>Flight Details</h3>
        <p>
          <strong>From:</strong> {orderFlight.flightDetails.from}
        </p>
        <p>
          <strong>To:</strong> {orderFlight.flightDetails.to}
        </p>
        <p>
          <strong>Departure Date:</strong>{" "}
          {new Date(
            orderFlight.flightDetails.departureDate
          ).toLocaleDateString()}
        </p>
        <p>
          <strong>Number of Adults:</strong>{" "}
          {orderFlight.flightDetails.numAdults}
        </p>
        <p>
          <strong>Number of Children:</strong>{" "}
          {orderFlight.flightDetails.numChildren}
        </p>
        <p>
          <strong>Seat Class:</strong> {orderFlight.flightDetails.seatClass}
        </p>
      </div>

      <div className="bottom">
        <h3>Contact Information</h3>
        <p>
          <strong>Name:</strong> {orderFlight.contactInfo.name}
        </p>
        <p>
          <strong>Phone:</strong> {orderFlight.contactInfo.phone}
        </p>
        <p>
          <strong>Email:</strong> {orderFlight.contactInfo.email}
        </p>

        <h3>Passenger Information</h3>
        {orderFlight.passengerInfo.map((passenger, index) => (
          <div
            key={index}
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <h3>Passenger {index + 1}</h3>
            <p>
              <strong>Name:</strong> {passenger.name}
            </p>
            <p>
              <strong>Age:</strong> {passenger.age}
            </p>
            <p>
              <strong>Type:</strong> {passenger.type}
            </p>
          </div>
        ))}

        <p>
          <strong>Total Price:</strong> {orderFlight.totalPrice}
        </p>
        <p>
          <strong>Status:</strong> {orderFlight.status}
        </p>
        <p>
          <strong>Created At:</strong>{" "}
          {new Date(orderFlight.createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default OrderFlightDetailAdmin;
