import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
const AddFlight = () => {
    const [formData, setFormData] = useState({
        from: '',
        to: '',
        departureDate: '',
        returnDate: '',
        numEconomyPassengers: 0,
        numBusinessPassengers: 0,
        price: ''
    });
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
            alert('Ngày đi cần lớn hơn ngày hiện tại.');
            return;
        }

        if (new Date(returnDate) < new Date(departureDate)) {
            alert('Ngày về cần lớn hơn ngày đi.');
            return;
        }

        // Gửi dữ liệu lên backend
        try {
            await axios.post('http://localhost:5000/api/flights/add', formData);
            toast.success('Thêm chuyến bay thành công!');
            // Chuyển hướng đến trang /manageflight
            setTimeout(() => {
                navigate('/manageflight');
            }, 2000);
        } catch (error) {
            console.error('Error adding flight:', error);
            toast.error('Đã xảy ra lỗi khi thêm chuyến bay.');
        }
    };

  return (
    <div>
        <div>
            <h1>Add New Flight</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    From:
                    <input type="text" name="from" value={formData.from} onChange={handleChange} required />
                </label>
                <br />
                <label>
                    To:
                    <input type="text" name="to" value={formData.to} onChange={handleChange} required />
                </label>
                <br />
                <label>
                    Departure Date:
                    <input type="date" name="departureDate" value={formData.departureDate} onChange={handleChange} required />
                </label>
                <br />
                <label>
                    Return Date:
                    <input type="date" name="returnDate" value={formData.returnDate} onChange={handleChange} required />
                </label>
                <br />
                <label>
                    Number of Economy Passengers:
                    <input type="number" name="numEconomyPassengers" value={formData.numEconomyPassengers} onChange={handleChange} required />
                </label>
                <br />
                <label>
                    Number of Business Passengers:
                    <input type="number" name="numBusinessPassengers" value={formData.numBusinessPassengers} onChange={handleChange} required />
                </label>
                <label>
                    Price:
                    <input type="text" name="price" value={formData.price} onChange={handleChange} required />
                </label>
                <br />
                <button type="submit">Add Flight</button>
            </form>
            <ToastContainer />
        </div>
    </div>
  )
}

export default AddFlight