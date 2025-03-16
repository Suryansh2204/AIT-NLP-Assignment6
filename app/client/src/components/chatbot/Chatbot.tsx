import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Paper,
  createTheme,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import "./Chatbot.css";
import Typewriter from "../typewriter/Typewriter";
// import Typewriter from "../typewriter/Typewriter";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9",
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
    text: {
      primary: "#ffffff",
    },
  },
});

interface Message {
  text: string;
  sender: "user" | "bot";
  source?: string;
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [isBotTyping, setIsBotTyping] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (!input.trim() || isBotTyping) return;
    let answer = "";
    const userMessage: Message = { text: input, sender: "user" };

    try {
      const response = await fetch(
        `http://localhost:5000/get-answer?question=${input.trim()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const res = await response.json();
        if (res.error) {
          console.log(res.error);
        } else {
          answer = res.answer;
          if (res.source && answer !== "I don't know.") {
            answer += ` (source: ${res.source})`;
          }
        }
      }
    } catch (error) {
      if (error) console.error("Error:", error);
      console.log("Something went wrong. Please try again later.");
    }

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsBotTyping(true);

    setTimeout(() => {
      const botResponse: Message = {
        text: answer,
        sender: "bot",
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsBotTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Box className="chat-wrapper">
        <Paper className="chat-container" elevation={3}>
          <Box className="chat-messages">
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                className={`message ${
                  msg.sender === "user" ? "user-message" : "bot-message"
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {msg.sender === "bot" ? (
                  <Typewriter text={msg.text} />
                ) : (
                  msg.text
                )}
              </motion.div>
            ))}
          </Box>
          <Box className="input-container">
            <TextField
              fullWidth
              variant="outlined"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isBotTyping}
              placeholder="Type a message..."
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={isBotTyping || !input.trim()}
            >
              Send
            </Button>
          </Box>
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default Chatbot;
