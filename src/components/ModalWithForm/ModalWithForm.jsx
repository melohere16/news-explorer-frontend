import { useEffect } from "react";
import "./ModalWithForm.css";

function ModalWithForm({
  isOpen,
  onClose,
  title,
  children,
  onSubmit,
  formClassName,
}) {
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    function handleEscape(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  function handleOverlayClick(event) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  return (
    <div className="modal" onMouseDown={handleOverlayClick}>
      <div className="modal__container">
        <button
          className="modal__close"
          type="button"
          aria-label="Close"
          onClick={onClose}
        >
          ×
        </button>

        <h2 className="modal__title">{title}</h2>

        <form className={formClassName} onSubmit={onSubmit}>
          {children}
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;