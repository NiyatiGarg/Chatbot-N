import React, { useContext, useState } from "react";
import "./Main.css";
// import { Tooltip } from "react-tooltip";

import Sidebar from "../Sidebar/Sidebar";

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
import botIcon from "../../assets/ai-application.png";

import { RiFileCopyLine } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import MicFeature from "../../components/Mic";
import LoginSignupModal from "../modals/loginSignupModal";

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
    user,
    logout
  } = useContext(Context);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSend = () => {
    if (input.trim()) {
      onSent(input);
    }
  };

  const copyResponse = () => {
    navigator.clipboard.writeText(resultData);
    toast.success("Copied to clipboard!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
    });
  };

  // Function to handle file upload
  const handleFileUpload = (file) => {
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      const fileContent = event.target.result;
      onSent(fileContent);
    };

    reader.onerror = (error) => {
      showToast(`Error reading file: ${error}`, "error");
    };

    if (file.type.startsWith("text/") || file.type === "application/json") {
      reader.readAsText(file);
    } else if (file.type.startsWith("image/")) {
      reader.readAsDataURL(file);
    } else {
      showToast("Unsupported file type!", "error");
    }
  };

  return (

    <>
      <Sidebar />
      <div className="main">

        <div className="parent-container">
          <div className="chat-container">
            <div style={{disply: 'flex', position: 'relative', }}>
              <div className="nav">
                <p>ChatBot N</p>
               {user? <img src={user.photoURL || userIcon} alt="" onClick={openModal} /> : <p style={{background: 'grey', padding: '2rem', borderRadius: '50%'}} onClick={openModal}></p>}
              </div>
              <div style={{display: 'flex', justifyContent: 'flex-end', position: 'fixed', right: '2rem'}} className="p-0 m-0">
              {isModalOpen && <LoginSignupModal />}
              </div>
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
                      <p>
                        Suggest beautiful places to see on an upcoming road
                        trip.
                      </p>
                      <img src={compassIcon} alt="" />
                    </div>
                    <div className="card">
                      <p>Briefly summarize this concept: Urban planning.</p>
                      <img src={bulbIcon} alt="" />
                    </div>
                    <div className="card">
                      <p>
                        Brainstorm team bonding activities for our work retreat.
                      </p>
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
                      <div className="response-container">
                        <div className="response-content">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {resultData}
                          </ReactMarkdown>
                        </div>
                        <div className="response-header ">
                          <button
                            title="copy"
                            onClick={copyResponse}
                            className="copy-button"
                          >
                            <RiFileCopyLine size={20} />
                          </button>
                          <ToastContainer />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="main-bottom">
                <div className="search-box">
                  <div
                    style={{ position: "relative", display: "inline-block" }}
                  >
                    <img src={galleryIcon} alt="Gallery Icon" />
                    <input
                      type="file"
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        opacity: 0,
                        cursor: "pointer",
                      }}
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          console.log("File selected:", file);
                          handleFileUpload(file);
                        }
                      }}
                    />
                  </div>
                  <textarea
                    onChange={(e) => setInput(e.target.value)}
                    value={input}
                    type="text"
                    placeholder="Enter a prompt here"
                    rows={1}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                    onInput={(e) => {
                      e.target.style.height = "auto";
                      e.target.style.height = `${e.target.scrollHeight}px`;
                      e.target.style.maxHeight = "30vh";
                    }}
                  />
                  <div>
                    <MicFeature handleSendFunction={handleSend} />
                    {input && <img onClick={handleSend} src={send} alt="" />}
                  </div>
                </div>
                <p className="bottom-info">
                  ChatBot N may display inaccurate info , including about
                  people, so double-check its responses.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
