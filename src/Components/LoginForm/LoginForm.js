import React, { useRef, useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { useTheme } from "../../Context/themeContext";
import Card from "../Card/Card";
import { Link, useNavigate } from "react-router-dom";
import "./LoginForm.css";

function LoginForm() {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // const { authorize } = useAuth();
  const isLightMode = useTheme();
  const fieldContainerClasses = `field_container ${
    isLightMode ? "" : "field_container__dark"
  }`;

  const cardStyle = {
    width: "min-content",
    boxShadow: `0 45px 45px 12px ${
      isLightMode ? "hsla(233, 11%, 84%, 0.6)" : "rgba(0, 0, 0, 0.6)"
    }`,
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  }

  return (
    <>
      <Card style={cardStyle}>
        <h2 className="login-heading">Log In</h2>
        {error ? (
          <div className={`login-error ${!isLightMode && "login-error__dark"}`}>
            {error}
          </div>
        ) : null}
        <form className="login-form" onSubmit={handleSubmit}>
          <div className={fieldContainerClasses}>
            <label htmlFor="email">Email</label>
            <input
              placeholder="email"
              id="email"
              required
              className="login-input"
              ref={emailRef}
            />
          </div>
          <div className={fieldContainerClasses}>
            <label htmlFor="password">Password</label>
            <input
              placeholder="password"
              id="password"
              required
              type="password"
              className="login-input"
              ref={passwordRef}
            />
          </div>
          <div className={fieldContainerClasses}>
            <button type="submit" className="login-btn" disabled={loading}>
              Log In
            </button>
          </div>
        </form>
        <Link to="/forgot-password" className="forgot-password__link">
          Forgot password?
        </Link>
      </Card>
      <p className="login-instructions">
        Need an account? <Link to="/signup">Sign Up</Link>
      </p>
    </>
  );
}

export default LoginForm;
