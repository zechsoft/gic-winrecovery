import React, { useState, useEffect, useRef } from "react";
import { FaHome, FaUser, FaTable, FaEnvelope, FaSignOutAlt, FaChevronLeft } from "react-icons/fa";
import { useHistory } from "react-router-dom"; // Import useHistory hook
import "./IconSidebar.css";

const IconSidebar = ({ basePath = "/admin" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const sidebarRef = useRef(null);
  const toggleBtnRef = useRef(null);
  const dropdownRef = useRef(null);

  const history = useHistory(); // Hook to access history object for navigation

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

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, isDropdownOpen]);

  // Navigation Functions
  const navigateToDashboard = () => {
    history.push(`${basePath}/dashboard`);
    setIsOpen(false);
  };

  const navigateToProfile = () => {
    history.push(`${basePath}/profile`);
    setIsOpen(false);
  };

  const navigateToSupplierInfo = () => {
    history.push(`${basePath}/supplier-info`);
    setIsOpen(false);
  };

  const navigateToCustomerOrder = () => {
    history.push(`${basePath}/customer-order`);
    setIsOpen(false);
  };

  const navigateToMaterialInquiry = () => {
    history.push(`${basePath}/material-inquiry`);
    setIsOpen(false);
  };

  const navigateToMaterialReplenishment = () => {
    history.push(`${basePath}/material-replenishment`);
    setIsOpen(false);
  };

  const navigateToCustomerDeliveryNotice = () => {
    history.push(`${basePath}/customer-delivery-notice`);
    setIsOpen(false);
  };

  // Function to handle redirect after navigation
  const handleNavigationAndRedirect = (navigateFunction) => {
    navigateFunction(); // First, navigate to the new route
    setIsOpen(false); // Close the sidebar after navigation
  };

  return (
    <>
      {/* Sidebar */}
      <div ref={sidebarRef} className={`icon-sidebar ${isOpen ? "open" : ""}`}>
        <div className="icon-sidebar-icons">
          <button className="icon-sidebar-btn" onClick={() => handleNavigationAndRedirect(navigateToDashboard)}>
            <FaHome title="Dashboard" />
          </button>
          <button className="icon-sidebar-btn" onClick={() => handleNavigationAndRedirect(navigateToProfile)}>
            <FaUser title="Profile" />
          </button>
          <div className="icon-sidebar-dropdown">
            <button
              className="icon-sidebar-btn"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <FaTable title="Table" />
            </button>
            {isDropdownOpen && (
              <div ref={dropdownRef} className="dropdown-menu">
                <button className="dropdown-item" onClick={() => handleNavigationAndRedirect(navigateToSupplierInfo)}>
                  Supplier Info
                </button>
                <button className="dropdown-item" onClick={() => handleNavigationAndRedirect(navigateToCustomerOrder)}>
                  Customer Order
                </button>
                <button className="dropdown-item" onClick={() => handleNavigationAndRedirect(navigateToMaterialInquiry)}>
                  Material Inquiry
                </button>
                <button className="dropdown-item" onClick={() => handleNavigationAndRedirect(navigateToMaterialReplenishment)}>
                  Material Replenishment
                </button>
                <button className="dropdown-item" onClick={() => handleNavigationAndRedirect(navigateToCustomerDeliveryNotice)}>
                  Customer Delivery
                </button>
              </div>
            )}
          </div>
          <button className="icon-sidebar-btn">
            <FaEnvelope title="Message" />
          </button>
          <button className="icon-sidebar-btn">
            <FaSignOutAlt title="Logout" />
          </button>
        </div>
      </div>

      {/* Sidebar Toggle Button */}
      <button
        ref={toggleBtnRef}
        className="sidebar-toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "|" : <FaChevronLeft />}
      </button>
    </>
  );
};

export default IconSidebar;