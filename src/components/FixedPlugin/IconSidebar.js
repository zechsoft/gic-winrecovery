import React, { useState, useEffect, useRef } from "react";
import { FaHome, FaUser, FaTable, FaEnvelope, FaSignOutAlt, FaChevronLeft } from "react-icons/fa";
import "./IconSidebar.css";

const IconSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const sidebarRef = useRef(null);
  const toggleBtnRef = useRef(null);
  const dropdownRef = useRef(null);



  // Function to handle clicks outside
  useEffect(() => {
    const handleClickOutside = (event) => {
    if (
  sidebarRef.current &&
  !sidebarRef.current.contains(event.target) &&
  toggleBtnRef.current &&
  !toggleBtnRef.current.contains(event.target) &&
  dropdownRef.current &&
  !dropdownRef.current.contains(event.target)
) {
  setIsOpen(false);
  setIsDropdownOpen(false);
}
    };
    if (isOpen || isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }


    // Add event listener when sidebar is open
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      {/* Sidebar */}
      <div ref={sidebarRef} className={`icon-sidebar ${isOpen ? "open" : ""}`}>
        <div className="icon-sidebar-icons">
          <button className="icon-sidebar-btn"><FaHome title="Dashboard" /></button>
          <button className="icon-sidebar-btn"><FaUser title="Profile" /></button>
          <div className="icon-sidebar-dropdown">
            <button
              className="icon-sidebar-btn"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <FaTable title="Table" />
            </button>
            {isDropdownOpen && (
              <div ref={dropdownRef} className="dropdown-menu">
                <button className="dropdown-item">Table 1</button>
                <button className="dropdown-item">Table 2</button>
                <button className="dropdown-item">Table 3</button>
              </div>
            )}
          </div>


          <button className="icon-sidebar-btn"><FaEnvelope title="Message" /></button>
          <button className="icon-sidebar-btn"><FaSignOutAlt title="Logout" /></button>
        </div>
      </div>

      {/* Sidebar Toggle Button */}
      <button ref={toggleBtnRef} className="sidebar-toggle-btn" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "|" : <FaChevronLeft />}
      </button>
    </>
  );
};

export default IconSidebar;
