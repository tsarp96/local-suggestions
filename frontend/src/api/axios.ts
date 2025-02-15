import axios from 'axios';

// Determine if we're running locally
const isLocalhost = window.location.hostname === 'localhost';

// Set the base URL accordingly
const baseURL = isLocalhost
  ? 'http://localhost:5000/api'
  : 'https://local-suggestions-api.onrender.com/api';

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