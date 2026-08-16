import "./SuccessModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function SuccessModal({ isOpen, onClose, onSignInClick }) {
  return (
    <ModalWithForm isOpen={isOpen} onClose={onClose} title="">
      <div className="success-modal">
        <h2 className="success-modal__title">
          Registration successfully completed!
        </h2>

        <button
          className="success-modal__signin"
          type="button"
          onClick={onSignInClick}
        >
          Sign in
        </button>
      </div>
    </ModalWithForm>
  );
}

export default SuccessModal;
