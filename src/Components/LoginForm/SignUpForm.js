import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import Card from "../../UI/Card/Card";
import "./LoginForm.css";

function SignUpForm() {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const cardStyle = {
    width: "min-content",
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
      navigate("/");
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  }

  return (
    <>
      <Card style={cardStyle} showShadow={true}>
        <h2 className="login-heading">Sign Up</h2>
        {error ? <div className="login-error">{error}</div> : null}
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="field_container">
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
          <div className="field_container">
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
          <div className="field_container">
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
          <div className="field_container">
            <button type="submit" className="login-btn" disabled={loading}>
              Sign Up
            </button>
          </div>
        </form>
      </Card>
      <p className="login-instructions">
        Already have an account?{" "}
        <Link to="/login" className="create-account__link">
          Log In
        </Link>
      </p>
    </>
  );
}

export default SignUpForm;
