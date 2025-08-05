import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");

  // If no token → redirect to login
  return token ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
