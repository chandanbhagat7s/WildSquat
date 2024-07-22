import { useEffect, useState } from "react";
import "./TextWave.css";

const TextWave = ({ text, animationDelay = 0.01 }) => {
  const [letters, setLetters] = useState([]);

  useEffect(() => {
    setLetters(text.replace(" ", "    ").split(" "));
  }, [text]);

  return (
    <div className="bouncing-text">
      {letters.map((letter, index) => (
        <span
          key={index}
          className="bouncing-letter"
          style={{ animationDelay: `${index * animationDelay}s` }}
        >
          {letter}
        </span>
      ))}
    </div>
  );
};

export default TextWave;
