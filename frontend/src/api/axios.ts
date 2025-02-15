import axios from 'axios';

// Determine if we're running through ngrok
const isNgrok = window.location.hostname.includes('ngrok-free.app');

// Set the base URL accordingly
const baseURL = isNgrok 
  ? 'https://3976-176-88-140-170.ngrok-free.app/api'  // Use the backend ngrok URL
  : 'http://localhost:5000/api'; // When accessed locally

const api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});

// Add a request interceptor to add the auth token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api; 