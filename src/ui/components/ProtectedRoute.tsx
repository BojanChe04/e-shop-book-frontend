import { Navigate, Outlet } from 'react-router';
import useAuth from '../../hooks/useAuth.ts';

const ProtectedRoute = () => {
    const { isLoggedIn } = useAuth();
    return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;