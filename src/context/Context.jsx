import { createContext, useState, useEffect } from "react";
import run from "../config/Gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const delayPara = (index, nextWord) => {
    setTimeout(function () {
      setResultData((prev) => prev + nextWord);
    }, 25 * index);
  };

  const newChat= ()=>{
    setLoading(false);
    console.log(loading);
    setShowResult(false);
    console.log(showResult);
  }

  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);

    const currentPrompt = prompt || input; // Use `prompt` if provided, else `input`
    
  // Only add to `prevPrompts` if the prompt is new
  setPrevPrompts((prev) => 
    prev.includes(currentPrompt) ? prev : [...prev, currentPrompt]
  );
  setRecentPrompt(currentPrompt);

  const response = await run(currentPrompt);

    let responseArray = response.split("**");
    let newResponse = "";
    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newResponse += responseArray[i];
      } else {
        newResponse += "<b>" + responseArray[i] + "</b>";
      }
    }
    let newResponse2 = newResponse.split("*").join("<br/>");
    let newResponseArray = newResponse2.split(" ");
    for (let i = 0; i < newResponseArray.length; i++) {
      const nextWord = newResponseArray[i];
      delayPara(i, nextWord + " ");
    }
    setLoading(false);
    setInput("");
  };
  

  useEffect(() => {
    if (recentPrompt !== "") {
        onSent(recentPrompt);
      }
  }, []);

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
    newChat
  };
  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};
export default ContextProvider;
