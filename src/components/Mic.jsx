import React, { useEffect, useState, useContext } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

import { Context } from "../context/Context";

// import mic from "../assets/mic_icon.png";
import { LuMic } from "react-icons/lu";

const MicFeature = ({ handleSendFunction }) => {
  const [transcriptData, setTranscriptData] = useState("");
  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const {setInput, input} = useContext(Context);

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return <p>Your browser does not support speech recognition.</p>;
  }

  const handleStartStop = () => {
    if (listening) {
      // Stop listening if already listening
      SpeechRecognition.stopListening();
      setTranscriptData(transcript);  // Save the transcript when stopping
      handleSendFunction();
      setInput("");
    

    } else {
      // Start listening if not listening
        resetTranscript();
        setInput("");
      SpeechRecognition.startListening({ continuous: true });
    }
  };

  const handleReset = () => {
    resetTranscript();
    setInput(""); // Clear the input when transcript is reset
  };
  
  useEffect(() => {
    // Automatically stop speech recognition if there's no speech detected for a while
    if (!listening && transcript) {
      handleSendFunction(); // Call send function as soon as you stop speaking
    }
  }, [transcript, handleSendFunction]);

  useEffect(() => {
    if (transcriptData) {
      setInput(transcriptData); // Set the input in real-time as you speak
    }
  }, [transcriptData, setInput]);


  return (
    <div>
     <div onClick={handleStartStop} style={{color: listening ? "green" : "grey" , fontSize: '1.5rem'}}>
      <LuMic />
      </div>
      {input &&  <div onClick={handleReset} style={{ cursor: "pointer" }}>🔄</div>}
     
    </div>
  );
};

export default MicFeature;
