@ECHO OFF

cd trip-home
cd src


call npm install react-scripts --legacy-peer-deps
call npm install @mui/material @emotion/react @emotion/styled --legacy-peer-deps
call npm install mdb-react-ui-kit --legacy-peer-deps
call npm install @mui/icons-material --legacy-peer-deps
call npm install react-google-login --legacy-peer-deps
call npm install react-google-maps --legacy-peer-deps
call npm install gapi-script --legacy-peer-deps
call npm install firebase --legacy-peer-deps 
call npm install i @reach/combobox --legacy-peer-deps
call npm install react-star-ratings -legacy-peer-deps 
call npm install @apollo/client --legacy-peer-deps
call npm install graphql --legacy-peer-deps
call npm install i @reach/combobox --legacy-peer-deps 
call npm install apollo-link apollo-cache-inmemory apollo-link-state --legacy-peer-deps
call npm install react-star-ratings --legacy-peer-deps
call npm start