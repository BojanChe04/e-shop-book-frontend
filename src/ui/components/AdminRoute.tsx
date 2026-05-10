import { Navigate, Outlet } from 'react-router';
import useAuth from '../../hooks/useAuth.ts';

const AdminRoute = () => {
    const { user } = useAuth();
    const isAdmin = user?.roles?.includes('ROLE_ADMIN');
    return isAdmin ? <Outlet /> : <Navigate to="/" />;
};

export default AdminRoute;