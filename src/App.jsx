import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';
import { Navbar } from './components/common/Navbar';

// Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardPage } from './pages/DashboardPage';
import { ChildProfilesPage } from './pages/ChildProfilesPage';
import { CreateStoryPage } from './pages/CreateStoryPage';
import { GenerationProgressPage } from './pages/GenerationProgressPage';
import { StoryReaderPage } from './pages/StoryReaderPage';
import { LibraryPage } from './pages/LibraryPage';

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-parchment-pattern flex items-center justify-center">
        <div className="inline-block w-8 h-8 border-4 border-berry border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Public Only Route Wrapper (redirects logged-in users away from login/register)
const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-parchment-pattern flex items-center justify-center">
        <div className="inline-block w-8 h-8 border-4 border-berry border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

// Redirect helper for direct ID routes (e.g., /:id/generating -> /stories/:id/generating)
const StoryIdRedirect = ({ isGenerating }) => {
  const { id } = useParams();
  return <Navigate to={isGenerating ? `/stories/${id}/generating` : `/stories/${id}`} replace />;
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SocketProvider>
          <div className="min-h-screen flex flex-col bg-parchment-pattern selection:bg-marigold selection:text-ink">
            <Navbar />
            <main className="flex-1">
              <Routes>
                {/* Public */}
                <Route path="/" element={<LandingPage />} />
                <Route
                  path="/login"
                  element={
                    <PublicRoute>
                      <LoginPage />
                    </PublicRoute>
                  }
                />
                <Route
                  path="/register"
                  element={
                    <PublicRoute>
                      <RegisterPage />
                    </PublicRoute>
                  }
                />

                {/* Protected */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <DashboardPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/children"
                  element={
                    <ProtectedRoute>
                      <ChildProfilesPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/create"
                  element={
                    <ProtectedRoute>
                      <CreateStoryPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/stories/:id/generating"
                  element={
                    <ProtectedRoute>
                      <GenerationProgressPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/stories/:id"
                  element={
                    <ProtectedRoute>
                      <StoryReaderPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/library"
                  element={
                    <ProtectedRoute>
                      <LibraryPage />
                    </ProtectedRoute>
                  }
                />

                {/* Alias routes for direct story IDs without /stories/ prefix */}
                <Route
                  path="/:id/generating"
                  element={
                    <ProtectedRoute>
                      <StoryIdRedirect isGenerating={true} />
                    </ProtectedRoute>
                  }
                />

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
          </div>
        </SocketProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
