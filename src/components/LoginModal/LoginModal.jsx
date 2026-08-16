import { useState } from "react";
import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function LoginModal({ isOpen, onClose, onSignUpClick, onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPasswordValid = password.length >= 6;
  const isFormValid = isEmailValid && isPasswordValid;

  function handleEmailChange(event) {
    const value = event.target.value;
    setEmail(value);

    if (value === "") {
      setEmailError("Email is required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  }

  function handlePasswordChange(event) {
    const value = event.target.value;
    setPassword(value);

    if (value === "") {
      setPasswordError("Password is required");
    } else if (value.length < 6) {
      setPasswordError("Password must be at least 6 characters");
    } else {
      setPasswordError("");
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!isFormValid) {
      return;
    }

    onLoginSuccess();
  }

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Sign in"
      onSubmit={handleSubmit}
      formClassName="login-modal__form"
    >
      <label className="login-modal__label" htmlFor="login-email">
        Email
      </label>

      <input
        className="login-modal__input"
        required
        id="login-email"
        name="email"
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={handleEmailChange}
      />

      {emailError && (
        <span className="login-modal__error">{emailError}</span>
      )}

      <label className="login-modal__label" htmlFor="login-password">
        Password
      </label>

      <input
        className="login-modal__input"
        required
        minLength="6"
        id="login-password"
        name="password"
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={handlePasswordChange}
      />

      {passwordError && (
        <span className="login-modal__error">{passwordError}</span>
      )}

      <button
        className={`login-modal__submit ${
          isFormValid ? "login-modal__submit_active" : ""
        }`}
        type="submit"
        disabled={!isFormValid}
      >
        Sign in
      </button>

      <p className="login-modal__switch">
        or{" "}
        <button type="button" onClick={onSignUpClick}>
          Sign up
        </button>
      </p>
    </ModalWithForm>
  );
}

export default LoginModal;