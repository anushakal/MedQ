const openAI = require('openai');
const express = require('express');
const cors = require('cors');

require('dotenv').config()

const app = express();
const port = process.env.PORT || 5000;

// Initialize OpenAI API client
const openai = new openAI({
  apiKey: process.env.OPENAI_API_KEY
});

const GPT_MODEL = "gpt-3.5-turbo";

app.use(cors());
app.use(express.json());

const getGPTResponse = async (messages, userInput) => await openai.chat.completions.create({
  model: GPT_MODEL,
  messages: [
    { 
      role: "system", 
      content: "You are a clinician providing medical assistance and guidance. Don't answer if the question is not medical-related!"
    },
    ...messages.map((msg) => ({
      role: msg.sender === "user" ? "user" : "assistant",
      content: msg.text,
    })),
    {
      role: "user",
      content: userInput,
    },
  ],
});

const getMsgSummary = async (userInput) => await openai.chat.completions.create({
  model: GPT_MODEL,
  messages: [
    { 
      role: "system", 
      content: "You are a clinician. Summarize the following text succinctly. Be sure to include all the key medical terms and numbers mentioned in the original message."
    },
    {
      role: "user",
      content: userInput,
    },
  ],
});

const getChatSummary = async (fullChat) => await openai.chat.completions.create({
  model: GPT_MODEL,
  messages: [
    { 
      role: "system", 
      content: "You are a clinician providing medical assistance and guidance. Summarize the entire chat succintly."
    },
    {
      role: "user",
      content: fullChat
    },
  ],
});

// API call for responding to messages
app.post('/api/chat', async (req, res) => {
  messages = req.body.messages
  userInput = req.body.userInput
  const response = await getGPTResponse(messages, userInput);
  res.send(response.choices[0].message);
});

// API call for responding to messages
app.post('/api/summarize_msg', async (req, res) => {
  userInput = req.body.userInput
  const response = await getMsgSummary(userInput);
  res.send(response.choices[0].message);
});

// API call for responding to messages
app.post('/api/summarize_chat', async (req, res) => {
  console.log("\n\nOG REQUEST")
  console.log(req.body)
  fullChat = req.body.fullChat
  console.log("USER INPUT", fullChat)

  const response = await getChatSummary(fullChat);

  console.log("\n\nGPT RESPONSE")
  console.log(response.choices[0].message);
  res.send(response.choices[0].message);
});

app.listen(port, () => console.log(`Server listening on port ${port}`));