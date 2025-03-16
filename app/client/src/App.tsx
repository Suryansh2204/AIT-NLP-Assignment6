import { ThemeProvider } from "@emotion/react";
import "./App.css";
import Chatbot from "./components/chatbot/Chatbot";
import { AppBar, createTheme, Toolbar, Typography } from "@mui/material";

function App() {
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
  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">Ask Away</Typography>
          </Toolbar>
        </AppBar>
        <Chatbot />
      </ThemeProvider>
    </div>
  );
}

export default App;
