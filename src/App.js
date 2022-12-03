import React from "react";
import Header from "./Components/Header/Header";
import Main from "./Components/Main/Main";
import Footer from "./Components/Footer/Footer";
import SignUpForm from "./Components/LoginForm/SignUpForm";
import LoginForm from "./Components/LoginForm/LoginForm";
import { ThemeProvider } from "./Context/themeContext";
import { AuthProvider } from "./Context/AuthContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./pages/PrivateRoute";
import "./App.css";
import ResetPassword from "./Components/LoginForm/ResetPassword";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AuthProvider>
          <Header />
          <Routes>
            <Route
              exact
              path="/"
              element={
                <PrivateRoute>
                  <Main />{" "}
                </PrivateRoute>
              }
            />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/forgot-password" element={<ResetPassword />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
