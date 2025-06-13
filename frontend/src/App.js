import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ToastProvider } from "./hooks/use-toast";
import { Toaster } from "./components/ui/toaster";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import DashboardLayout from "./components/layout/DashboardLayout";
import Overview from "./components/dashboard/Overview";
import Analytics from "./components/dashboard/Analytics";
import Bookings from "./components/dashboard/Bookings";
import Payments from "./components/dashboard/Payments";
import Messages from "./components/dashboard/Messages";
import Advertisements from "./components/dashboard/Advertisements";
import HotelRooms from "./components/services/HotelRooms";
import TourPackages from "./components/services/TourPackages";
import PastTours from "./components/services/PastTours";
import Vehicles from "./components/services/Vehicles";
import GeneralServices from "./components/services/GeneralServices";
import Profile from "./components/profile/Profile";
import Settings from "./components/profile/Settings";
import "./styles/theme.css";

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <div className="App">
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              
              {/* Protected Dashboard Routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }>
                <Route index element={<Overview />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="bookings" element={<Bookings />} />
                <Route path="payments" element={<Payments />} />
                <Route path="messages" element={<Messages />} />
                <Route path="ads" element={<Advertisements />} />
                <Route path="rooms" element={<HotelRooms />} />
                <Route path="tours" element={<TourPackages />} />
                <Route path="past-tours" element={<PastTours />} />
                <Route path="vehicles" element={<Vehicles />} />
                <Route path="services" element={<GeneralServices />} />
                <Route path="profile" element={<Profile />} />
                <Route path="settings" element={<Settings />} />
              </Route>
              
              {/* Redirect root to dashboard */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </BrowserRouter>
          <Toaster />
        </div>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;