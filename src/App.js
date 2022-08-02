import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import Register from './components/pages/Register';
import Homepage from './components/pages/Homepage';
import Membership from './components/pages/Membership';
import Signin from './components/pages/Signin';
import Signup from './components/pages/Signup';
import Dashboard from './components/Dashboard/Dashboard';
import Users from './components/Dashboard/Users/Users';
import UserAd from './components/Dashboard/UserAd/UserAd';
import Resolution from './components/Dashboard/Resolution/Resolutions';
import Support from './components/Dashboard/Support/Support';
import AccountSettings from './components/Dashboard/AccountSettings/AccountSettings';
import Upgrade from './components/Dashboard/Upgrade/Upgrade';
import Friends from './components/Dashboard/Header/Navigation/Friends';
import FriendRequests from './components/Dashboard/Header/Navigation/FriendRequests';
import Notes from './components/Dashboard/Header/Navigation/Notes';
import Favorites from './components/Dashboard/Header/Navigation/Favorites';
import Inbox from './components/Dashboard/Header/Navigation/Inbox';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="/dashboard" element={<Users />} />
            <Route path="userad" element={<UserAd />} />
            <Route path="resolution" element={<Resolution />} />
            <Route path="support" element={<Support />} />
            <Route path="settings" element={<AccountSettings />} />
            <Route path="upgrade" element={<Upgrade />} />
            <Route path="friends" element={<Friends />} />
            <Route path="friend-requests" element={<FriendRequests />} />
            <Route path="notes" element={<Notes />} />
            <Route path="favorite" element={<Favorites />} />
            <Route path="inbox" element={<Inbox />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
