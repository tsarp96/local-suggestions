import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { useAuth } from './hooks/useAuth';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateSuggestion from './pages/CreateSuggestion';
import LandingPage from './pages/LandingPage';
import AdminDashboard from './pages/AdminDashboard';

const App = () => {
  const { user, isAdmin } = useAuth();

  return (
    <Provider store={store}>
      <ChakraProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route 
              path="/" 
              element={user ? <Home /> : <LandingPage />} 
            />
            <Route 
              path="/login" 
              element={user ? <Navigate to="/" /> : <Login />} 
            />
            <Route 
              path="/register" 
              element={user ? <Navigate to="/" /> : <Register />} 
            />
            <Route 
              path="/create-suggestion" 
              element={user ? <CreateSuggestion /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/admin" 
              element={isAdmin ? <AdminDashboard /> : <Navigate to="/" />} 
            />
          </Routes>
        </Router>
      </ChakraProvider>
    </Provider>
  );
};

export default App;
