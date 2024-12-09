import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

const backendURL = import.meta.env.VITE_BACKEND_URL;

const ViewExamStudent = () => {
    const [pdfUrl, setPdfUrl] = useState('');
    const [studentId, setStudentId] = useState("");
    const studentUniqueId = "";
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Decode token to access student ID
                const token = localStorage.getItem("token");
                    const decodedToken = jwtDecode(token);
                    const studentUniqueId = decodedToken.uniqueId;
                const response = await axios.get(`${backendURL}/exam/${studentUniqueId}/pdf`, {
                    responseType: 'blob',
                });
                const pdfUrl = URL.createObjectURL(response.data);
                setPdfUrl(pdfUrl);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            {pdfUrl ? (
                <iframe src={pdfUrl} width="100%" height="600px" title="Student PDF" />
            ) : (
                <p>Loading PDF...</p>
            )}
        </div>
    );
};

export default ViewExamStudent;