import { useState, useEffect, useRef } from "react";

type Props = {
  text: string;
  speed?: number;
};

export const useTypewriter = (text: string, speed: number) => {
  const [displayText, setDisplayText] = useState("");
  const idx = useRef(0);
  const displayTextRef = useRef("");
  useEffect(() => {
    const typingInterval = setInterval(() => {
      if (idx.current < text.length) {
        displayTextRef.current += text.charAt(idx.current);
        setDisplayText(() => displayTextRef.current);
        idx.current += 1;
      } else {
        clearInterval(typingInterval);
      }
    }, speed);
    return () => {
      setDisplayText("");
      clearInterval(typingInterval);
    };
  }, [text, speed]);
  return displayText;
};

const Typewriter = ({ text, speed }: Props) => {
  const displayText = useTypewriter(text, speed ? speed : 50);
  return (
    <p
      style={{ display: "contents", fontFamily: "cursive", lineHeight: "20px" }}
    >
      {displayText}
    </p>
  );
};

export default Typewriter;
