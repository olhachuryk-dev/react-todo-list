import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../Context/AuthContext.js";
import Card from "../../UI/Card/Card";
import SubmitButton from "../../UI/Button/SubmitButton";
import InputContainer from "../../UI/InputContainer/InputContainer";
import "./Authentication.css";

function SignUpForm() {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuthContext();
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
          <InputContainer>
            <label htmlFor="email">Email</label>
            <input
              placeholder="email"
              id="email"
              required
              minLength={5}
              className="login-input"
              ref={emailRef}
            />
          </InputContainer>
          <InputContainer>
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
          </InputContainer>
          <InputContainer>
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
          </InputContainer>
          <InputContainer>
            <SubmitButton disabled={loading} name={"Sign Up"} />
          </InputContainer>
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
