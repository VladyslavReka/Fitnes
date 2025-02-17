import React from "react";
import PropTypes from "prop-types";
import Modal from "../../Common/Modal"; // Ваш компонент модального вікна
import RegistrationForm from "./RegistrationForm"; // Компонент форми

const RegistrationModal = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Register New Staff"
      showActions={false} // Прибираємо кнопки дій, оскільки форма сама обробляє submit
    >
      <RegistrationForm />
    </Modal>
  );
};

RegistrationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired, // Чи відкрито модальне вікно
  onClose: PropTypes.func.isRequired, // Функція закриття модального вікна
};

export default RegistrationModal;