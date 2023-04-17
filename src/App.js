import "./App.css";
import React, { Suspense, lazy, useRef, useState } from "react";
import { AuthProvider } from "./Context/AuthContext";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./Components/Header/Header";
import Loading from "./UI/Loading/Loading";
const PrivateRoute = lazy(() => import("./pages/PrivateRoute"));
const Main = lazy(() => import("./Components/Main/Main"));
const Footer = lazy(() => import("./Components/Footer/Footer"));
const SignUpForm = lazy(() => import("./Components/LoginForm/SignUpForm"));
const LoginForm = lazy(() => import("./Components/LoginForm/LoginForm"));
const ResetPassword = lazy(() =>
  import("./Components/LoginForm/ResetPassword")
);

function App() {
  const [menuClicked, setMenuClicked] = useState(false);
  const menuElementRef = useRef({});
  const [isLightMode, setIsLightMode] = useState(
    localStorage.getItem("todo_light_theme") === "true"
  );

  const toggleTheme = () => {
    localStorage.setItem("todo_light_theme", !isLightMode);
    setIsLightMode((mode) => !mode);
  };
  function menuUnfocusHandler(e) {
    if (!menuClicked) return;
    if (menuElementRef.current && !menuElementRef.current.contains(e.target)) {
      setMenuClicked(false);
    }
  }
  return (
    <div
      onClick={menuUnfocusHandler}
      className={`app-container ${
        isLightMode ? "light-mode_theme" : "dark-mode_theme"
      }`}
    >
      <HashRouter>
        <AuthProvider>
          <Header
            menuClicked={menuClicked}
            setMenuClicked={setMenuClicked}
            ref={menuElementRef}
            toggleTheme={toggleTheme}
            isLightMode={isLightMode}
          />
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route
                exact
                path="/*"
                element={
                  <PrivateRoute>
                    <Main />{" "}
                  </PrivateRoute>
                }
              />
              <Route path="signup" element={<SignUpForm />} />
              <Route path="login" element={<LoginForm />} />
              <Route
                path="forgot-password"
                element={<ResetPassword />}
              />
            </Routes>
          </Suspense>
        </AuthProvider>
      </HashRouter>
      <Footer />
    </div>
  );
}

export default App;
