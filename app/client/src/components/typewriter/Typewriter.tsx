import { useState, useEffect } from "react";

type Props = {
  text: string;
  speed?: number;
};

const useTypewriter = (text: string, speed = 50) => {
  const [displayText, setDisplayText] = useState("");
  useEffect(() => {
    let i = 0;

    const typeCharacter = () => {
      if (i < text.length) {
        setDisplayText((prevText) => prevText + text.charAt(i));
        setTimeout(typeCharacter, speed);
      }
      i++;
    };

    typeCharacter();
  }, [text, speed]);

  return displayText;
};

const Typewriter = ({ text, speed }: Props) => {
  const displayText = useTypewriter(text, speed);
  return <p style={{ display: "contents" }}>{displayText}</p>;
};

export default Typewriter;
