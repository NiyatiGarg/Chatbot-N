import { createContext, useState, useEffect } from "react";
import run from "../config/Gemini";
import { auth } from "../../firebaseConfig";
import { onAuthStateChanged, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState(localStorage.getItem("input") || "");
    const [recentPrompt, setRecentPrompt] = useState(localStorage.getItem("recentPrompt") ||""); 
    const [prevPrompts, setPrevPrompts] = useState(JSON.parse(localStorage.getItem("prevPrompts")) ||[]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState(localStorage.getItem("resultData")||"");
    const [user, setUser] = useState(null); // Authentication state
    const [authLoading, setAuthLoading] = useState(true); // Loading for auth state
    const [extended, setExtended] = useState(false);
  
// Monitor Auth State and Fetch User Details
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      const { displayName, email, uid, photoURL } = currentUser;
      setUser({
        displayName,
        email,
        uid,
        photoURL
      });
    } else {
      setUser(null);
    }
    setAuthLoading(false); // Stop auth loading
  });
  return () => unsubscribe();
}, []);

// Firebase Authentication: Sign In
const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Login Error:", error.message);
  }
};

// Firebase Authentication: Sign Up
const register = async (email, password) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Registration Error:", error.message);
  }
};

// Firebase Authentication: Logout
const logout = async () => {
  try {
    await signOut(auth);
    setUser(null);
  } catch (error) {
    console.error("Logout Error:", error.message);
  }
};
    
  const delayPara = (index, nextWord) => {
    setTimeout(function () {
      setResultData((prev) => prev + nextWord);
    }, 25 * index);
  };

  useEffect(() => {
    const savedInput = localStorage.getItem("input");
    const savedRecentPrompt = localStorage.getItem("recentPrompt");
    const savedPrevPrompts = JSON.parse(localStorage.getItem("prevPrompts")) || [];
    const savedResultData = localStorage.getItem("resultData");

    if (savedInput) setInput(savedInput);
    if (savedRecentPrompt) setRecentPrompt(savedRecentPrompt);
    setPrevPrompts(savedPrevPrompts);
    if (savedResultData) setResultData(savedResultData);
}, []);

  const newChat= ()=>{
    setLoading(false);
    console.log(loading);
    setShowResult(false);
    setInput("");
    console.log(showResult);
  }

  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);

    const currentPrompt = prompt || input; 

  setPrevPrompts((prev) => 
    prev.includes(currentPrompt) ? prev : [currentPrompt, ...prev]
  );
  setRecentPrompt(currentPrompt);

  const response = await run(currentPrompt);
  setResultData(response);
    setLoading(false);
    setInput("");
  };

  const deletePrompt = (index) => {
    const newPromptArray=prevPrompts.filter((_, i) => i !== index)
    setPrevPrompts(newPromptArray);

    localStorage.setItem("prevPrompts", JSON.stringify(updatedPrompts));
  };

  useEffect(() => {
    const storedPrompts = localStorage.getItem("prevPrompts");
    if (storedPrompts) {
        setPrevPrompts(JSON.parse(storedPrompts));
    }
}, []);

  useEffect(() => {
    // Save input value to localStorage
    localStorage.setItem("input", input);
}, [input]);

useEffect(() => {
  localStorage.setItem("recentPrompt", recentPrompt);
}, [recentPrompt]);

useEffect(() => {
  localStorage.setItem("prevPrompts", JSON.stringify(prevPrompts));
}, [prevPrompts]);

useEffect(() => {
  localStorage.setItem("resultData", resultData);
}, [resultData]);

  const contextValue = {
    user,
    login,
    register,
    logout,
    authLoading,
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat,
    deletePrompt,
    extended,
    setExtended
  };
  return (
    <Context.Provider value={contextValue}>
      {authLoading ? <p>Loading authentication...</p> : props.children}
      </Context.Provider>
  );
};
export default ContextProvider;
