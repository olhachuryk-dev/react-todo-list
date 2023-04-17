import React, { useRef, useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import Card from "../../UI/Card/Card";
import { Link, useNavigate } from "react-router-dom";
import "./LoginForm.css";

function LoginForm() {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  const cardStyle = {
    width: "min-content",
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
      <Card style={cardStyle} showShadow={true}>
        <h2 className="login-heading">Log In</h2>
        {error ? (
          <div className='login-error'>
            {error}
          </div>
        ) : null}
        <form className="login-form" onSubmit={handleSubmit}>
          <div className='field_container'>
            <label htmlFor="email">Email</label>
            <input
              placeholder="email"
              id="email"
              required
              className="login-input"
              ref={emailRef}
            />
          </div>
          <div className='field_container'>
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
          <div className='field_container'>
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
        Need an account? <Link to="/signup" className="create-account__link">Sign Up</Link>
      </p>
    </>
  );
}

export default LoginForm;
