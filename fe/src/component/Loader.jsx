// Loader.jsx
import React from "react";

const Loader = () => {
  return (
    <div className="relative w-8 h-8 inline-block">
      {/* First circle */}
      <span
        className="absolute w-8 h-8 rounded-full border-2 border-black top-0 left-0"
        style={{
          animation: "animloader 2s linear infinite",
        }}
      ></span>

      {/* Second circle */}
      <span
        className="absolute w-8 h-8 rounded-full border-2 border-black top-0 left-0"
        style={{
          animation: "animloader 2s linear infinite",
          animationDelay: "1s",
        }}
      ></span>

      <style>
        {`
          @keyframes animloader {
            0% {
              transform: scale(0);
              opacity: 1;
            }
            100% {
              transform: scale(1);
              opacity: 0;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Loader;
