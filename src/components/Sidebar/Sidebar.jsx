import React, { useContext, useState , useEffect} from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";
import { RiDeleteBinLine } from "react-icons/ri";
import { CiMenuBurger } from "react-icons/ci";
import { CiChat1 } from "react-icons/ci";

const Sidebar = () => {
  const { onSent, prevPrompts, setRecentPrompt, newChat, deletePrompt, setPrevPrompts, extended, setExtended

   } = useContext(Context);

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };

  return (
    <div className="sidebar">
      <div className="top">
      <CiMenuBurger 
      style={{color: 'white'}}
          onClick={() => setExtended(!extended)}
          className="menu"
        />
        <div onClick={() => newChat()} className="new-chat">
          <img src={assets.plus_icon} alt="" />
          {extended ? <p className="m-0">New Chat </p> : null}
        </div>
        {extended ? (
          <div className="recent">
            <p className="recent-title text-light">Recent</p>
            {prevPrompts.map((item, index) => {
              return (
                <div
                  key={index}
                  // onClick={() => loadPrompt(item)}
                  className="recent-entry"
                >
                  <CiChat1 />
                  <p className="m-0">{item}</p>
                  <button
                  onClick={(e) => {
                    e.stopPropagation(); 
                    deletePrompt(index);
                  }}
                  style={{color: 'white'}}
                  className="delete-button p-0 "
                  >
                    <RiDeleteBinLine />
                  </button>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
      <div className="bottom">
        <div className="bottom-item">
          <img src={assets.question_icon} alt="" style={{background: '#F3F3F0'}} className="p-1"/>
          {extended ? <p>Help</p> : null}
        </div>
        <div className="bottom-item">
          <img src={assets.history_icon} alt="" style={{background: '#F3F3F0'}} className="p-1" />
          {extended ? <p>Activity</p> : null}
        </div>
        <div className="bottom-item">
          <img src={assets.setting_icon} alt="" style={{background: '#F3F3F0'}} className="p-1" />
          {extended ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
