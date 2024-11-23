import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../src/pages/LoginPage';
import Dashboard from '../src/pages/Dashboard';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;

/**
 function App() {
  return (
    <div className="h-full w-full">
      <div className="bg-home-page-bg absolute left-0 top-0 z-0 flex h-[540px] w-full bg-cover bg-center bg-no-repeat"></div>
      <div className="z-1 relative flex w-full flex-col p-8 lg:p-12">
      </div>
    </div>
  );
}

export default App;
 */