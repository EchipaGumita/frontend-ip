import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import Sidebar from "../components/Sidebar"; // Sidebar component

// Register Chart.js components
ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const AdminDashboard = () => {
  const [workloadData, setWorkloadData] = useState([]);
  const [classroomUtilizationData, setClassroomUtilizationData] = useState([]);
  const [studentCount, setStudentCount] = useState(0);
  const [professorCount, setProfessorCount] = useState(0);
  const [backupFiles, setBackupFiles] = useState([]); // List of backup files
  const [selectedBackup, setSelectedBackup] = useState(""); // Selected backup file
  const [upcomingExams, setUpcomingExams] = useState([]); // Upcoming exams data
  const [kpis, setKPIs] = useState({
    totalExams: 0,
    examsToday: 0,
    examsThisWeek: 0,
    averageUtilization: 0,
    pendingRequests: 0,
  });

  useEffect(() => {
    const fetchKPIs = async () => {
      try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        const response = await axios.get(`${backendUrl}/exam/kpis`);
        setKPIs(response.data);
      } catch (error) {
        console.error("Error fetching KPIs:", error);
      }
    };

    fetchKPIs();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL;

        // Fetch workload data
        const workloadResponse = await axios.get(`${backendUrl}/analytics/professor-workload`);
        setWorkloadData(workloadResponse.data || []);

        // Fetch classroom utilization data
        const classroomUtilizationResponse = await axios.get(`${backendUrl}/analytics/classroom-utilization`);
        setClassroomUtilizationData(classroomUtilizationResponse.data || []);

        // Fetch students
        const studentsResponse = await axios.get(`${backendUrl}/students`);
        setStudentCount(studentsResponse.data.length);

        // Fetch professors
        const professorsResponse = await axios.get(`${backendUrl}/professor`);
        setProfessorCount(professorsResponse.data.professors.length);

        // Fetch backup files
        const backupListResponse = await axios.get(`${backendUrl}/backup/list`);
        setBackupFiles(backupListResponse.data.backups || []);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    const fetchUpcomingExams = async () => {
      try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        const response = await axios.get(`${backendUrl}/exam/upcoming?limit=5`);
        setUpcomingExams(response.data.exams || []);
      } catch (error) {
        console.error("Error fetching upcoming exams:", error);
      }
    };

    fetchData();
    fetchUpcomingExams();
  }, []);

  const handleBackup = async () => {
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const response = await axios.post(`${backendUrl}/backup`);
      alert(`Backup successful: ${response.data.file}`);
      // Refresh backup files list
      const backupListResponse = await axios.get(`${backendUrl}/backup/list`);
      setBackupFiles(backupListResponse.data.backups || []);
    } catch (error) {
      console.error("Error creating backup:", error);
      alert("Backup failed.");
    }
  };

  const handleRestore = async () => {
    if (!selectedBackup) {
      alert("Please select a backup file to restore.");
      return;
    }

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      await axios.post(`${backendUrl}/backup/restore`, { backupFile: selectedBackup });
      alert("Restore successful.");
    } catch (error) {
      console.error("Error restoring backup:", error);
      alert("Restore failed.");
    }
  };

  const workloadChartData = {
    labels: workloadData.map((data) => data.professor),
    datasets: [
      {
        label: "Total Hours",
        data: workloadData.map((data) => data.totalHours),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
      },
    ],
  };

  const classroomChartData = {
    labels: classroomUtilizationData.map((data) => data.classroom),
    datasets: [
      {
        label: "Utilization Percentage",
        data: classroomUtilizationData.map((data) => data.utilizationPercentage),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <div style={{ flex: 1, backgroundColor: "#fff", padding: "20px", overflowY: "scroll" }}>
        <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
          <MetricCard title="Total Students" value={studentCount} />
          <MetricCard title="Total Professors" value={professorCount} />
        </div>
        <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
          <MetricCard title="Total Exams Scheduled" value={kpis.totalExams} />
          <MetricCard title="Exams Today" value={kpis.examsToday} />
          <MetricCard title="Exams This Week" value={kpis.examsThisWeek} />
          <MetricCard title="Avg Classroom Utilization" value={`${kpis.averageUtilization}%`} />
          <MetricCard title="Pending Requests" value={kpis.pendingRequests} />
        </div>
        <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
          <ChartCard title="Professor Workload">
            <div style={{ height: "300px", width: "100%" }}>
              <Pie data={workloadChartData} options={chartOptions} />
            </div>
          </ChartCard>
          <ChartCard title="Classroom Utilization">
            <div style={{ height: "300px", width: "100%" }}>
              <Bar data={classroomChartData} options={chartOptions} />
            </div>
          </ChartCard>
        </div>
        <div style={{ marginTop: "20px", backgroundColor: "#f8f9fa", padding: "20px", borderRadius: "10px" }}>
          <h5>Backup and Restore</h5>
          <div style={{ marginBottom: "10px" }}>
            <button onClick={handleBackup} style={buttonStyle}>
              Backup Manually
            </button>
          </div>
          <div>
            <select
              value={selectedBackup}
              onChange={(e) => setSelectedBackup(e.target.value)}
              style={selectStyle}
            >
              <option value="">Select a backup file</option>
              {backupFiles.map((file, index) => (
                <option key={index} value={file}>
                  {file}
                </option>
              ))}
            </select>
            <button onClick={handleRestore} style={buttonStyle}>
              Restore from Backup
            </button>
          </div>
        </div>
        {/* Upcoming Exams Section */}
        <div style={{ marginTop: "20px", backgroundColor: "#f8f9fa", padding: "20px", borderRadius: "10px" }}>
          <h5>Upcoming Exams</h5>
          {upcomingExams.length > 0 ? (
            <ul style={{ listStyleType: "none", padding: 0 }}>
              {upcomingExams.map((exam, index) => (
                <li key={index} style={{ marginBottom: "10px", padding: "10px", borderBottom: "1px solid #ddd" }}>
                  <p>
                    <strong>Subject:</strong> {exam.subject}
                  </p>
                  <p>
                    <strong>Date:</strong> {new Date(exam.date).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Time:</strong> {exam.hour}
                  </p>
                  <p>
                    <strong>Classroom:</strong> {exam.classroom?.name || "N/A"}
                  </p>
                  <p>
                    <strong>Professor:</strong> {exam.mainProfessor?.firstName} {exam.mainProfessor?.lastName}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No upcoming exams found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

// Styles
const cardStyle = {
  background: "#f8f9fa",
  color: "#000",
  borderRadius: "10px",
  padding: "20px",
  flex: 1,
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
};

const buttonStyle = {
  margin: "10px 0",
  padding: "10px 20px",
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const selectStyle = {
  padding: "10px",
  marginRight: "10px",
  borderRadius: "5px",
  border: "1px solid #ced4da",
};

// Components
const MetricCard = ({ title, value }) => (
  <div style={{ ...cardStyle, textAlign: "center" }}>
    <h5>{title}</h5>
    <p style={{ fontSize: "2rem", margin: 0 }}>{value}</p>
  </div>
);

const ChartCard = ({ title, children }) => (
  <div style={cardStyle}>
    <h5 style={{ marginBottom: "20px" }}>{title}</h5>
    {children}
  </div>
);

export default AdminDashboard;
