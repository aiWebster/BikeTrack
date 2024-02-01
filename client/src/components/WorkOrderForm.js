
import React, { useState } from 'react';
import axios from 'axios';
import '../WorkOrderForm.css';


const WorkOrderForm = ({ }) => {
  const [formData, setFormData] = useState({
    status:'open',
    empId:'',
    bike:'',
    date:'',
    mechanicName:'',
    servicesCompleted: '',
    cost: '',
    customerName: '',
    customerNumber: '',
    notes:''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post('http://localhost:5000/api/workorders', {
        ...formData,
       
        
      });
      console.log(response.data);
      // Handle success - maybe redirect or show a success message
    } catch (error) {
      console.error("Error creating work order:", error);
    }
  };

  return ( 
  <div className="form-container">
    <form onSubmit={handleSubmit}>
    <div>
  <label>Status: </label>
  <select 
        name="status" 
        value={formData.status} 
        onChange={handleChange}
    >
        <option value="open">Open</option>
        <option value="waiting for pickup">Waiting for Pickup</option>
        <option value="complete">Complete</option>
    </select></div>
    <div>
  <label>Date: </label>
  <input type="date" name="date" value={formData.date} onChange={handleChange} required />
</div>
    <div>
  <label>Customer Name: </label>
  <input type="text" name="customerName" value={formData.customerName} onChange={handleChange} required />
</div>
<div>
  <label>Customer Phone Number: </label>
  <input type="text" name="customerNumber" value={formData.customerNumber} onChange={handleChange} required />
</div>
<div>
  <label>Bike: </label>
  <input type="text" name="bike" value={formData.bike} onChange={handleChange} required />
</div>
      <div>
  <label>Services Completed: </label>
  <input type="text" name="servicesCompleted" value={formData.servicesCompleted} onChange={handleChange} required />
</div>
<div>
  <label>Mechanic Name: </label>
  <input type="text" name="mechanicName" value={formData.mechanicName} onChange={handleChange} required />
</div>
<div>
  <label>Cost: </label>
  <input type="number" name="cost" value={formData.cost} onChange={handleChange} required />
</div>
<div>
  <label>Employee ID: </label>
  <input type="number" name="empId" value={formData.empId} onChange={handleChange} required />
</div>
<div>
  <label>Notes: </label>
  <textarea 
      name="notes" 
      value={formData.notes} 
      onChange={handleChange} 
      rows="5" 
      cols="50" 
      placeholder="Enter any additional notes here..."
  ></textarea>
</div>

      <button type="submit">Submit Work Order</button>
    </form>
    </div>
  );
};

export default WorkOrderForm;
