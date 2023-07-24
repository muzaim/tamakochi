import React from "react";

const Button = ({ action, text, textColor, bgColor, activeColor }) => {
  console.log(`ini bg color`, bgColor);
  return (
    <div>
      <div
        className={`w-full h-full bg-[${bgColor}] rounded-full py-3 text-center active:bg-[${activeColor}] group`}
        onClick={action}
      >
        <div className={`font-semibold capitalize text-lg tracking-wider`}>
          <span
            className={`text-[${textColor}] group-active:text-[${bgColor}]`}
          >
            {text}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Button;
