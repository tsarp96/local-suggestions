import React from 'react';
import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateSuggestion from './pages/CreateSuggestion';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <CSSReset />
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/create-suggestion"
              element={
                <PrivateRoute>
                  <CreateSuggestion />
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
      </ChakraProvider>
    </Provider>
  );
}

export default App;
