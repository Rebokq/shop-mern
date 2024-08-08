import React from "react";
import "./navModal.css";

const NavModal =({ show, handleClose, children }) => {
  const modalClass = `modal ${show ? 'show hide-navbar' : ''}`;

  return (
    <div className={`modal ${show ? 'show' : ''} modalClass` } onClick={handleClose}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <span className="close-button" onClick={handleClose}>&times;</span>
      {children}
    </div>
  </div>
  );
};

export default NavModal;