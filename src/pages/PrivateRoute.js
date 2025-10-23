import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../Context/AuthContext";

export default function PrivateRoute({ children }) {
  const { currentUser } = useAuthContext();
  return currentUser ? children : <Navigate to="/login" />;
}
