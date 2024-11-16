import React, { useContext } from "react";
import "./Main.css";

import { LuMessagesSquare } from "react-icons/lu";

import userIcon from "../../assets/user_icon.png";
import compassIcon from "../../assets/compass_icon.png";
import bulbIcon from "../../assets/bulb_icon.png";
import messageIcon from "../../assets/message_icon.png";
import codeIcon from "../../assets/code_icon.png";
import galleryIcon from "../../assets/gallery_icon.png";
import mic from "../../assets/mic_icon.png";
import send from "../../assets/send_icon.png";
import { Context } from "../../context/Context";
import botIcon from "../../assets/chat_bot_icon.png";

function Main() {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);

  const handleSend = () => {
    if (input.trim()) {
      onSent(input); // Pass the input to the onSent function
    }
  };

  return (
    <div className="main">
      <div className="nav">
        <p>Bumppy Bot</p>
        <img src={userIcon} alt="" />
      </div>
      <div className="main-container">
        {!showResult ?
          <>
            <div className="greet">
              <p>
                <span>Hello</span>
              </p>
              <p>How can i help you today? </p>
            </div>
            <div className="cards">
              <div className="card">
                <p>Suggest beautiful places to see on an upcoming road trip.</p>
                <img src={compassIcon} alt="" />
              </div>
              <div className="card">
                <p>Briefly summarize this concept: Urban planning.</p>
                <img src={bulbIcon} alt="" />
              </div>
              <div className="card">
                <p>Brainstorm team bonding activities for our work retreat.</p>
                <img src={messageIcon} alt="" />
              </div>
              <div className="card">
                <p>Improve the readability of the following code.</p>
                <img src={codeIcon} alt="" />
              </div>
            </div>
          </>
        : 
          <div className="result">
            <div className="result-title">
              {/* <img src={userIcon} alt="" /> */}
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              
              <img src={botIcon} alt="" />
              {loading ? (
                <div className="loader ">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        }

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter a prompt here"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();  // Prevent form submission (if it's inside a form)
                  handleSend();        // Call handleSend on Enter key press
                }
              }}
            />
            <div>
              <img src={galleryIcon} alt="" />
              <img src={mic} alt="" />
              <img onClick={handleSend} src={send} alt="" />
            </div>
          </div>
          <p className="bottom-info">
            Bumppy Bot may display inaccurate info , including about people, so
            double-check its responses.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Main;
