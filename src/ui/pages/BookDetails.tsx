import { useParams, useNavigate } from 'react-router';
import { Box, Button, Chip, Divider, Paper, Typography } from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import useBook from '../../hooks/useBook.ts';
import LoadingSpinner from '../components/LoadingSpinner.tsx';
import ErrorMessage from '../components/ErrorMessage.tsx';

const BookDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { book, loading, error } = useBook(Number(id));

    if (loading) return <LoadingSpinner />;
    if (error || !book) return <ErrorMessage message={error ?? 'Book not found'} />;

    return (
        <>
            <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate('/books')}
                sx={{ mb: 3 }}
            >
                Back to books
            </Button>

            <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    {book.name}
                </Typography>
                <Divider sx={{ mb: 3 }} />

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography variant="body1" color="text.secondary" sx={{ minWidth: 140 }}>
                            Category:
                        </Typography>
                        <Chip label={book.category} color="primary" variant="outlined" />
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography variant="body1" color="text.secondary" sx={{ minWidth: 140 }}>
                            State:
                        </Typography>
                        <Chip
                            label={book.state}
                            color={book.state === 'GOOD' ? 'success' : 'error'}
                            variant="outlined"
                        />
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography variant="body1" color="text.secondary" sx={{ minWidth: 140 }}>
                            Author:
                        </Typography>
                        <Typography variant="body1">{book.authorFullName}</Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography variant="body1" color="text.secondary" sx={{ minWidth: 140 }}>
                            Country:
                        </Typography>
                        <Typography variant="body1">{book.country}</Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography variant="body1" color="text.secondary" sx={{ minWidth: 140 }}>
                            Available BookCopies:
                        </Typography>
                        <Chip
                            label={book.availableCopies.toString()}
                            color={book.availableCopies > 0 ? 'success' : 'error'}
                        />
                    </Box>
                </Box>
            </Paper>
        </>
    );
};

export default BookDetails;