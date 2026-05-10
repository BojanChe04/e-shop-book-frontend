import './Layout.css';
import { Box, Container, AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Outlet, useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth.ts';

const Layout = () => {
    const { isLoggedIn, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <Box className='layout-box'>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={() => navigate('/')}>
                        e-shop-books
                    </Typography>
                    {isLoggedIn ? (
                        <Button color="inherit" onClick={handleLogout}>Logout</Button>
                    ) : (
                        <>
                            <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
                            <Button color="inherit" onClick={() => navigate('/register')}>Register</Button>
                        </>
                    )}
                </Toolbar>
            </AppBar>
            <Container className='outlet-container' sx={{ my: 2 }} maxWidth='lg'>
                <Outlet />
            </Container>
        </Box>
    );
};

export default Layout;