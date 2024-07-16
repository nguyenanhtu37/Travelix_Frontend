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
// import AdminDashboard from './components/AdminDashBoard';
import AddDetail from './components/AddDetail';
import CreateDestination from './components/CreateDestination';
import DestinationsAndTrips from './components/DestinationsAndTrips';
import DestinationsAndTripsUser from './components/DestinationsAndTripsUser';
import UpdateDestination from './components/UpdateDestination';
import AdminDashboard from './pages/AdminPage/AdminDashBoard';
import ListUsers from './pages/ListUsers/ListUsers';
import ListFlights from './pages/ListFlights/ListFlights';
import EditFlight from './pages/EditFlightPage/EditFlight';
import AddNewFlight from './pages/AddNewFlight/AddNewFlight';
import SearchFlight from './pages/SearchFlight/SearchFlight';
import ListFlightsSearch from './pages/ListFlightsSerach/ListFlightsSearch';
import ChooseFlight from './pages/ChooseFlight/ChooseFlight';
import OrderForm from './pages/OrderFlight/OrderFlight';
import OrderFlightDetail from './pages/OrderFlightDetail/OrderFlightDetail';
import PaymentFlight from './pages/PaymentFlight/PaymentFlight';
import PaymentFlightSuccess from './pages/PaymentFlightSuccess/PaymentFlightSuccess';
import ListOrderFlight from './pages/ListOrderFlight/ListOrderFlight';
import OrderFlightDetailAdnin from './pages/OrderFlightDetailAdmin/OrderFlightDetailAdmin';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/destinations/:id/details" element={<UpdateDestination />} />
          <Route path="/destinationsandtripuser" element={<DestinationsAndTripsUser />} />
          <Route path="/destinationsandtrips" element={<DestinationsAndTrips />} />
          <Route path="/verify-otp" element={<OTPForm />} />
          <Route path="/admin/destinations/create" element={<CreateDestination />} />
          <Route path="/admin/destinations/:id/details" element={<AddDetail />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path='/homepageuser' element={<HomePageUser />} />
          <Route path="/carrentals" element={<CarRentals/>} />
          <Route path="/carRentalsDetail/:registrationNumber" element={<CarRentalsDetail/>} />  

          <Route path='/manageflight' element={<ListFlights />} />
          <Route path='/addflight' element={<AddNewFlight />} />
          <Route path='/:id' element={<EditFlight />} />
          <Route path='/choose/:id' element={<ChooseFlight />} />
          <Route path='/listusers' element={<ListUsers />} />
          <Route path='/searchflight' element={<SearchFlight />} />
          <Route path='/listflightssearch' element={<ListFlightsSearch />} />
          <Route path='/orderflight' element={<OrderForm />} />
          <Route path='/orderflightdetail' element={<OrderFlightDetail />} />
          <Route path='/paymentflight' element={<PaymentFlight />} />
          <Route path='/paymentflightsuccess' element={<PaymentFlightSuccess />} />
          <Route path='/listorderflight' element={<ListOrderFlight />} />
          <Route path='/orderflightdetailadmin/:id' element={<OrderFlightDetailAdnin />} />

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
