import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { LogOut, Download, LogIn, User, Pencil } from "lucide-react";
import "./LoginSignupModal.css";
import { Context } from "../../context/Context";

import userIcon from "../../assets/user_icon.png";

const LoginSignupModal = ({ position }) => {
  const { user, logout, login } = useContext(Context);

  return (
    <>
      <div
        className="d-flex flex-column parent position-absolute"
        style={{
          margin: "0.5rem",
          boxShadow: "",
          zIndex: 99,
          borderRadius: "5px",
          background: "white",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
          cursor: "pointer",
        }}
      >
        {user && (
          <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center',alignItems: 'center', borderBottom: '1px solid lightGrey', padding: '2rem', gap: '1rem'}}>
            <p>{user.email}</p>
            <img src={user.photoURL || userIcon} alt=""  style={{ borderRadius: '50%', heigth: 'auto', width: '5rem'}}/>
          </div>
        )}

        {user ? (
          <div
            className="d-flex items-center cursor-pointer gap-2 align-items-center block-hover"
            style={{ padding: "0.5rem", borderRadius: "5px" }}
          >
            <User size={16} className="text-gray-600" />
            <Link
             onClick={() => {
              if (window.confirm("Are you sure you want to log out?")) {
                logout();
              }
            }}
              style={{ color: "black", textDecoration: "none" }}
            >
              Log Out
            </Link>
          </div>
        ) : (
          <>
            <div
              className="d-flex items-center cursor-pointer gap-2  align-items-center block-hover"
              style={{ padding: "0.5rem", borderRadius: "5px" }}
            >
              <LogIn size={16} className="text-gray-600 d-flex" />
              <Link
                to="/login"
                style={{ color: "black", textDecoration: "none" }}
              >
                {" "}
                Login
              </Link>
            </div>
            <div
              className="d-flex items-center cursor-pointer gap-2 align-items-center block-hover"
              style={{ padding: "0.5rem", borderRadius: "5px" }}
            >
              <User size={16} className="text-gray-600" />
              <Link
                to="/signup"
                style={{ color: "black", textDecoration: "none", minWidth: '5rem' }}
              >
                Sign Up
              </Link>
            </div>
          </>
        )}

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
