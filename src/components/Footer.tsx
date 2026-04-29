import { Box, Typography } from '@mui/material';

const Footer = () => {
    return (
        <Box component="footer" sx={{
            py: 3,
            px: 2,
            mt: 'auto',
            backgroundColor: '#1976d2',
            color: 'white',
            textAlign: 'center'
        }}>
            <Typography variant="body2">
                © 2026 Biblioteka
            </Typography>
        </Box>
    );
};

export default Footer;