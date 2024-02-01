// LoginForm.js
import React, { useState } from 'react';
import axios from 'axios';
import '../LoginForm.css';

import { useNavigate } from 'react-router-dom';

const LoginForm = ({ onLogin }) => {
  const [empId, setempId] = useState(null);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    empId: '',
    password: ''
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
      const response = await axios.post('http://localhost:5000/api/mechanics/login', formData);
      if (response.data.success) {

        localStorage.setItem('jwtToken', response.data.token);//new token storage

        
        onLogin(response.data.empId);  // Pass the mechanicId to the callback

        alert('Login Successful');
        navigate('/dashboard'); // Navigate to the dashboard after successful login

        console.log(response.data)

      } else {
        alert(response.data.message); // This will display the server's error message
      }
    } catch (error) {
      console.error("Error during login:", error.response.data);
    }
};

  return (

    <div>
      <header className='Login-form'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Employee ID: </label>
          <input type="text" name="empId" value={formData.empId} onChange={handleChange} required />
        </div>
        <div>
          <label>Password: </label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit">Login</button>
      </form>
      </header>
    </div>
  );
};

export default LoginForm;
