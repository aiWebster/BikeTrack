import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Dashboard.css';


function Dashboard() {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div className="dashboard">
      <h2>Welcome to the Dashboard</h2>
      
      <button onClick={() => setShowOptions(!showOptions)}>Work Orders</button>

      {showOptions && (
        <div className="options">
          <Link to="/new-work-order" className="option-link">
            New Work Order
          </Link>
          <Link to="/open-orders" className="option-link">
            Open Orders
          </Link>
          <Link to="/archived-orders" className='option-link'>
            Archived Work Orders
          </Link>

        </div>
      )}
    </div>
  );
}

export default Dashboard;
