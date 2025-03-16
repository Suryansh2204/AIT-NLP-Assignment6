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
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [isBotTyping, setIsBotTyping] = useState<boolean>(false);

  const sendMessage = () => {
    if (!input.trim() || isBotTyping) return;

    const userMessage: Message = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsBotTyping(true);

    setTimeout(() => {
      const botResponse: Message = {
        text: input,
        sender: "bot",
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsBotTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
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
                {/* {msg.text} */}
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
              onClick={sendMessage}
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
