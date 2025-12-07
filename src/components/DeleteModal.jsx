import React from 'react';

const DeleteModal = ({ show, onConfirm, onCancel }) => {
  if (!show) return null;
  
  return (
    <div className="modal-overlay">
      <div className="modal-content delete-modal-content">
        <div className="delete-modal-title">Are You Sure?</div>
        <div className="button-group center-btn-group">
          <button className="btn btn-delete-confirm" onClick={onConfirm}>Delete</button>
          <button className="btn btn-cancel" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;