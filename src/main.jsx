import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId="850956111341-4tt4h6vilr7snenvfea3perb0gubdf2i.apps.googleusercontent.com">
    <App />
    </GoogleOAuthProvider>,
)
