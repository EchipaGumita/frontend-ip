import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../src/pages/LoginPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* Add more routes as necessary */}
      </Routes>
    </Router>
  );
};

export default App;