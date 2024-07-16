import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AddDetail = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [coordinates, setCoordinates] = useState('');
  const [opening_hours, setOpeningHours] = useState('');
  const [ticket_price, setTicketPrice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/api/destinations/${id}/details`, {
        name,
        description,
        address,
        coordinates,
        opening_hours,
        ticket_price
      });

      console.log('Detail added:', response.data);
    } catch (error) {
      console.error('Error adding detail:', error);
    }
  };

  return (
    <div>
      <h2>Add Detail to Destination</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Coordinates"
          value={coordinates}
          onChange={(e) => setCoordinates(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Opening Hours"
          value={opening_hours}
          onChange={(e) => setOpeningHours(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Ticket Price"
          value={ticket_price}
          onChange={(e) => setTicketPrice(e.target.value)}
          required
        />
        <button type="submit">Add Detail</button>
      </form>
    </div>
  );
};

export default AddDetail;
