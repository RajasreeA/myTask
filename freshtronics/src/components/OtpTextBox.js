import React, { useRef } from "react";
import "../assets/textbox.css";

const OtpTextBox = ({ value, onChange }) => {
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const handleChange = (index, event) => {
    const sanitizedValue = event.target.value.replace(/\D/g, "").slice(0, 1);
    const nextInput = inputRefs[index + 1]?.current;
    const prevInput = inputRefs[index - 1]?.current;

    event.target.value = sanitizedValue;

    if (sanitizedValue && nextInput) {
      nextInput.focus();
    } else if (!sanitizedValue && prevInput) {
      prevInput.focus();
    }

    const newOtpValue = inputRefs.reduce(
      (otp, ref) => otp + (ref.current ? ref.current.value : ""),
      ""
    );
    onChange(newOtpValue);
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && event.target.value === "" && index > 0) {
      const prevInput = inputRefs[index - 1]?.current;
      if (prevInput) {
        prevInput.focus();
      }
    } else if (event.key === "Tab") {
      event.preventDefault();
    }
  };

  const inputStyle = {
    fontSize: "1.5rem",
    textAlign: "center",
    padding: "0.5rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
    marginRight: "0.5rem", // Add space between inputs
  };

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div className="otp-textbox" style={containerStyle}>
      {Array.from({ length: 4 }).map((_, index) => (
        <input
          key={index}
          ref={inputRefs[index]}
          type="text"
          maxLength={1}
          value={value[index] || ""}
          onChange={(e) => handleChange(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          style={inputStyle}
        />
      ))}
    </div>
  );
};

export default OtpTextBox;
