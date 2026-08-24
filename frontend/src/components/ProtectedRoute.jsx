import { Navigate } from 'react-router-dom'; import { useAuth } from '../context/AuthContext';
export default function ProtectedRoute({ children, admin = false }) { const { user } = useAuth(); return !user ? <Navigate to="/login" replace /> : admin && user.role !== 'admin' ? <Navigate to="/dashboard" replace /> : children; }
