import { Navigate } from 'react-router-dom';

export function ProtectedRoute({ children }) {
  const isAuth = !!localStorage.getItem('produtor');

  if (!isAuth) {
    return <Navigate to="/auth" replace />;
  }

  return children;
}
