import React from "react";

const Loader = () => {
  return (
    <div className="relative w-full h-full">
      <div
        className="absolute inset-0 rounded-full shadow-inner"
        style={{
          boxShadow: "0 0 0 3px inset #000000 ",
          animation: "loaderAnim 0.75s infinite alternate",
        }}
      ></div>

      <style>
        {`
          @keyframes loaderAnim {
            0% { inset: 0 35% 0 0; }
            50% { inset: 0 0 0 0; }
            100% { inset: 0 0 0 35%; }
          }
        `}
      </style>
    </div>
  );
};

export default Loader;
