//import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from './scenes/Sign/pages/pages/Login'; //login//
import Register from './scenes/Sign/pages/pages/Register';
import Reset from './scenes/Sign/pages/pages/Reset';
import Dashboard from './scenes/Sign/pages/pages/Dashboard';
function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          {<Route exact path="/reset" element={<Reset />} /> }
          <Route exact path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;