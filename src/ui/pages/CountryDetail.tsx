import { useParams, useNavigate } from 'react-router';
import { Box, Button, Divider, Paper, Typography } from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import useCountry from '../../hooks/useCountry.ts';
import LoadingSpinner from '../components/LoadingSpinner.tsx';
import ErrorMessage from '../components/ErrorMessage.tsx';

const CountryDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { country, loading, error } = useCountry(Number(id));

    if (loading) return <LoadingSpinner />;
    if (error || !country) return <ErrorMessage message={error ?? 'Country not found'} />;

    return (
        <>
            <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate('/countries')}
                sx={{ mb: 3 }}
            >
                Back to countries
            </Button>

            <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    {country.name}
                </Typography>
                <Divider sx={{ mb: 3 }} />

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography variant="body1" color="text.secondary" sx={{ minWidth: 140 }}>
                        Continent:
                    </Typography>
                    <Typography variant="body1">{country.continent}</Typography>
                </Box>
            </Paper>
        </>
    );
};

export default CountryDetail;