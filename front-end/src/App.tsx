import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import './App.css';
import Main from './pages/MainPage/Main';
import Login from './pages/LoginPage/Login';
import Signup from './pages/SignupPage/Signup';
import Profile from './pages/ProfilePage/ProfileSelect';
import Stream from './pages/StreamPage/Stream';
import Friends from './pages/Friendspage/Friends';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <RecoilRoot>
          <Router>
            <Routes>
              <Route path="/" element={<Main />} /> 
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/stream" element={<Stream />} />
              <Route path="/friends" element={<Friends />} />
            </Routes>
          </Router>
        </RecoilRoot>
      </header>
    </div>
  );
}

export default App;
