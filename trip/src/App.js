import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/' element={< Home />} />
        </Routes>
      </Router>
    </>
  );
}
export default App;
