import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export default function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  console.log(currentUser&&currentUser.uid);
  return currentUser ? children : <Navigate to="/login" />;
}
