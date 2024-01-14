import { useState } from "react";
import { OtpInput } from "./OtpInput";

export const InputPhoneNumber = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOtp, setShowOtp] = useState(false);

  const phoneNumberHandler = (e) => {
    setPhoneNumber(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const regex = /[^0-9]/g;

    if (phoneNumber.length < 10 || regex.test(phoneNumber)) {
      window.alert("Please enter a valid phone number");

      return;
    }

    setShowOtp(true);
  };
  const otpHandler = (otp) => {
    console.log(otp);
  };
  return (
    <>
      {!showOtp ? (
        <form onSubmit={submitHandler}>
          <input
            className="phoneNumberInput"
            type="text"
            placeholder="Enter Phone Number"
            onChange={phoneNumberHandler}
            value={phoneNumber}
          />
          <button type="submit">Submit</button>
        </form>
      ) : (
        <>
          <p>Enter OTP sent to {phoneNumber}</p>
          <OtpInput length={4} onOtpSubmit={otpHandler} />
        </>
      )}
    </>
  );
};
