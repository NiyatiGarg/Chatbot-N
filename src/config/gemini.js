import { GoogleGenerativeAI } from "@google/generative-ai";
import { Buffer } from "buffer";
import robotImg from '../assets/send_icon.png';

const apiKey = "AIzaSyCbtj36053pa3Cr_cYyNZqf6SI_gEzlfNc"; 
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 0.7,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

// Initialize chat session once
let chatSession = null;
let history = [];

async function run(prompt, selectedFiles, isNewSession = false) {
 // Reset history if it's a new session
 if (isNewSession || !chatSession) {
  history = [];
  chatSession = null;
}
  // Add new user message to history
  history.push({
    role: "user",
    parts: [{ text: prompt }]
  });

  if (selectedFiles) {
    try {
      const result=  await AnalyzeImage(selectedFiles, prompt)
      console.log(result, 'result for image');
     
   // Add model's response to history
   history.push({
     role: "model",
     parts: [{ text: result.response.text() }]
   });

   // Return both the response and the full history
   return {
     currentResponse: result.response.text(),
     history: history
   };
 } catch (error) {
   console.error("Error in chat session:", error);
   throw error;
 }
  }

  // Create new chat session if it doesn't exist
  if (!chatSession) {
    chatSession = await model.startChat({
      generationConfig,
      history: history,
    });
  }
  try {
    const result = await chatSession.sendMessage(prompt);
    const response = result.response;

    // Add model's response to history
    history.push({
      role: "model",
      parts: [{ text: response.text() }]
    });

    // Return both the response and the full history
    return {
      currentResponse: response.text(),
      history: history
    };
  } catch (error) {
    console.error("Error in chat session:", error);
    throw error;
  }

  
}

// Function to get current conversation history
function getConversationHistory() {
  return history;
}

// Function to reset the session
function resetSession() {
  history = [];
  chatSession = null;
}

const AnalyzeImage= async(imageFile, imagePrompt)=>{

  try {
    // Create a new FileReader instance
    const reader = new FileReader();

    // Return a promise that resolves when the reader finishes reading the file
    const imageBase64 = await new Promise((resolve, reject) => {
      reader.onloadend = () => {
        const base64String = reader.result.split(',')[1]; // Get base64 part (after 'data:image/png;base64,')
        resolve(base64String); // Resolve with base64 string
      };
      
      reader.onerror = reject; // Reject if an error occurs
      
      // Read the file as Data URL (Base64)
      reader.readAsDataURL(imageFile);
    });

const result = await model.generateContent([
    {
        inlineData: {
            data: imageBase64,
            mimeType: "image/png",
        },
    },
    imagePrompt,
]);
console.log(result.response.text()); //Yes! we are getting the result correct

return result;

} catch (error) {
  console.error('Error analyzing image:', error);
  throw error;  // Handle any errors
}
};


export { run, getConversationHistory, resetSession, AnalyzeImage};