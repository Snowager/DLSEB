@ECHO OFF

cd trip-home
cd src

call npm install react-scripts  
call npm nstall react-google-login --legacy-peer-deps
call npm nstall @react-google-maps --legacy-peer-deps
call npm install gapi-script --legacy-peer-deps
call npm start