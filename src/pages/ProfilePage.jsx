import { useState, useEffect } from "react";

const SAMPLE_EMAIL = "demo@grocerease.com"; // sample mail for viva

export default function ProfilePage({ userEmail, setUserEmail }) {
  const [emailInput, setEmailInput] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (userEmail) {
      setEmailInput(userEmail);
    }
  }, [userEmail]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!emailInput.includes("@") || !emailInput.includes(".")) {
      setMessage("Please enter a valid email address.");
      return;
    }

    // Optional: you can restrict login only to SAMPLE_EMAIL in viva if you want.
    // If you don't want restriction, comment this block.
    if (emailInput.toLowerCase() !== SAMPLE_EMAIL.toLowerCase()) {
      setMessage(
        `For demo, please use the sample email: ${SAMPLE_EMAIL}`
      );
      return;
    }

    setUserEmail(emailInput);
    localStorage.setItem("grocereaseUserEmail", emailInput);
    setMessage("Logged in successfully!");
  };

  const handleLogout = () => {
    setUserEmail("");
    localStorage.removeItem("grocereaseUserEmail");
    setEmailInput("");
    setMessage("You have been logged out.");
  };

  return (
    <section className="profile-page">
      <div className="profile-card">
        <h2 className="profile-title">
          {userEmail ? "Your Profile" : "Login to GrocerEase"}
        </h2>

        <p className="profile-subtitle">
          {userEmail
            ? "You are currently logged in with the email shown below."
            : "For demo purposes, you can login using a sample email address."}
        </p>

        <form className="profile-form" onSubmit={handleSubmit}>
          <label className="profile-label">
            Email address
            <input
              type="email"
              placeholder={SAMPLE_EMAIL}
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className="profile-input"
            />
          </label>

          <button type="submit" className="btn-primary profile-btn">
            {userEmail ? "Update Email" : "Login"}
          </button>
        </form>

        {userEmail && (
          <div className="profile-info">
            <div className="profile-info-label">Logged in as:</div>
            <div className="profile-info-email">{userEmail}</div>
            <button className="btn-outline" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}

        {message && <p className="profile-message">{message}</p>}

        <div className="profile-hint">
          <strong>Demo note:</strong> use <code>{SAMPLE_EMAIL}</code> as sample
          login email.
        </div>
      </div>
    </section>
  );
}
