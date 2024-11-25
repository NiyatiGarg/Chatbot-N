import React, { useContext, useState, useEffect } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoAddOutline } from "react-icons/io5";
import { MdChatBubbleOutline } from "react-icons/md";
import logoImg from "../../assets/Chatbot N.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { FiActivity } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";


const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const {
    onSent,
    prevPrompts,
    setRecentPrompt,
    newChat,
    deletePrompt,
    setPrevPrompts,
  } = useContext(Context);

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };

  return (
    <div className="sidebar">
      <div className="top" style={{}}>
        <div
          style={{
            display: extended ? null : "flex",
            justifyContent: extended ? null : "center",
            marginBottom: "1rem",
          }}
        >
          <GiHamburgerMenu
            onClick={() => setExtended((prev) => !prev)}
            className="menu-icon"
          />
        </div>
        <div className="img-container">
          <img
            // onClick={() => setExtended((prev) => !prev)}
            className="img"
            src={logoImg}
            style={{
              // border: '1rem solid white',
              height: extended ? "9rem" : "3rem",
              width: extended ? "9rem" : "3rem",
            }}
            alt=""
          />
        </div>
        <div
          onClick={() => newChat()}
          className="new-chat"
          style={{ display: extended? null: 'flex' , height: !extended &&'3rem'}}
        >
          <IoAddOutline className="icon" />
          {extended ? <p>New Chat </p> : null}
        </div>
        {extended ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompts.map((item, index) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    loadPrompt(item);
                    console.log(
                      prevPrompts,
                      "array that is curently on screen"
                    );
                  }}
                  className="recent-entry"
                >
                  <div key={index} className="container">
                    <MdChatBubbleOutline className="icon" />
                    <p>{item}</p>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deletePrompt(index);
                    }}
                    className="delete-button"
                  >
                    <RiDeleteBin6Line />
                  </button>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
        <IoMdHelpCircleOutline />
          {extended ? <p>Help</p> : null}
        </div>
        <div className="bottom-item recent-entry">
        <FiActivity />
          {extended ? <p>Activity</p> : null}
        </div>
        <div className="bottom-item recent-entry">
        <IoSettingsOutline />
          {extended ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
