import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./components/Login";
import UserDashboard from "./components/UserDashboard";
import AdminDashboard from "./components/AdminDashboard";

// 🔐 Protected Route Component
const ProtectedRoute = ({ children, roleRequired }) => {
  const role = sessionStorage.getItem("role");

  // Not logged in
  if (!role) {
    return <Navigate to="/" />;
  }

  // Role mismatch
  if (roleRequired && role !== roleRequired) {
    return <h3 style={{ textAlign: "center", marginTop: "50px" }}>Access Denied ❌</h3>;
  }

  return children;
};

function App() {
  return (
    <Router>
      <Routes>

        {/* 🔐 Login Page */}
        <Route path="/" element={<Login />} />

        {/* 👤 USER Dashboard */}
        <Route
          path="/user"
          element={
            <ProtectedRoute roleRequired="USER">
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        {/* 👨‍💼 ADMIN Dashboard */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute roleRequired="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* ❌ Unknown route */}
        <Route path="*" element={<h2 style={{ textAlign: "center" }}>404 Not Found</h2>} />

      </Routes>
    </Router>
  );
}

export default App;