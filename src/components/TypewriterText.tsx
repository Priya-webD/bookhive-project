import { useState, useEffect } from "react";

interface TypewriterTextProps {
  text: string;
  speed?: number;
  className?: string;
}

const TypewriterText = ({ text, speed = 100, className = "" }: TypewriterTextProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return (
    <div className={`relative ${className}`}>
      <span 
        className="font-poppins font-bold bg-gradient-to-r from-[#00C853] to-[#FFD600] bg-clip-text text-transparent"
        style={{
          background: "linear-gradient(90deg, #00C853 0%, #FFD600 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text"
        }}
      >
        {displayedText}
      </span>
      <span className="animate-cursor-blink text-[#00C853] font-poppins font-bold">|</span>
    </div>
  );
};

export default TypewriterText;