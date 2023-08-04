import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import './App.css';
import MainPage from './pages/MainPage/MainPage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';
import ProfileSelect from './pages/ProfilePage/ProfileSelect';
import SessionPage from './pages/SessionPage/SessionPage';
import FriendsPage from './pages/Friendspage/FriendsPage';
import RecordPage from './pages/RecordPage/RecordPage';

function App() {
  return (
    <div>
      <header>
        <RecoilRoot>
          <Router>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/profile" element={<ProfileSelect />} />
              <Route path="/session" element={<SessionPage />} />
              <Route path="/friends" element={<FriendsPage />} />
              <Route path="/record" element={<RecordPage />} />
            </Routes>
          </Router>
        </RecoilRoot>
      </header>
    </div>
  );
}

export default App;
