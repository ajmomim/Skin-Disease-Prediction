import React, { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setIsOpen(false); // close menu after click
    alert(`${option} clicked!`); // 👈 baad me yaha navigate logic dal sakte hai
  };

  return (
    <header className="navbar">
      <h1 className="logo">AI Skin Disease Detection</h1>

      {/* ☰ Menu Icon */}
      <div className="menu-icon" onClick={toggleMenu}>
        ☰
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="dropdown-menu">
          <p onClick={() => handleOptionClick("Home")}>Home</p>
          <p onClick={() => handleOptionClick("About")}>About</p>
          <p onClick={() => handleOptionClick("Services")}>Services</p>
          <p onClick={() => handleOptionClick("Contact")}>Contact</p>
          <p onClick={() => handleOptionClick("Privacy Policy")}>Privacy Policy</p>
        </div>
      )}
    </header>
  );
};

export default Navbar;
