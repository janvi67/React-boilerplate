import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const user = useSelector((state) => state.root.userReducer.user);
  if (!user) {
    return <Navigate to="login" />;
  }
  return <Outlet />
};
export default ProtectedRoute;
