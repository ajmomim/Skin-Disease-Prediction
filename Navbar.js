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

 
};

export default Navbar;
