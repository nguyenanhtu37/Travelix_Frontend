import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import OTPForm from './components/OTPForm';
import PrivateRoute from './components/PrivateRoute';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import HomePageUser from './components/HomePageUser';
import CarRentals from './components/CarRentals';
import CarRentalsDetail from './components/CarRentalsDetail';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/verify-otp" element={<OTPForm />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path='/homepageuser' element={<HomePageUser />} />
          <Route path="/carrentals" element={<CarRentals/>} />
          <Route path="/carRentalsDetail/:registrationNumber" element={<CarRentalsDetail/>} />  


          <Route
            path="/protected-route"
            element={
              <PrivateRoute>
                {
                  HomePageUser
              }
              </PrivateRoute>
            }
          />
          {/* Add other routes as needed */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
