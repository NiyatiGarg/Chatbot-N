import React, { useContext } from "react";
import "./Main.css";
// import { Tooltip } from "react-tooltip";

import { LuMessagesSquare } from "react-icons/lu";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import userIcon from "../../assets/user_icon.png";
import compassIcon from "../../assets/compass_icon.png";
import bulbIcon from "../../assets/bulb_icon.png";
import messageIcon from "../../assets/message_icon.png";
import codeIcon from "../../assets/code_icon.png";
import galleryIcon from "../../assets/gallery_icon.png";
import send from "../../assets/send_icon.png";
import { Context } from "../../context/Context";
import botIcon from "../../assets/chat_bot_icon.png";

import { RiFileCopyLine } from "react-icons/ri";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import MicFeature from '../../components/Mic';

function Main() {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
    conversationHistory,
  } = useContext(Context);

  const handleSend = () => {
    if (input.trim()) {
      onSent(input);
    }
  };

  const copyResponse = () => {
    navigator.clipboard.writeText(resultData);
    toast.success("Response copied to clipboard!", {
      position: "top-right",  // position can be customized
      autoClose: 2000,        // duration the toast stays (in milliseconds)
      hideProgressBar: true,  // hides progress bar (optional)
      closeOnClick: true,     // closes the toast when clicked (optional)
      pauseOnHover: false,    // prevents pause on hover (optional)
      draggable: false,       // disables dragging the toast (optional)
      progress: undefined,    // can be used to control progress bar (optional)
    });
  };

  return (
    <div className="main">
      <div className="nav">
        <p>Bumppy Bot</p>
        <img src={userIcon} alt="" />
      </div>
      <div className="main-container">
        {!showResult ? (
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
        ) : (
          <div className="result">
            <div className="result-title">
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
                <div
                  className="response-content">
                    
                    <pre
                    style={{
                      whiteSpace: "pre-wrap",
                      wordWrap: "break-word",
                      background: "#f8f9fa",
                      padding: "1rem",
                      cursor: "text",
                      color: 'black',
                      display: 'flex',
                    }}
                  >
                   
                    <ReactMarkdown className='formatted-response' remarkPlugins={[remarkGfm]}>
                  {resultData}
                </ReactMarkdown>
                <div className="response-header ">
                    <button
                    title="copy response"
                      onClick={copyResponse}
                      className="copy-button"
                    >
                      <RiFileCopyLine size={20} /> 
                    </button>
                    <ToastContainer />
                  </div>
                  </pre>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter a prompt here"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault(); 
                  handleSend();
                }
              }}
            />
            <div>
              <img src={galleryIcon} alt="" />
              <MicFeature handleSendFunction={handleSend}/>
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
