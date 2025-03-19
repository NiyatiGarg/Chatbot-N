import React, { useContext, useState, useEffect, useRef } from "react";
import "./Main.css";

import Sidebar from "../Sidebar/Sidebar";
import robotImg from "../../assets/robot.png";
import { AnalyzeImage } from "../../config/gemini";

import { assets } from "../../assets/assets";
import { LuMessagesSquare } from "react-icons/lu";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

import userIcon from "../../assets/user_icon.png";
import compassIcon from "../../assets/compass_icon.png";
import bulbIcon from "../../assets/bulb_icon.png";
import messageIcon from "../../assets/message_icon.png";
import codeIcon from "../../assets/code_icon.png";
import galleryIcon from "../../assets/gallery_icon.png";
import send from "../../assets/send_icon.png";
import { Context } from "../../context/Context";
import botIcon from "../../assets/robot.png";
import newUser from "../../assets/new-user.png";

import { RiFileCopyLine } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import MicFeature from "../../components/Mic";
import LoginSignupModal from "../modals/LoginSignupModal";

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
    setRecentPrompt,
    setConversationHistory,
    setAnalyzedResult,
    analyzedResult,
    selectedFiles, setSelectedFiles,
    uploadImage, setUploadImage,
  } = useContext(Context);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(true);
  const [inputBoxHeight, setInputBoxHeight] = useState("auto");
  const [hasImage, setHasImage] = useState(0);
  const [inputImg, setInputImg] = useState("");

  console.log(inputImg, "inputImg line 61");

  const openModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSend = () => {
    // AnalyzeImage(selectedFiles, input)
    //   .then((result) => {
    //     setAnalyzedResult(result);

    //     console.log(analyzedResult, "AnalyzeImage");
    //   })
    //   .catch((error) => {
    //     console.error("Error analyzing image:", error);
    //   });

    if (input.trim()) {
      onSent(input);
    }
  };

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files); // Convert FileList to an array
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

  useEffect(() => {
    if (!uploadImage) {
      setSelectedFiles(null);
    }
  }, [uploadImage]);

  // Sync state with localStorage
  useEffect(() => {
    const savedInput = localStorage.getItem("input");
    const savedRecentPrompt = localStorage.getItem("recentPrompt");
    const savedConversationHistory =
      JSON.parse(localStorage.getItem("conversationHistory")) || [];

    if (savedInput) setInput(savedInput);
    if (savedRecentPrompt) setRecentPrompt(savedRecentPrompt);
    if (savedConversationHistory)
      setConversationHistory(savedConversationHistory);
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
            <img src={user.photoURL || userIcon} alt="" onClick={openModal} />
          ) : (
            <img src={newUser} alt="" onClick={openModal} />
          )}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            position: isSmallScreen ? "relative" : "fixed",
            right: "0",
            zIndex: "99",
          }}
          className="p-0 m-0 login-signup-modal-parent"
        >
          {isModalOpen && <LoginSignupModal />}
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
              <div className="cards d-flex flex-wrap">
                <div
                  className="card col-sm-5 col-12 "
                  style={{border: 'none'}}
                  onClick={() =>
                    loadPrompt(
                      "Suggest beautiful places to see on an upcoming road trip"
                    )
                  }
                >
                  <p>
                    Suggest beautiful places to see on an upcoming road trip.
                  </p>
                  <img src={compassIcon} alt="" />
                </div>
                <div
                  className="card col-sm-5 col-12"
                  style={{border: 'none'}}
                  onClick={() =>
                    loadPrompt("Briefly summarize this concept: Urban planning")
                  }
                >
                  <p>Briefly summarize this concept: Urban planning.</p>
                  <img src={bulbIcon} alt="" />
                </div>
                <div
                  className="card col-sm-5 col-12 "
                  style={{border: 'none'}}
                  onClick={() =>
                    loadPrompt(
                      "Brainstorm team bonding activities for our work retreat"
                    )
                  }
                >
                  <p>
                    Brainstorm team bonding activities for our work retreat.
                  </p>
                  <img src={messageIcon} alt="" />
                </div>
                <div
                  className="card col-sm-5 col-12"
                  style={{border: 'none'}}
                  onClick={() =>
                    loadPrompt("Improve the readability of the following code")
                  }
                >
                  <p>Improve the readability of the following code.</p>
                  <img src={codeIcon} alt="" />
                </div>
              </div>
            </>
          ) : (
            <div className="result mb-4 pb-4">
              <ConversationHistory
                inputImg={inputImg}
                selectedFiles={selectedFiles}
                hasImage={hasImage}
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
        </div>
        <div
          className="main-bottom d-flex  justify-content-start"
          style={{ zIndex: 999, position: 'fixed'}}
        >
         
          <div style={{borderRadius: '10px', background: '#F3F3F0', borderTop: '5px solid white'}} className="flex-column-reverse main-bottom">
          <div className="search-box">
            {/* image search */}
            <div
              style={{
                position: "relative",
                display: "inline-block",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <img
                src={galleryIcon}
                alt="Gallery Icon"
                onClick={() => setUploadImage(!uploadImage)}

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
                  e.target.style.height = "auto";
                }
              }}
              onInput={(e) => {
                setInputBoxHeight(e.target.scrollHeight);
                e.target.style.maxHeight = "40vh";
              }}
            />
            <div>
              <MicFeature handleSendFunction={handleSend} />
              {input && (
                <img
                // onChange={(e) => setInput(e.target.value)}
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
            {uploadImage ? (
              <div className=" d-flex flex-column-reverse gap-2 p-2" style={{background: '#F3F3F0', width: '100%', borderRadius: '10px', }}>
                <input
                  type="file"
                  id="fileInput"
                  accept="image/*"
                 
                  onChange={(e) => {
                    setSelectedFiles(e.target.files[0]);

                    setHasImage(1);
                    const file = e.target.files[0]; // Get the selected file
                    if (file) {
                      const reader = new FileReader(); // Create a new FileReader instance

                      // Define the onload event when the file is read successfully
                      reader.onloadend = () => {
                        const dataUrl = reader.result; // This is the base64 string (Data URL)
                        setInputImg(dataUrl); // Set the Data URL to state, which will be used as the image source
                      };

                      // Read the file as Data URL
                      reader.readAsDataURL(file);
                    }
                  }}
                />
                {selectedFiles ? (
                  <div className="">
                    <img
                      src={inputImg}
                      alt=""
                      style={{
                        height: "100px",
                        width: "auto",
                        display: "block",
                      }}
                    />
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
         
          <p className="bottom-info">
            ChatBot N may display inaccurate info , including about people, so
            double-check its responses.
          </p>
        </div>
      </div>
    </>
  );
}

export default Main;

const ConversationHistory = ({
  messages,
  loading,
  handleCopy,
  hasImage,
  selectedFiles,
  inputImg,
  input,
}) => {
  const bottomRef = useRef(null);
  const { analyzedResult } = useContext(Context);

  console.log(analyzedResult, "analyzedResult");

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
    <div className="mb-5 pb-5 d-flex flex-column gap-4 mb-2">
      {uniqueMessages.map((message, index) => (
        <div
          className="conversation-item"
          key={`${message.role}-${index}-${message.parts[0].text.substring(
            0,
            20
          )}`}
        >
          {message.role === "user" ? (
            <div className="result-title flex-column gap-2 justify-content-end d-flex align-items-end">
              {inputImg ? (
                  <div className="justify-content-end d-flex align-items-end">
                    <img
                      src={inputImg}
                      alt=""
                      style={{
                        height: "60%",
                        width: "60%",
                        display: "block",
                      }}
                    />
                  </div>
                ) : null}
              
              <p
                style={{
                  whiteSpace: "pre-wrap",
                  wordWrap: "break-word",
                  fontSize: "1rem",
                  marginRight: '1rem'
                }}
              >
                
                {message.parts[0].imgURL ? (
                  <img
                    src={message.parts[0].imgURL}
                    alt=""
                    style={{ height: "100%", width: "100%" }}
                  />
                ) : null}
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
                          {
                            console.log(message.parts[0].text, 'image response')
                                                 } 
                          return (
                            <div className="code-block">
                              <pre {...props} style={{ display: "flex" }}>
                                <SyntaxHighlighter
                                  style={atomDark}
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
                      onClick={() => {
                        copyText(message.parts[0].text);
                        console.log(copyText);
                      }}
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
