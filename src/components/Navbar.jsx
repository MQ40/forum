import React, { useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = ({ setSearchQuery }) => {
  //Search bar posts.
  const [searchText, setSearchText] = useState('');

  const handleChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchQuery(searchText);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      setSearchQuery(searchText);
    }
  };

  return (
    <div className="navbar">
      <div className="navbar-item" style={{ fontSize: '22px' }}>BlueScheme Forum</div>

      <div className="navbar-item navbar-search">
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Search..." 
            value={searchText}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        </form>
      </div>

      <div className="navbar-item">
        <Link to="/">
          <button>Home</button>
        </Link>
      </div>

      <div className="navbar-item">
        <Link to="/create-post"> 
          <button>Create Post</button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
