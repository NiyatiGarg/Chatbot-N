import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "AIzaSyDAcgcq6pqcbe4lSFC9BmWYywfHZFEFwMQ"; 
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

async function run(prompt, isNewSession = false) {
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

export { run, getConversationHistory, resetSession };