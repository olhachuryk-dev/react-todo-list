import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { useTheme } from "../../Context/themeContext";
import Card from "../Card/Card";
import "./LoginForm.css";

function SignUpForm() {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
    if (passwordConfirmRef.current.value !== passwordRef.current.value) {
      return setError("Passwords do not match");
    }
    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      navigate("/react-todo-list/");
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  }

  return (
    <>
      <Card style={cardStyle}>
        <h2 className="login-heading">Sign Up</h2>
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
              minLength={5}
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
              minLength={8}
              type="password"
              className="login-input"
              ref={passwordRef}
            />
          </div>
          <div className={fieldContainerClasses}>
            <label htmlFor="password_repeat">Confirm password</label>
            <input
              placeholder="confirm password"
              id="password_repeat"
              required
              minLength={8}
              type="password"
              className="login-input"
              ref={passwordConfirmRef}
            />
          </div>
          <div className={fieldContainerClasses}>
            <button type="submit" className="login-btn" disabled={loading}>
              Sign Up
            </button>
          </div>
        </form>
      </Card>
      <p className="login-instructions">
        Already have an account? <Link to="/react-todo-list/login">Log In</Link>
      </p>
    </>
  );
}

export default SignUpForm;
