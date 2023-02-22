@ECHO OFF

cd trip-home
cd src

call npm install react-scripts  
call npm install react-google-login --legacy-peer-deps
call npm install react-google-maps --legacy-peer-deps
call npm install gapi-script --legacy-peer-deps
call npm install firebase --legacy-peer-deps 
call npm install i @reach/combobox --legacy-peer-deps 
call npm install  apollo-link apollo-cache-inmemory apollo-link-state --legacy-peer-deps
call npm start