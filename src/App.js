import React, { useRef, useState } from "react";
import Header from "./Components/Header/Header";
import Main from "./Components/Main/Main";
import Footer from "./Components/Footer/Footer";
import SignUpForm from "./Components/LoginForm/SignUpForm";
import LoginForm from "./Components/LoginForm/LoginForm";
import { ThemeProvider } from "./Context/themeContext";
import { AuthProvider } from "./Context/AuthContext";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./pages/PrivateRoute";
import ResetPassword from "./Components/LoginForm/ResetPassword";

function App() {
  const [menuClicked, setMenuClicked] = useState(false);
  const menuElementRef = useRef({});
  function menuUnfocusHandler(e) {
    if (menuElementRef.current && !menuElementRef.current.contains(e.target)) {
      setMenuClicked(false);
    }
  }
  return (
    <div onClick={menuUnfocusHandler}>
      <ThemeProvider>
        <BrowserRouter>
          <AuthProvider>
            <Header
              menuClicked={menuClicked}
              setMenuClicked={setMenuClicked}
              ref={menuElementRef}
            />
            <Routes>
              <Route
                exact
                path="/"
                element={<Navigate to="/react-todo-list" />}
              />
              <Route
                exact
                path="/react-todo-list"
                element={
                  <PrivateRoute>
                    <Main />{" "}
                  </PrivateRoute>
                }
              />
              <Route path="/react-todo-list/signup" element={<SignUpForm />} />
              <Route path="/react-todo-list/login" element={<LoginForm />} />
              <Route
                path="/react-todo-list/forgot-password"
                element={<ResetPassword />}
              />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
        <Footer />
      </ThemeProvider>
    </div>
  );
}

export default App;
