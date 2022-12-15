import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="main-nav">
      <ul>
        <li><NavLink to="/moon">Moon</NavLink></li>
        <li><NavLink to="/sea">Sea</NavLink></li>
        <li><NavLink to="/christmas">Christmas</NavLink></li>
        <li><NavLink to="/family">Family</NavLink></li>
        <li><NavLink to="/space">Space</NavLink></li>
      </ul>
    </nav>
  );
}

export default Navigation;
