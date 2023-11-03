import React, { useState } from 'react';
import axios from 'axios';
import '../MechanicForm.css';

const MechanicForm = ({ onClose = () => {} }) => {
  const [formData, setFormData] = useState({
    name: '',
    empId: '',
    empStatus: 'employee',
    password: ''
  });
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/mechanics', formData);
      console.log(response.data);
      setFormData({
        name: ' ',
        empId: ' ',
        empStatus: 'employee',
        password: ''
      })//form reset
      setSuccessMessage("Mechanic added");
      onClose();
    } catch (error) {
        if(error.response && error.response.data) {
      console.error("Error adding mechanic:", error.response.data);
    } else{
        console.error("Error adding mechanic:", error.message);
    }
        
    }
  };

  return (
    <div>
      <h2>Add Mechanic</h2>

      {successMessage && <div className="success-message">{successMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Employee ID: </label>
          <input type="text" name="empId" value={formData.empId} onChange={handleChange} required />
        </div>
        <div>
          <label>Employee Status: </label>
          <select name="empStatus" value={formData.empStatus} onChange={handleChange}>
            <option value="employee">Employee</option>
            <option value="manager">Manager</option>
          </select>
        </div>
        <div>
          <label>Password: </label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit">Add Mechanic</button>
        
      </form>
    </div>
  );
  
};

export default MechanicForm;
