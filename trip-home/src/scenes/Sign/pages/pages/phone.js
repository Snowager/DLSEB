import React from 'react';
import { Button, Divider, Grid, TextField } from '@material-ui/core';
import PhoneInput from 'react-phone-input-2';
import { getAuth, RecaptchaVerifier} from "firebase/auth";
import firebase from 'firebase';


function Phone() {
   const phone_number = () => {
   const [phone_number, setPhone_number] = React.useState('');
   const [code, setCode] = React.useState('');
   const handleConfirmCode = () => {
       if(!code){
           alert('Please add the code')
       }else {
           window.confirmationResult.confirm(code).then(result => console.log(result.user, 'result'))
       }
   }


}
const handleSendOtp = () => {
   if(!phone_number){
       alert('Enter phone number to verify')
   }else {
    const auth = getAuth();
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {}, auth);
       const phoneValue = '+' + phone_number;
       firebase.auth().signInWithPhoneNumber(phoneValue, appVerifier)
       .then((confirmationResult) => {
           window.confirmationResult = confirmationResult;
       }).catch(error => console.log(error));
   }
};
React.useEffect(() => {
   window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
       'size': 'invisible',
       'callback': (response) => {
         console.log(response, 'response')
       }
   });
}, [])
return (
   <div>
       <Divider />
       <br />
       <PhoneInput
           country={'in'}
           value={phone}
           inputStyle={{ width: '98%'}}
           onChange={(val) => setPhone_number(val)}
       />
       <br />
       <TextField
           variant="outlined"
           color="primary"
           value={code}
           onChange={(e) => {
               const val = e.target.value;
               setCode(val)
           }}
           size="small"
           placeholder="Enter verification code"
       />
       <br />
       <br />
       <Grid container justify="space-between">
           <Grid item>
               <Button
                   variant="outlined"
                   color="default"
                   id="sign-in-button"
                   size="small"
                   onClick={() => handleSendOtp()}
               >
                   Send Code
               </Button>
           </Grid>
           <Grid item >
               <Button
                   variant="outlined"
                   color="primary"
                   size="small"
                   onClick={() => handleConfirmCode()}
               >
                   Confirm Code
               </Button>
           </Grid>
       </Grid>
       <br />
   </div>
);
       }
export default Phone;

