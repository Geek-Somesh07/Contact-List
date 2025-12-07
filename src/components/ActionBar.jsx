import React from 'react';
import { Trash2 } from 'lucide-react';

const ActionBar = ({ hasContacts, allSelected, toggleSelectAll, selectedCount, confirmDeleteBulk }) => {
  if (!hasContacts) return null;
  return (
    <div className="action-bar">
      <label className="select-all-container">
        <input 
          type="checkbox" 
          className="select-all-checkbox"
          checked={allSelected}
          onChange={toggleSelectAll}
        />
        <span>Select All</span>
      </label>
      
      {selectedCount > 0 && (
        <button className="bulk-delete-btn" onClick={confirmDeleteBulk}>
          <Trash2 size={16} />
          Delete ({selectedCount})
        </button>
      )}
    </div>
  );
};

export default ActionBar;