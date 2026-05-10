import { Box, CircularProgress, Typography } from '@mui/material';

interface Props {
    message?: string;
}

const LoadingSpinner = ({ message = 'Loading...' }: Props) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', py: 8, gap: 2 }}>
            <CircularProgress />
            <Typography variant="body2" color="text.secondary">{message}</Typography>
        </Box>
    );
};

export default LoadingSpinner;