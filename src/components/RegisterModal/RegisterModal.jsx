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

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPasswordValid = password.length >= 6;
  const isUsernameValid = username.trim().length >= 2;

  const isFormValid = isEmailValid && isPasswordValid && isUsernameValid;

  function handleSubmit(event) {
    event.preventDefault();

    onRegistrationSuccess(username.trim());
  }

  return (
    <ModalWithForm isOpen={isOpen} onClose={onClose} title="Sign up">
      <form className="register-modal__form" onSubmit={handleSubmit}>
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
          onChange={(event) => setEmail(event.target.value)}
        />

        <label className="register-modal__label" htmlFor="register-password">
          Password
        </label>

        <input
          className="register-modal__input"
          required
          id="register-password"
          name="password"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <label className="register-modal__label" htmlFor="register-username">
          Username
        </label>

        <input
          className="register-modal__input register-modal__input_last"
          id="register-username"
          name="username"
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />

        <button
          className={`register-modal__submit ${
            isFormValid ? "register-modal__submit_active" : ""
          }`}
          type="submit"
        >
          Sign up
        </button>

        <p className="register-modal__switch">
          or{" "}
          <button type="button" onClick={onSignInClick}>
            Sign in
          </button>
        </p>
      </form>
    </ModalWithForm>
  );
}

export default RegisterModal;
