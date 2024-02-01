// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import axios from 'axios';
import MechanicForm from './components/MechanicForm';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import WorkOrderForm from './components/WorkOrderForm';
import OpenWorkOrders from './components/OpenWorkOrders';
import ArchivedWorkOrders from './components/ArchivedWorkOrders';

import Main from './Main'; 
import "./App.css";


function App() {
  useEffect(() => {
    if (localStorage.jwtToken) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.jwtToken;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, []);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mechanicId, setMechanicId] = useState(null);

  const handleLogin = (id) => {
    setIsLoggedIn(true);
    setMechanicId(id);
  }
  return (
    <Router>
      <div className="App">
        <TransitionGroup>
          <CSSTransition timeout={450} classNames="fade">
            <Routes>
              <Route path="/" element={<Main isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
              <Route path="/login" element={<LoginForm onLogin={() => setIsLoggedIn(true)} />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/new-work-order" element={<WorkOrderForm mechanicId={mechanicId} />} />
              <Route path="/open-orders" element={<OpenWorkOrders />} />
              <Route path="/archived-orders" element={<ArchivedWorkOrders/>} />
              <Route path="/add-mechanic" element={<MechanicForm />} />
            </Routes>
          </CSSTransition>
        </TransitionGroup>
      </div>
    </Router>
  );
}

export default App;
