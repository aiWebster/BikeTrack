// Main.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Dropdown from './components/Dropdown';

function Main({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();

  return (
    <>
      <header className="App-header">
        <h1>BikeTrack</h1>
        {!isLoggedIn && <button onClick={() => navigate("/login")}>Login</button>}
      </header>
    </>
  );
}

export default Main;
