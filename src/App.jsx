import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import ActionBar from './components/ActionBar';
import ContactList from './components/ContactList';
import ContactModal from './components/ContactModal';
import DeleteModal from './components/DeleteModal';


const App = () => {
  // State: Contacts (with LocalStorage)
  const [contacts, setContacts] = useState(() => {
    try {
      const saved = localStorage.getItem('contacts_data');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem('contacts_data', JSON.stringify(contacts));
  }, [contacts]);

  // State: UI
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteConfig, setDeleteConfig] = useState({ show: false, type: null, id: null });
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', address: '' });

  // Handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const openAddModal = () => {
    setEditId(null);
    setFormData({ name: '', phone: '', email: '', address: '' });
    setShowModal(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert("Name and Phone are required!");
      return;
    }

    if (editId) {
      setContacts(prev => prev.map(c => c.id === editId ? { ...c, ...formData } : c));
      toast.info("Contact updated successfully");
    } else {
      setContacts(prev => [...prev, { id: Date.now(), ...formData, isChecked: false }]);
      toast.success("Contact added successfully");
    }
    setFormData({ name: '', phone: '', email: '', address: '' });
    setShowModal(false);
    setEditId(null);
  };

  const handleEditClick = (contact) => {
    setFormData({
      name: contact.name,
      phone: contact.phone,
      email: contact.email || '',
      address: contact.address || ''
    });
    setEditId(contact.id);
    setShowModal(true);
  };

  const toggleCheckbox = (id) => {
    setContacts(prev => prev.map(c => c.id === id ? { ...c, isChecked: !c.isChecked } : c));
  };

  const toggleSelectAll = (e) => {
    const isChecked = e.target.checked;
    setContacts(prev => prev.map(c => ({ ...c, isChecked })));
  };

  // Delete Handlers
  const confirmDeleteSingle = (id) => setDeleteConfig({ show: true, type: 'single', id });
  const confirmDeleteBulk = () => setDeleteConfig({ show: true, type: 'bulk', id: null });
  
  const executeDelete = () => {
    if (deleteConfig.type === 'single') {
      setContacts(prev => prev.filter(c => c.id !== deleteConfig.id));
      toast.error("Contact deleted successfully");
    } else {
      setContacts(prev => prev.filter(c => !c.isChecked));
      toast.error("Contacts deleted successfully");
    }
    setDeleteConfig({ show: false, type: null, id: null });
  };

  // Derived State
  const filteredContacts = contacts.filter(c => {
    const term = searchTerm.toLowerCase();
    return c.name.toLowerCase().includes(term) || c.phone.includes(term) || (c.email && c.email.toLowerCase().includes(term));
  });

  const allSelected = contacts.length > 0 && contacts.every(c => c.isChecked);
  const selectedCount = contacts.filter(c => c.isChecked).length;

  return (
    <div className="app-container">
      <ToastContainer position="bottom-right" autoClose={3000} />
      
      <Navbar onAddClick={openAddModal} />

      <div className="main-content">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        
        <ActionBar 
          hasContacts={contacts.length > 0}
          allSelected={allSelected}
          toggleSelectAll={toggleSelectAll}
          selectedCount={selectedCount}
          confirmDeleteBulk={confirmDeleteBulk}
        />

        {contacts.length === 0 ? (
          <div className="empty-state">No Contacts Added</div>
        ) : (
          <ContactList 
            contacts={filteredContacts}
            onToggle={toggleCheckbox}
            onEdit={handleEditClick}
            onDelete={confirmDeleteSingle}
          />
        )}
      </div>

      <ContactModal 
        show={showModal}
        editId={editId}
        formData={formData}
        onChange={handleInputChange}
        onSave={handleSave}
        onCancel={() => setShowModal(false)}
      />

      <DeleteModal 
        show={deleteConfig.show}
        onConfirm={executeDelete}
        onCancel={() => setDeleteConfig({ show: false, type: null, id: null })}
      />
    </div>
  );
};

export default App;