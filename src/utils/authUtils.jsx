import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
const backendURL = import.meta.env.VITE_BACKEND_URL;

export const isAdmin = async () => {
  const token = localStorage.getItem('token');
  if (!token) return false;

  try {
    const decodedToken = jwtDecode(token);
    const uniqueId = decodedToken.uniqueId;

    // Fetch professor data using the uniqueId
    const response = await axios.get(`${backendURL}/professor/${uniqueId}`);
    const professor = response.data.professor;
    console.log('Professor data:', professor);
    return professor.isAdmin === true; // Return true if isAdmin is set to true
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
};
