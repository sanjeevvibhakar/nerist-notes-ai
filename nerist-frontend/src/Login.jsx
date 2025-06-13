import React, { useState, useEffect } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber, getAuth } from "firebase/auth";
import { app } from "./firebase";

const Login = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmation, setConfirmation] = useState(null);
  const [recaptchaReady, setRecaptchaReady] = useState(false);

  useEffect(() => {
    const auth = getAuth(app);
    if (!window.recaptchaVerifier && auth) {
      try {
        window.recaptchaVerifier = new RecaptchaVerifier(
          "recaptcha",
          {
            size: "invisible",
            callback: () => {
              console.log("reCAPTCHA solved");
            }
          },
          auth
        );
        setRecaptchaReady(true);
      } catch (err) {
        console.error("Recaptcha init error:", err);
      }
    }
  }, []);

  const handleSendOtp = async () => {
    const auth = getAuth(app);
    const appVerifier = window.recaptchaVerifier;

    try {
      const result = await signInWithPhoneNumber(auth, phone, appVerifier);
      setConfirmation(result);
      alert("OTP sent!");
    } catch (err) {
      alert("Error sending OTP: " + err.message);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      await confirmation.confirm(otp);
      alert("Phone verified! ✅");
    } catch (err) {
      alert("Invalid OTP ❌");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Phone OTP Login</h2>
      <input
        type="text"
        placeholder="Enter phone (+91xxxxxxxxxx)"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <button onClick={handleSendOtp} disabled={!recaptchaReady}>
        Send OTP
      </button>

      <br /><br />
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button onClick={handleVerifyOtp}>Verify OTP</button>

      <div id="recaptcha"></div>
    </div>
  );
};

export default Login;
