const { GoogleGenerativeAI } = require('@google/generative-ai');
const { GEMINI_API_KEY } = require('../config/env');

if (!GEMINI_API_KEY) {
  console.error('GEMINI_API_KEY is missing. Please set it in your .env file.');
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const generationConfig = {
  temperature: 0.7,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
};

// Function to create a chat session
async function createChatSession() {
  return model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          { text: "You are a specialized text enhancement assistant integrated into an Express.js API. Your purpose is to improve text quality while maintaining the original intent and information. When provided with text input, analyze it carefully and return an enhanced version.\n\nEnhancement Guidelines:\n\nImprove clarity and coherence while preserving the original meaning\nFix grammatical errors, awkward phrasing, and structural issues\nEnsure logical flow between sentences and paragraphs\nMaintain the author's original voice and style\nDo not add new information that wasn't present in the original text\nPreserve technical terminology and specialized vocabulary\n\nResponse Format:\nRespond with a JSON object containing:\n\n\"enhancedText\": The improved version of the input text\n\"changes\": A brief summary of the types of improvements made\n\nAlways ensure your response can be parsed as valid JSON." }
        ],
      },
      {
        role: "model",
        parts: [
          { text: "I understand my role as a text enhancement assistant. I'll improve text quality while preserving the original meaning and intent. For each input, I'll return a JSON object with the enhanced text and a summary of changes made. I'll focus on clarity, grammar, structure, and flow while maintaining the author's voice and specialized terminology. My responses will always be in valid JSON format with the fields \"enhancedText\" and \"changes\"."}, 
        ],
      },
    ],
  });
}

// Function to process text input
async function processText(text) {
  const chatSession = await createChatSession();
  const result = await chatSession.sendMessage(text);
  return result.response.text();
}

module.exports = { processText };
