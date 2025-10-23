import "./App.css";
import React, { Suspense, lazy, useRef, useState } from "react";
import { AuthProvider } from "./Context/AuthContext.js";
import { HashRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import Loading from "./UI/Loading/Loading";
import iconCrystal from "./Components/assets/icon-crystal.svg";
const PrivateRoute = lazy(() => import("./pages/PrivateRoute"));
const Main = lazy(() => import("./Components/Main/Main"));
const Footer = lazy(() => import("./Components/Footer/Footer"));
const SignUpForm = lazy(() => import("./Components/Authentication/SignUpForm"));
const LoginForm = lazy(() => import("./Components/Authentication/LoginForm"));
const ResetPassword = lazy(() =>
  import("./Components/Authentication/ResetPassword")
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
              <Route path="forgot-password" element={<ResetPassword />} />
            </Routes>
          </Suspense>
        </AuthProvider>
      </HashRouter>
      <Footer />
      <button
        type="button"
        title="Report Scam"
        className="scam-alert-button"
        onClick={() =>
          window.openScamAlertWidget("https://scam.cbeng.io/widget", {
            theme: isLightMode
              ? {
                  "bg-brand": "hsl(280, 87%, 65%)",
                  "bg-secondary": "#b5b5b5",
                  "bg-primary": "#ffffff",
                  "bg-tertiary": "#edceec",
                  border: "#b5b5b5",
                  "text-primary": "#000000",
                  "text-secondary": "#000000",
                  "text-tertiary": "#000000",
                  "error-text": "red",
                  "bg-input": "#ffffff",
                }
              : {
                  "bg-brand": "hsl(280, 87%, 65%)",
                  "bg-secondary": "hsl(235, 24%, 19%);",
                  "bg-primary": "hsl(235, 21%, 11%)",
                  "bg-tertiary": "hsl(237, 14%, 26%)",
                  border: "hsl(237, 14%, 26%)",
                  "text-primary": "hsl(0, 0%, 66%)",
                  "text-secondary": "hsl(234, 11%, 52%)",
                  "text-tertiary": "hsl(234, 11%, 52%)",
                  "error-text": "hsl(0, 53%, 58%)",
                  "bg-input": "hsl(235, 24%, 19%)",
                },
          })
        }
      >
        <img src={iconCrystal} alt="scam-alert" />
      </button>
    </div>
  );
}

export default App;
