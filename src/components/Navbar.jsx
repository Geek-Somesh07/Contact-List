import React from 'react';
import { Plus } from 'lucide-react';

const Navbar = ({ onAddClick }) => (
  <nav className="navbar">
    <h1>Contact List</h1>
    <button className="add-btn" onClick={onAddClick} title="Add Contact">
      <Plus size={24} />
    </button>
  </nav>
);

export default Navbar;