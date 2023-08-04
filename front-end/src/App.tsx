import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import './App.css';
import Main from './pages/MainPage/Main';
import Login from './pages/LoginPage/Login';
import SignupPage from './pages/SignupPage/SignupPage';
import Profile from './pages/ProfilePage/ProfileSelect';
import SessionPage from './pages/SessionPage/SessionPage';
import Friends from './pages/Friendspage/Friends';
import Record from './pages/RecordPage/Record';

function App() {
  return (
    <div>
      <header>
        <RecoilRoot>
          <Router>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/session" element={<SessionPage />} />
              <Route path="/friends" element={<Friends />} />
              <Route path="/record" element={<Record />} />
            </Routes>
          </Router>
        </RecoilRoot>
      </header>
    </div>
  );
}

export default App;
