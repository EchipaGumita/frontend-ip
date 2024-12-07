import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../src/pages/LoginPage';
import Dashboard from '../src/pages/Dashboard';
import ProfessorList from './pages/ProfessorList';
import ForgotPasswordPage from './pages/ForgotPassword';
import StudentsList from './pages/StudentList';
import EditExam from './pages/EditExam';
import RequestList from './pages/RequestList';
import CreateExamForm from './pages/CreateExamForm';
import ExamsList from './pages/ExamsList';
import AddProfessorForm from './pages/AddProfessorForm';
import AddStudentForm from './pages/AddStudentForm';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/professorlist" element={<ProfessorList />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/studentlist" element={<StudentsList />} />
        <Route path="/edit-exam/:id" element={<EditExam />} />  {/* Dynamic route */}
        <Route path="/requestlist" element={<RequestList />} />
        <Route path="/createexam" element={<CreateExamForm />} />
        <Route path="/examslist" element={<ExamsList />} />
        <Route path="/addprofessor" element={<AddProfessorForm />} />
        <Route path="/addstudent" element={<AddStudentForm />} />


      </Routes>
    </Router>
  );
};

export default App;
