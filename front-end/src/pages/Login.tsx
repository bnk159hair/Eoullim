import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Main from './Main';

function Login() {
    const [a, setA] = useState<number>(0);
    const navigate = useNavigate(); // Initialize useNavigate
  
    useEffect(() => {
      if (a !== 0) {
        navigate('/');
      }
    }, [a, navigate]);
  
    const handleButtonClick = () => {
      setA((prevA) => (prevA === 0 ? 1 : 0)); // Toggle between 0 and 1
    };
  
    return (
      <>
        {a === 0 ? ( // Conditionally render Main or Sub component based on the value of 'a'
          <div>main hi</div>
        ) : (
          <Main/>
        )}
        <button onClick={handleButtonClick}>Change 'a' to 1</button>
      </>
    );
  }
  
  export default Login;
  