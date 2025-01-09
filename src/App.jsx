import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../middleware/ProtecteRoute'; // Ensure this path is correct
import Login from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import ProfessorList from './pages/ProfessorList';
import ForgotPasswordPage from './pages/ForgotPassword';
import StudentsList from './pages/StudentList';
import EditExam from './pages/EditExam';
import RequestList from './pages/RequestList';
import CreateExamForm from './pages/CreateExamForm';
import ExamsList from './pages/ExamsList';
import AddProfessorForm from './pages/AddProfessorForm';
import AddStudentForm from './pages/AddStudentForm';
import EditProfessor from './pages/EditProfessor';
import EditStudent from './pages/EditStudent';
import CreateClassForm from './pages/CreateClassForm';
import CreateExamRequest from './pages/CreateExamRequest';
import ViewExamStudent from './pages/viewExamStudent';
import ResetPasswordPage from './pages/ResetPasswordPage';
import CreateGroup_SubgroupForm from './pages/CreateGroup-SubgroupForm';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/resetpassword" element={< ResetPasswordPage/>} />
        <Route path="/resetpassword" element={< ResetPasswordPage/>} />
        

        {/* Protected Routes for Students */}
        <Route element={<ProtectedRoute allowedRoles={['student']} />}>
        <Route path="/viewexamstudent" element={<ViewExamStudent />} />
        </Route>

        {/* Protected Routes for Professors */}
        <Route element={<ProtectedRoute allowedRoles={['professor']} />}>

          
          <Route path="/createexam" element={<CreateExamForm />} />
          <Route path="/creategroup-subgroup" element={<CreateGroup_SubgroupForm />} />
          <Route path="/addprofessor" element={<AddProfessorForm />} />
          <Route path="/edit-professor/:id" element={<EditProfessor />} />
          <Route path="/studentlist" element={<StudentsList />} />
        </Route>

        {/* Shared Protected Routes */}
        <Route element={<ProtectedRoute allowedRoles={['student', 'professor']} />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/professorlist" element={<ProfessorList />} />
          <Route path="/edit-exam/:id" element={<EditExam />} />
          <Route path="/examslist" element={<ExamsList />} />
          <Route path="/requestlist" element={<RequestList />} />
          <Route path="/addstudent" element={<AddStudentForm />} />
          <Route path="/edit-student/:id" element={<EditStudent />} />
          <Route path="/createclass" element={<CreateClassForm />} />
          <Route path="/createexamrequest" element={<CreateExamRequest />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
