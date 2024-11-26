import React from "react";
import {Link} from "react-router-dom";

import { LogOut, Download, LogIn, User, Pencil } from 'lucide-react';
import './LoginSignupModal.css';

const LoginSignupModal = ({ position }) => {
  return (
    <>
      <div 
        className=" d-flex column flex-col" 
        // onClick={onClose}
      />
      <div 
        className="d-flex flex-column p-2 position-absolute"
        style={{
            marginTop: '-1rem',
            marginRight: '0.5rem',
            boxShadow: '',
            width: '7rem',
            right: 0,
            zIndex: 99,
            borderRadius: '5px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
            cursor: 'pointer',
          }}
      >
        <div className="d-flex items-center cursor-pointer gap-2  align-items-center block-hover" style={{padding: '0.5rem'}}>
          <LogIn size={16} className="text-gray-600 d-flex" />
          <Link to="/login" style={{color: 'black', textDecoration: 'none'}}>  Login</Link>
        </div>
        <div className="d-flex items-center cursor-pointer gap-2 align-items-center block-hover" style={{padding: '0.5rem'}}>
          <User size={16} className="text-gray-600" />
          <Link to="/signup" style={{color: 'black', textDecoration: 'none'}}>Sign Up</Link>
        </div>
        {/* <hr className="p-0 m-0"/>
        <div className="d-flex items-center hover:bg-gray-50 cursor-pointer gap-2 align-items-center p-1 block-hover">
          <LogOut size={16} className="text-gray-600" />
          <Link className="text-sm text-gray-700">Log Out</Link>
        </div> */}
      </div>
    </>
  );
};

export default LoginSignupModal;
