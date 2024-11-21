import { createContext, useState, useEffect } from "react";
import run from "../config/Gemini";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState(localStorage.getItem("input") || "");
    const [recentPrompt, setRecentPrompt] = useState(localStorage.getItem("recentPrompt") ||""); 
    const [prevPrompts, setPrevPrompts] = useState(JSON.parse(localStorage.getItem("prevPrompts")) ||[]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState(localStorage.getItem("resultData")||"");
    const [conversationHistory, setConversationHistory] = useState([]);

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
    deletePrompt
  };
  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};
export default ContextProvider;
