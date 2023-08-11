import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import './App.css';
import MainPage from './pages/MainPage/MainPage';
import LoginPage from './pages/LoginPage/LoginPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import SessionPage from './pages/SessionPage/SessionPage';
import FriendSessionPage from './pages/SessionPage/FriendSessionPage';
import FriendsPage from './pages/Friendspage/FriendsPage';
import RecordPage from './pages/RecordPage/RecordPage';
import BackgroundMusic from './components/main/BackgroundMusic';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    console.log('이벤트 추가');

    window.addEventListener('beforeunload', (event) => {
      document.body.innerHTML = '브라우저 종료 전 이벤트 발생!';
      console.log(event);
    });

    return () => {
      console.log('이벤트 제거');
      window.removeEventListener('beforeunload', (event) => {
        console.log(event);
      });
    };
  }, []);
  return (
    <div>
      <header>
        <RecoilRoot>
          <Router>
            <BackgroundMusic />
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/session" element={<SessionPage />} />
              <Route path="/friendsession" element={<FriendSessionPage />} />
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
