import { useState } from "react";
import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function RegisterModal({
  isOpen,
  onClose,
  onSignInClick,
  onRegistrationSuccess,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPasswordValid = password.length >= 6;
  const isUsernameValid = username.trim().length >= 2;

  const isFormValid = isEmailValid && isPasswordValid && isUsernameValid;

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

  function handleUsernameChange(event) {
    const value = event.target.value;
    setUsername(value);

    if (value.trim() === "") {
      setUsernameError("Username is required");
    } else if (value.trim().length < 2) {
      setUsernameError("Username must be at least 2 characters");
    } else {
      setUsernameError("");
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!isFormValid) {
      return;
    }

    onRegistrationSuccess(username.trim());
  }

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Sign up"
      onSubmit={handleSubmit}
      formClassName="register-modal__form"
    >
      <label className="register-modal__label" htmlFor="register-email">
        Email
      </label>

      <input
        className="register-modal__input"
        required
        id="register-email"
        name="email"
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={handleEmailChange}
      />

      {emailError && (
        <span className="register-modal__error">{emailError}</span>
      )}

      <label className="register-modal__label" htmlFor="register-password">
        Password
      </label>

      <input
        className="register-modal__input"
        required
        minLength="6"
        id="register-password"
        name="password"
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={handlePasswordChange}
      />

      {passwordError && (
        <span className="register-modal__error">{passwordError}</span>
      )}

      <label className="register-modal__label" htmlFor="register-username">
        Username
      </label>

      <input
        className="register-modal__input register-modal__input_last"
        required
        minLength="2"
        id="register-username"
        name="username"
        type="text"
        placeholder="Enter your username"
        value={username}
        onChange={handleUsernameChange}
      />

      {usernameError && (
        <span className="register-modal__error">{usernameError}</span>
      )}

      <button
        className={`register-modal__submit ${
          isFormValid ? "register-modal__submit_active" : ""
        }`}
        type="submit"
        disabled={!isFormValid}
      >
        Sign up
      </button>

      <p className="register-modal__switch">
        or{" "}
        <button type="button" onClick={onSignInClick}>
          Sign in
        </button>
      </p>
    </ModalWithForm>
  );
}

export default RegisterModal;