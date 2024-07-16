import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const ListFlightsSearch = () => {
  const [flights, setFlights] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFlights = async () => {
      const url = "http://localhost:5000/api/flights/search";
      const params = new URLSearchParams(window.location.search);
      const from = params.get("from");
      const to = params.get("to");

      try {
        const response = await axios.get(url, {
          params: { from, to },
        });
        setFlights(response.data);
      } catch (error) {
        console.error("Error fetching flights:", error);
        setError("Failed to fetch flights. Please try again later.");
      }
    };

    fetchFlights();
  }, []);

  return (
    <div>
      <h1>Flight Results</h1>
      {error && <p>{error}</p>}
      {flights.length > 0 ? (
        <ul>
          {flights.map((flight) => (
            <li key={flight._id}>
              From: {flight.from}, To: {flight.to}, Departure Date:{" "}
              {new Date(flight.departureDate).toLocaleDateString()}
            </li>
          ))}
        </ul>
      ) : (
        !error && <p>No flights found</p>
      )}
    </div>
  );
};

export default ListFlightsSearch;
