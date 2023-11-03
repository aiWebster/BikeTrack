import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Dropdown.css';


const Dropdown = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`dropdown ${props.className || ''}`}>
      <button onClick={() => setIsOpen(!isOpen)}>Menu</button>
      {isOpen && (
        <div className="dropdown-content">
          <Link to="/add-mechanic" onClick={() => setIsOpen(false)}>Add Mechanic</Link>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
