import { useState } from "react";
import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function LoginModal({ isOpen, onClose, onSignUpClick, onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isFormValid = email.trim() !== "" && password.trim() !== "";

  function handleSubmit(event) {
    event.preventDefault();
    onLoginSuccess();
  }

  return (
    <ModalWithForm isOpen={isOpen} onClose={onClose} title="Sign in">
      <form className="login-modal__form" onSubmit={handleSubmit}>
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
          onChange={(event) => setEmail(event.target.value)}
        />

        <label className="login-modal__label" htmlFor="login-password">
          Password
        </label>

        <input
          className="login-modal__input"
          required
          id="login-password"
          name="password"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <button
          className={`login-modal__submit ${
            isFormValid ? "login-modal__submit_active" : ""
          }`}
          type="submit"
        >
          Sign in
        </button>

        <p className="login-modal__switch">
          or{" "}
          <button type="button" onClick={onSignUpClick}>
            Sign up
          </button>
        </p>
      </form>
    </ModalWithForm>
  );
}

export default LoginModal;
