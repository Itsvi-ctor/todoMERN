import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoutes = () => {
  const { auth } = useAuth();
  if (auth === undefined) return "It is undefined...";
  return auth === true ? <Outlet /> : <Navigate to="/auth" />;
};

export default PrivateRoutes;
