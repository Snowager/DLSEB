import {
    getAuth,
    getMultiFactorResolver,
    PhoneAuthProvider,
    PhoneMultiFactorGenerator,
    RecaptchaVerifier,
    signInWithEmailAndPassword,
    email, password, selectedIndex, verificationCode
} from "firebase/auth";

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