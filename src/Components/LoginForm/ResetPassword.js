import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { useTheme } from "../../Context/themeContext";
import Card from "../Card/Card";
import "./LoginForm.css";

function ResetPassword() {
  const { resetPassword } = useAuth();
  const navigate = useNavigate();
  const isLightMode = useTheme();
  const emailRef = useRef();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check you inbox for further instructions");
    } catch (e) {
      setError(e.message);
    }

    setLoading(false);
  }

  function goBackHandler() {
    return navigate("/login");
  }

  return (
    <>
      <Card style={cardStyle}>
        <h2 className="login-heading">Password Reset</h2>
        {error ? (
          <div className={`login-error ${!isLightMode && "login-error__dark"}`}>
            {error}
          </div>
        ) : null}
        <div
          className={`password-reset_message ${!isLightMode&&"password-reset_message__dark"}`}
          style={{ display: message ? "block" : "none" }}
        >
          {message}
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className={fieldContainerClasses}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              placeholder="email"
              type="email"
              required
              className="login-input"
              ref={emailRef}
            />
          </div>
          <div className={fieldContainerClasses}>
            <button type="submit" className="login-btn" disabled={loading}>
              Reset Password
            </button>
          </div>
        </form>
        <p onClick={goBackHandler} className="forgot-password__link">
          Back to Login
        </p>
      </Card>
      <p className="login-instructions">
        You will reseive an email with link to reset your password.
      </p>
    </>
  );
}

export default ResetPassword;
