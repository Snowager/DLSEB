import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, signInWithEmailAndPassword, signInWithGoogle } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {getAuth,getMultiFactorResolver,PhoneAuthProvider,PhoneMultiFactorGenerator,RecaptchaVerifier, selectedIndex, verificationCode} from "firebase/auth";

import "../styles/login.css";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  
const recaptchaVerifier = new RecaptchaVerifier('recaptcha-container-id', undefined, auth);

const auth = getAuth();
signInWithEmailAndPassword(auth, email, password)
    .then(function (userCredential) {
        // User is not enrolled with a second factor and is successfully
        // signed in.
        // ...
    })
    .catch(function (error) {
        if (error.code == 'auth/multi-factor-auth-required') {
            const resolver = getMultiFactorResolver(auth, error);
            // Ask user which second factor to use.
            if (resolver.hints[selectedIndex].factorId ===
                PhoneMultiFactorGenerator.FACTOR_ID) {
                const phoneInfoOptions = {
                    multiFactorHint: resolver.hints[selectedIndex],
                    session: resolver.session
                };
                const phoneAuthProvider = new PhoneAuthProvider(auth);
                // Send SMS verification code
                return phoneAuthProvider.verifyPhoneNumber(phoneInfoOptions, recaptchaVerifier)
                    .then(function (verificationId) {
                        // Ask user for the SMS verification code. Then:
                        const cred = PhoneAuthProvider.credential(
                            verificationId, verificationCode);
                        const multiFactorAssertion =
                            PhoneMultiFactorGenerator.assertion(cred);
                        // Complete sign-in.
                        return resolver.resolveSignIn(multiFactorAssertion)
                    })
                    .then(function (userCredential) {
                        // User successfully signed in with the second factor phone number.
                    });
            } else {
                // Unsupported second factor.
            }
        } else if (error.code == 'auth/wrong-password') {
            // Handle other errors such as wrong password.
        }
    });
  
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/dashboard");
  }, [user, loading]);
  return (
    <div className="login">
      <div className="login__container">
        <input
          type="text"
          className="login__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="login__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          className="login__btn"
          onClick={() => signInWithEmailAndPassword(email, password)}
        >
          Login
        </button>
        <button className="login__btn login__google" onClick={signInWithGoogle}>
          Login with Google
        </button>
        <div>
          <Link to="/reset">Forgot Password</Link>
        </div>
        <div>
          Don't have an account? <Link to="/register">Register</Link> now.
        </div>
      </div>
    </div>
  );
}
export default Login;
