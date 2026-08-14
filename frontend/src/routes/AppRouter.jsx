import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "../pages/home/Home";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Profile from "../pages/profile/Profile";
import Dashboard from "../pages/dashboard/Dashboard";

import DonationList from "../pages/donor/DonationList";
import CreateDonation from "../pages/donor/CreateDonation";
import EditDonation from "../pages/donor/EditDonation";
import ReservationRequests from "../pages/donor/ReservationRequests";

import AvailableDonations from "../pages/ngo/AvailableDonations";
import DonationDetails from "../pages/ngo/DonationDetails";
import MyReservations from "../pages/ngo/MyReservations";
import NGODashboard from "../pages/ngo/NGODashboard";

import NotFound from "../pages/errors/NotFound";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        {/* HOME */}

        <Route
          path="/"
          element={<Home />}
        />

        {/* AUTH */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* GENERAL DASHBOARD */}

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        {/* =================================================
            DONOR
        ================================================= */}

        <Route
          path="/donations"
          element={<DonationList />}
        />

        <Route
          path="/donations/create"
          element={<CreateDonation />}
        />

        <Route
          path="/donations/:id/edit"
          element={<EditDonation />}
        />

        {/* DONOR RESERVATION REQUESTS */}

        <Route
          path="/donor/reservations"
          element={
            <ReservationRequests />
          }
        />
        <Route
  path="/profile"
  element={<Profile />}
/>

        {/* =================================================
            NGO
        ================================================= */}

        <Route
          path="/ngo/donations"
          element={
            <AvailableDonations />
          }
        />

        <Route
          path="/ngo/donations/:id"
          element={
            <DonationDetails />
          }
        />

        <Route
          path="/ngo/reservations"
          element={
            <MyReservations />
          }
        />

        <Route
          path="/ngo/dashboard"
          element={
            <NGODashboard />
          }
        />

        {/* 404 */}

        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;