import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import "../ForgotPassword.css";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Generate a reset link (this should match your frontend's reset page)
    const resetLink = `http://localhost:5173/resetpassword?email=${encodeURIComponent(
      email
    )}`;

    // Send email using EmailJS
    emailjs
      .send(
        "service_vqfyedr", // Replace with your EmailJS service ID
        "template_fllkwqr", // Replace with your EmailJS template ID
        {
          to_name: email, // Recipient's name or email
          from_name: "ExamScheduler Team", // Sender's name
          message: `Click the following link to reset your password: ${resetLink}`, // Reset link message
        },
        "z6wqEXH6aNHBXs4nT" // Replace with your EmailJS public key
      )
      .then(
        () => {
          setMessage("Password reset email sent successfully.");
        },
        (error) => {
          console.error("Error sending email:", error);
          setMessage("Failed to send password reset email.");
        }
      );
  };

  return (
    <div style={containerStyle}>
      <div style={logoContainerStyle}>
        <img
          src="../../src/assets/logo usv.png"
          alt="USV Logo"
          style={logoStyle}
        />
      </div>

      <div style={formContainerStyle}>
        <h2 style={formTitleStyle}>Forgot Password</h2>
        <p style={formSubtitleStyle}>
          Enter your email address to receive a password reset link.
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleChange}
            style={inputStyle}
            required
          />
          <button type="submit" className="button">
            Send Email
          </button>
        </form>
        {message && <p style={messageStyle}>{message}</p>}
      </div>
    </div>
  );
};

// CSS-in-JS styles
const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  backgroundColor: "#f2f2f2",
  padding: "20px",
};

const logoContainerStyle = {
  flex: 1,
  textAlign: "center",
  padding: "20px",
};

const logoStyle = {
  width: "150px",
  marginBottom: "10px",
};

const formContainerStyle = {
  flex: 1,
  backgroundColor: "#6699cc",
  padding: "30px",
  borderRadius: "8px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  maxWidth: "400px",
};

const formTitleStyle = {
  marginBottom: "10px",
  fontSize: "22px",
  fontWeight: "bold",
  color: "#f2f2f2",
};

const formSubtitleStyle = {
  marginBottom: "20px",
  fontSize: "14px",
  color: "#f2f2f2",
};

const inputStyle = {
  width: "100%",
  marginBottom: "15px",
  padding: "10px",
  fontSize: "14px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  outline: "none",
};

const messageStyle = {
  marginTop: "15px",
  fontSize: "14px",
  color: "#f2f2f2",
};

export default ForgotPasswordPage;
