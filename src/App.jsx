import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { protectedRoutes, publicRoutes } from './routes/Routes';
import { AuditorProvider } from './contexts/AuditorContext';


function App() {
  return (
    <AuthProvider>
      <AuditorProvider>
      <BrowserRouter>
        <AnimatePresence mode="wait">
          <Routes>
            {/* Public Routes */}
            {publicRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}

            {/* Protected Routes */}
            {protectedRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <ProtectedRoute>{route.element}</ProtectedRoute>
                }
              >
                {route.children?.map((childRoute) => (
                  <Route
                    key={childRoute.path || 'index'}
                    index={childRoute.index}
                    path={childRoute.path}
                    element={childRoute.element}
                  />
                ))}
              </Route>
            ))}

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
      </AuditorProvider>
    </AuthProvider>
  );
}

export default App;