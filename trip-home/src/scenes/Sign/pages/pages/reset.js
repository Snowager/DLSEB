import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth, sendPasswordResetEmail } from "./firebase";
import "../styles/reset.css";

function Reset() {
  const [email, setEmail] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const [emailMessage, setEmailMessage] = useState (false);

  const navigate = useNavigate();
  useEffect(() => {
    if (loading) return;
    if (user) navigate("/profile");
  }, [user, loading]);

  const triggerResetEmail = async () => {
    await sendPasswordResetEmail(auth, email);
    console.log("Password reset email sent")
    setEmailMessage(true);
  }
  
  return (
    <div className="reset">
      <div className="reset__container">
        <input
          type="text"
          className="reset__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <button className="reset__btn" type="button" onClick={triggerResetEmail}>Reset password</button>
        <div> 
          {emailMessage ? <p> Email was sent! The email may be in your spam folder.</p> : null}
        </div>
        <div>
          Sign in to your account <Link to="/register">Sign in</Link> now.
        </div>
      </div>
    </div>
  );
}
export default Reset;
