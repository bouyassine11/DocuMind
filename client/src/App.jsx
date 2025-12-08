import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import AuthCallback from './components/auth/AuthCallback';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Landing from './components/Landing';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');

      if (token) {
        try {
          const response = await fetch('/api/auth/me', {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });

          const data = await response.json();

          if (data.success) {
            setIsAuthenticated(true);
          } else {
            // Token invalid, remove it
            localStorage.removeItem('token');
            localStorage.removeItem('user');
          }
        } catch (error) {
          // Network error, remove token
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      }

      setIsLoading(false);
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="animate-spin h-8 w-8 text-indigo-600">
          <svg fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Root route - show landing for unauthenticated, profile for authenticated */}
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/profile" replace /> : <Landing />
          }
        />

        {/* Authentication routes - redirect to profile if already authenticated */}
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/profile" replace /> : <Login />}
        />
        <Route
          path="/register"
          element={isAuthenticated ? <Navigate to="/profile" replace /> : <Register />}
        />
        <Route path="/auth/callback" element={<AuthCallback />} />

        {/* Protected routes - redirect to login if not authenticated */}
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/profile"
          element={isAuthenticated ? <Profile /> : <Navigate to="/login" replace />}
        />

        {/* Catch all route */}
        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? "/profile" : "/"} replace />}
        />
      </Routes>
    </Router>
  );
}

export default App;
