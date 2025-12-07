import React from 'react';

const ContactModal = ({ show, editId, formData, onChange, onSave, onCancel }) => {
  if (!show) return null;
  
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">{editId ? 'Edit Contact' : 'Add New Contact'}</div>
        <form onSubmit={onSave}>
          <div className="form-group">
            <label>Name</label>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={onChange} 
              placeholder="abc" 
              required 
            />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input 
              type="tel" 
              name="phone" 
              value={formData.phone} 
              onChange={onChange} 
              placeholder="123-456-7890" 
              required 
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={onChange} 
              placeholder="abc@example.com" 
            />
          </div>
          <div className="form-group">
            <label>Address</label>
            <textarea 
              name="address" 
              value={formData.address} 
              onChange={onChange} 
              placeholder="123 Main St, City..." 
            />
          </div>
          <div className="button-group">
            <button type="button" className="btn btn-cancel" onClick={onCancel}>Cancel</button>
            <button 
              type="submit" 
              className={`btn ${editId ? 'btn-update' : 'btn-save'}`}
            >
              {editId ? 'Update' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactModal;