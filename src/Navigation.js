// NavigationBar.js

import React from 'react';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/cars">Car Listing</Link>
        </li>
        <li>
          <Link to="/add-car">Add Car</Link>
        </li>
        {/* Add more navigation links as needed */}
      </ul>
    </nav>
  );
};

export default NavigationBar;
