import React, { useEffect, useState, useContext } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

import { Context } from "../context/Context";

import { LuMic } from "react-icons/lu";
import { RxReset } from "react-icons/rx";

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
    setInput("");
  };
  
  useEffect(() => {
    // Automatically stop speech recognition if there's no speech detected for a while
    if (!listening && transcript) {
      handleSendFunction(); // Call send function as soon as you stop speaking
    }
  }, [transcript, handleSendFunction]);

  useEffect(() => {
    if (transcriptData) {
      setInput(transcriptData);
    }
  }, [transcriptData, input]);


  return (
    <div>
     {input &&  <div onClick={handleReset} style={{ cursor: "pointer", fontSize: '1.5rem', color: '#4C5051',  }}> <RxReset /></div>}
     <div onClick={handleStartStop} style={{color: listening ? "green" : "#4C5051" , fontSize: '1.5rem'}}>
      <LuMic />
      </div>
     
    </div>
  );
};

export default MicFeature;
