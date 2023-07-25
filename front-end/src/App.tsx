import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Main from './pages/MainPage/Main';
import Login from './pages/LoginPage/Login';
import Signup from './pages/SignupPage/Signup';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Routes>
            <Route path="/" element={<Main />} /> 
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
