import React, { useContext, useState, useEffect, useRef } from "react";
import "./Main.css";
// import { Tooltip } from "react-tooltip";

import Sidebar from "../Sidebar/Sidebar";

import { assets } from "../../assets/assets";
import { LuMessagesSquare } from "react-icons/lu";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";

import userIcon from "../../assets/user_icon.png";
import compassIcon from "../../assets/compass_icon.png";
import bulbIcon from "../../assets/bulb_icon.png";
import messageIcon from "../../assets/message_icon.png";
import codeIcon from "../../assets/code_icon.png";
import galleryIcon from "../../assets/gallery_icon.png";
import send from "../../assets/send_icon.png";
import { Context } from "../../context/Context";
import botIcon from "../../assets/ai-application.png";
import newUser from "../../assets/new-user.png";

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
    extended,
    setExtended,
    user,
    logout,
  } = useContext(Context);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(true);
  const [inputBoxHeight, setInputBoxHeight] = useState("auto");

  const openModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSend = () => {
    if (input.trim()) {
      onSent(input);
    }
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

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 1024); // Set your breakpoint, e.g., 768px
    };

    // Call handleResize once to set initial state
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {isSmallScreen ? (
        extended ? (
          <Sidebar />
        ) : null
      ) : (
        !isSmallScreen && <Sidebar />
      )}
      <div className="main">
        <div className="parent-container">
          <div className="chat-container">
            <div style={{ disply: "flex", position: "relative" }}>
              <div className="nav">
                {extended ? null : (
                  <img
                    onClick={() => setExtended(!extended)}
                    className="menu-icon"
                    src={assets.menu_icon}
                    alt=""
                  />
                )}
                <p>ChatBot N</p>
                {user ? (
                  <img
                    src={user.photoURL || userIcon}
                    alt=""
                    onClick={openModal}
                  />
                ) : (
                  <img src={newUser} alt="" onClick={openModal} />
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  position: "fixed",
                  right: "2rem",
                }}
                className="p-0 m-0"
              >
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
                  {/* <div className="result-title">
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
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                              pre({ node, children, ...props }) {
                                const codeText =
                                  children?.props?.children || "";
                                const languageClass =
                                  children?.props?.className || "";
                                const match = /language-(\w+)/.exec(
                                  languageClass
                                );
                                return (
                                  <div className="code-block">
                                    <pre {...props} style={{ display: "flex" }}>
                                      <SyntaxHighlighter
                                        style={vscDarkPlus} 
                                        language={match ? match[1] : "text"}
                                        PreTag="div"
                                        {...props}
                                      >
                                        {codeText}
                                      </SyntaxHighlighter>
                                      
                                      <div className="response-header ">
                                        <button
                                          title="copy"
                                          className="copy-button"
                                          onClick={() => handleCopy(codeText)}
                                        >
                                          <RiFileCopyLine size={20} />
                                        </button>
                                      </div>
                                    </pre>
                                  </div>
                                );
                              },
                            }}
                          >
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
                  </div> */}
                  <ConversationHistory
                    messages={conversationHistory}
                    loading={loading}
                    handleCopy={(text) => {
                      navigator.clipboard.writeText(text);
                      toast.success("Copied to clipboard!", {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: false,
                      });
                    }}
                  />
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
                    style={{ height: inputBoxHeight }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                        setInputBoxHeight("auto");
                      }
                    }}
                    onInput={(e) => {
                      // Dynamically adjust height
                      setInputBoxHeight(e.target.scrollHeight);
                      // e.target.style.height = `${inputBoxHeight}px`;
                      e.target.style.maxHeight = "40vh";
                    }}
                  />
                  <div>
                    <MicFeature handleSendFunction={handleSend} />
                    {input && (
                      <img
                        onClick={() => {
                          handleSend();
                          setInputBoxHeight("auto");
                        }}
                        src={send}
                        alt=""
                      />
                    )}
                  </div>
                </div>
                {isSmallScreen ? null : (
                  <p className="bottom-info">
                    ChatBot N may display inaccurate info , including about
                    people, so double-check its responses.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;

const ConversationHistory = ({ messages, loading, handleCopy }) => {

  const bottomRef = useRef(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

  // Filter out duplicate messages based on content and role
  const uniqueMessages = messages.filter(
    (message, index, self) =>
      index ===
      self.findIndex(
        (m) =>
          m.parts[0].text === message.parts[0].text && m.role === message.role
      )
  );

  const copyText = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const copyCode = async (codeText) => {
    try {
      await navigator.clipboard.writeText(codeText);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="result">
      {uniqueMessages.map((message, index) => (
        <div
          className="conversation-item"
          key={`${message.role}-${index}-${message.parts[0].text.substring(
            0,
            20
          )}`}
        >
          {message.role === "user" ? (
            <div className="result-title">
              <p style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
                <ReactMarkdown
                  components={{
                    pre({ node, children, ...props }) {
                      const codeText = children?.props?.children || "";
                      const languageClass = children?.props?.className || "";
                      const match = /language-(\w+)/.exec(languageClass);
                      return (
                        <div className="prompt-code-block">
                          <pre {...props} style={{ display: "flex" }}>
                            <SyntaxHighlighter
                              // style={{}}
                              language={match ? match[1] : "text"}
                              PreTag="div"
                              {...props}
                            >
                              {codeText}
                            </SyntaxHighlighter>
                          </pre>
                        </div>
                      );
                    },
                  }}
                >
                  {message.parts[0].text}
                </ReactMarkdown>
              </p>
            </div>
          ) : (
            <div className="result-data">
              <img src={botIcon} alt="Bot" />
              {loading && index === uniqueMessages.length - 1 ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <>
                  <div className="response-content">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        pre({ node, children, ...props }) {
                          const codeText = children?.props?.children || "";
                          const languageClass =
                            children?.props?.className || "";
                          const match = /language-(\w+)/.exec(languageClass);
                          return (
                            <div className="code-block">
                              <pre {...props} style={{ display: "flex" }}>
                                <SyntaxHighlighter
                                  style={vscDarkPlus}
                                  language={match ? match[1] : "text"}
                                  PreTag="div"
                                  {...props}
                                >
                                  {codeText}
                                </SyntaxHighlighter>
                                <div className="response-header">
                                  <button
                                    title="copy"
                                    className="copy-button"
                                    onClick={() => copyCode(codeText)}
                                  >
                                    <RiFileCopyLine size={20} />
                                  </button>
                                </div>
                              </pre>
                            </div>
                          );
                        },
                      }}
                    >
                      {message.parts[0].text}
                    </ReactMarkdown>
                  </div>
                  <div className="response-header">
                    <button
                      title="copy"
                      onClick={() => copyText(message.parts[0].text)}
                      className="copy-button"
                    >
                      <RiFileCopyLine size={20} />
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      ))}
       <div ref={bottomRef} />
       </div>
  );
};
