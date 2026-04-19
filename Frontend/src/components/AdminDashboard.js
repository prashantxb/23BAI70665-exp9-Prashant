import React from "react";
import axios from "axios";

function AdminDashboard() {
  const role = sessionStorage.getItem("role");

  if (role !== "ADMIN") {
    alert("Access Denied");
    window.location.href = "/";
  }

  const fetchAdmin = async () => {
    const res = await axios.get("http://localhost:8080/api/admin/dashboard");
    alert(res.data.message);
  };

  return (
    <div className="container mt-5">
      <h2>Admin Dashboard</h2>
      <button className="btn btn-danger" onClick={fetchAdmin}>Admin Data</button>
    </div>
  );
}

export default AdminDashboard;