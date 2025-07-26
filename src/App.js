import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { endpoint, API_PATH } from './constant';


function App() {


  // Helper to get full API URL
  const getApiUrl = async (path) => {
    if (path) {
      return `${endpoint}${API_PATH}${path}`;
    } else {
      return `${endpoint}${API_PATH}`;
    }
  };


  const getUser = async () => {

    const apiUrl = await getApiUrl("");
    await axios.get(apiUrl).then((response) => {
      const message= response?.data?.message;
      document.getElementById("message").innerHTML = message ? message : response?.data;
    }).catch((error) => {
      console.error("Error fetching users:", error);
    });

  };

  useEffect(() => {
    getUser();
  }, []);



  return (
    <div style={{ backgroundColor: '#2d3a4b', width: '100%', height: '100vh', top: 0, left: 0, position: 'absolute' }}>
      <div className="container">
        <h1 id="message">React app is running!!</h1>
      </div>
    </div>
  );
}

export default App;
