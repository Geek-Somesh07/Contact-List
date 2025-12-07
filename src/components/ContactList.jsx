import React from 'react';
import { Info, Trash2 } from 'lucide-react';

const ContactItem = ({ contact, onToggle, onEdit, onDelete }) => (
  <li className="contact-row">
    <div className="row-left">
      <input 
        type="checkbox" 
        className="contact-checkbox"
        checked={contact.isChecked}
        onChange={() => onToggle(contact.id)}
      />
      <div className="contact-info-text">
        <span className="contact-name">{contact.name}</span>
        <span className="contact-phone">{contact.phone}</span>
      </div>
    </div>
    
    <div className="row-actions">
      <button 
        className="icon-btn info-btn" 
        onClick={() => onEdit(contact)}
        title="Edit Details"
      >
        <Info size={22} />
      </button>
      <button 
        className="icon-btn delete-btn" 
        onClick={() => onDelete(contact.id)}
        title="Delete Contact"
      >
        <Trash2 size={22} />
      </button>
    </div>
  </li>
);

const ContactList = ({ contacts, onToggle, onEdit, onDelete }) => {
  if (contacts.length === 0) {
    return (
      <div className="empty-state" style={{position: 'relative', marginTop: '50px', transform: 'none'}}>
        No matches found
      </div>
    );
  }
  
  return (
    <ul className="contact-list">
      {contacts.map((contact) => (
        <ContactItem 
          key={contact.id} 
          contact={contact} 
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};

export default ContactList;