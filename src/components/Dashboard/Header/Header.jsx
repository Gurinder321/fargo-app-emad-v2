import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <>
      <ul className="nav-header">
        <li>
          <Link to="friends">My Friends</Link>
        </li>
        <li>
          <Link to="friend-requests">Friend Requests</Link>
        </li>
        <li>
          <Link to="notes">My Notes</Link>
        </li>
        <li>
          <Link to="favorite">My Favorites</Link>
        </li>
        <li>
          <Link to="inbox">Inbox</Link>
        </li>
      </ul>
    </>
  );
};

export default Header;
