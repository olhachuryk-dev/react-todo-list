import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { useAuthContext } from "../../Context/AuthContext.js";
import Card from "../../UI/Card/Card";
import InputContainer from "../../UI/InputContainer/InputContainer";
import SubmitButton from "../../UI/Button/SubmitButton";
import "./Authentication.css";

function LoginForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuthContext();
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
        <h2 className="login-heading">{t('auth.login')}</h2>
        {error ? <div className="login-error">{error}</div> : null}
        <form className="login-form" onSubmit={handleSubmit}>
          <InputContainer>
            <label htmlFor="email">{t('auth.email')}</label>
            <input
              placeholder={t('auth.email')}
              id="email"
              required
              className="login-input"
              ref={emailRef}
              data-testid="email-input"
            />
          </InputContainer>
          <InputContainer>
            <label htmlFor="password">{t('auth.password')}</label>
            <input
              placeholder={t('auth.password')}
              id="password"
              required
              type="password"
              className="login-input"
              ref={passwordRef}
              data-testid="password-input"
            />
          </InputContainer>
          <InputContainer>
            <SubmitButton disabled={loading} name={t('auth.login')} />
          </InputContainer>
        </form>
        <Link to="/forgot-password" className="forgot-password__link">
          {t('auth.forgotPassword')}
        </Link>
      </Card>
      <p className="login-instructions">
        {t('auth.noAccount')}{" "}
        <Link to="/signup" className="create-account__link">
          {t('auth.signUpHere')}
        </Link>
      </p>
    </>
  );
}

export default LoginForm;
