import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <>
      <ul className="nav">
        <li>
          <Link to="/dashboard">Browse Network</Link>
        </li>
        <li>
          <Link to="userad">View my Ad</Link>
        </li>
        <li>
          <Link to="resolution">Resolution Center</Link>
        </li>
        <li>
          <Link to="support">Support</Link>
        </li>
        <li>
          <Link to="settings">Account Settings</Link>
        </li>
        <li>
          <Link to="upgrade">Upgrade Account</Link>
        </li>
      </ul>
    </>
  );
};

export default Sidebar;
