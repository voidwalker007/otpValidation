import { useRef, useState, useEffect } from "react";

export const OtpInput = ({ length, onOtpSubmit }) => {
  const [otp, setOtp] = useState(Array(length).fill(""));

  const inputRef = useRef([]); //using ref to implement autofocus to the first input box

  const changeHandler = (index, e) => {
    let value = e.target.value;
    if (isNaN(value)) return;

    //moving to next input find after filing last one
    if (value && index < length - 1) {
      e.target.nextSibling.focus();
    }

    let newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    //combine all otp
    let combinedOtp = newOtp.join("");

    if (combinedOtp.length === length) {
      onOtpSubmit(combinedOtp);
    }
  };

  const clickHandler = (index) => {
    //moving cursor from the front of the input value to the end of it eg: |2   2|
    inputRef.current[index].setSelectionRange(1, 1);
  };

  const keyDownHandler = (index, e) => {
    //moveing focus to the previous input box
    if (e.key === "Backspace" && index !== 0 && !otp[index]) {
      e.target.previousSibling.focus();
    }
  };

  useEffect(() => {
    if (inputRef.current[0]) {
      inputRef.current[0].focus();
    }
  }, []);

  return (
    <div>
      {otp.map((item, index) => {
        return (
          <input
            className="otpInput"
            ref={(val) => (inputRef.current[index] = val)}
            key={index}
            type="text"
            maxLength={1}
            value={item}
            onChange={(e) => changeHandler(index, e)}
            onClick={() => clickHandler(index)}
            onKeyDown={(e) => keyDownHandler(index, e)}
          />
        );
      })}
    </div>
  );
};
