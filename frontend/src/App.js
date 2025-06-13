import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
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
import "./styles/theme.css";

function App() {
  return (
    <AuthProvider>
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
              <Route path="tours" element={<div className="p-8 text-center text-gray-500">Tour Packages component coming soon...</div>} />
              <Route path="past-tours" element={<div className="p-8 text-center text-gray-500">Past Tours component coming soon...</div>} />
              <Route path="vehicles" element={<div className="p-8 text-center text-gray-500">Vehicles component coming soon...</div>} />
              <Route path="services" element={<div className="p-8 text-center text-gray-500">Services component coming soon...</div>} />
              <Route path="profile" element={<div className="p-8 text-center text-gray-500">Profile component coming soon...</div>} />
              <Route path="settings" element={<div className="p-8 text-center text-gray-500">Settings component coming soon...</div>} />
            </Route>
            
            {/* Redirect root to dashboard */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </BrowserRouter>
        <Toaster />
      </div>
    </AuthProvider>
  );
}

export default App;
