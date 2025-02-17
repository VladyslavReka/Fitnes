import React, { useState } from "react";
import PropTypes from "prop-types";
import Modal from "../../Common/Modal";
import EditStaffForm from "./EditStaffForm";

const EditStaffModal = ({ isOpen, onClose, staffData, onSave, isLoading }) => {
  const handleFormSubmit = (updatedData) => {
    onSave(updatedData); // Передаємо оновлені дані в батьківський компонент
  };

  return (
    <Modal
      isOpen={isOpen}
      title="Edit Staff Member"
      onClose={onClose}
      showActions={false} // Дії (кнопки) будуть всередині форми
    >
      <EditStaffForm
        initialData={staffData}
        onSubmit={handleFormSubmit}
        isLoading={isLoading}
      />
    </Modal>
  );
};

EditStaffModal.propTypes = {
  isOpen: PropTypes.bool.isRequired, // Чи відкрито модальне вікно
  onClose: PropTypes.func.isRequired, // Функція закриття модального вікна
  staffData: PropTypes.object, // Початкові дані для форми
  onSave: PropTypes.func.isRequired, // Функція для збереження змін
  isLoading: PropTypes.bool, // Статус завантаження
};

export default EditStaffModal;