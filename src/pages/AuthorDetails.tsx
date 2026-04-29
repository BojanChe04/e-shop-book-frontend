import { useParams, useNavigate } from 'react-router';
import { Box, Button, Divider, Paper, Typography } from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import useAuthor from '../hooks/useAuthor';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const AuthorDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { author, loading, error } = useAuthor(Number(id));

    if (loading) return <LoadingSpinner />;
    if (error || !author) return <ErrorMessage message={error ?? 'Author not found'} />;

    return (
        <>
            <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate('/authors')}
                sx={{ mb: 3 }}
            >
                Back to authors
            </Button>

            <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    {author.name} {author.surname}
                </Typography>
                <Divider sx={{ mb: 3 }} />

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography variant="body1" color="text.secondary" sx={{ minWidth: 140 }}>
                            Country:
                        </Typography>
                        <Typography variant="body1">{author.countryName}</Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography variant="body1" color="text.secondary" sx={{ minWidth: 140 }}>
                            Continent:
                        </Typography>
                        <Typography variant="body1">{author.continent}</Typography>
                    </Box>
                </Box>
            </Paper>
        </>
    );
};

export default AuthorDetails;