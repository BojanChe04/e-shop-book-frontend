import { Grid, Box, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { useState } from 'react';
import useBooks from '../../hooks/useBooks.ts';
import EntityCard from '../components/EntityCard.tsx';
import LoadingSpinner from '../components/LoadingSpinner.tsx';
import ErrorMessage from '../components/ErrorMessage.tsx';
import Header from '../components/Header.tsx';
import AddBookDialog from '../components/dialogs/AddBookDialog.tsx';
import type {Book, BookFormData} from '../../api/types/book.ts';
import DeleteBookDialog from "../components/dialogs/DeleteBookDialog.tsx";
import EditBookDialog from "../components/dialogs/EditBookDIalog.tsx";

const Books = () => {
    const { books, loading, error, onAdd, onDelete, onEdit } = useBooks();
    const [selectedState, setSelectedState] = useState<string | null>(null);
    const [openAdd, setOpenAdd] = useState(false);
    const [bookToDelete, setBookToDelete] = useState<Book | null>(null);
    const [bookToEdit, setBookToEdit] = useState<Book | null>(null);

    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={error} />;

    const filteredBooks = selectedState
        ? books.filter(book => book.state === selectedState)
        : books;

    const handleAdd = async (data: BookFormData) => {
        await onAdd(data);
        setOpenAdd(false);
    };
    const handleDelete = async (id: number) => {
        await onDelete(id);
        setBookToDelete(null);
    };

    const handleEdit = async (id: number, data: BookFormData) => {
        await onEdit(id, data);
        setBookToEdit(null);
    };

    return (
        <>
            <Header
                title="Books"
                subtitle={`Total: ${filteredBooks.length} books`}
                onAdd={() => setOpenAdd(true)}
            />

            <AddBookDialog
                open={openAdd}
                onClose={() => setOpenAdd(false)}
                onAdd={handleAdd}
            />
            {bookToDelete && (
                <DeleteBookDialog
                    book={bookToDelete}
                    open={!!bookToDelete}
                    onClose={() => setBookToDelete(null)}
                    onDelete={handleDelete}
                />
            )}

            {bookToEdit && (
                <EditBookDialog
                    book={bookToEdit}
                    open={!!bookToEdit}
                    onClose={() => setBookToEdit(null)}
                    onEdit={handleEdit}
                />
            )}


            <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ mb: 1, color: 'white' }}>
                    Filter by State:
                </Typography>
                <ToggleButtonGroup
                    value={selectedState}
                    exclusive
                    onChange={(_, value) => setSelectedState(value)}
                    sx={{
                        '& .MuiToggleButton-root': { color: 'white', borderColor: 'white' },
                        '& .Mui-selected': { backgroundColor: 'rgba(255,255,255,0.2)' }
                    }}
                >
                    <ToggleButton value="GOOD" color="success">GOOD</ToggleButton>
                    <ToggleButton value="BAD" color="error">BAD</ToggleButton>
                </ToggleButtonGroup>
            </Box>

            <Grid container spacing={3}>
                {filteredBooks.map((book) => (
                    <Grid item xs={12} sm={6} md={4} key={book.id}>
                        <EntityCard
                            title={book.name}
                            navigateTo={`/books/${book.id}`}
                            onEdit={() => setBookToEdit(book)}
                            onDelete={() => setBookToDelete(book)}
                            fields={[
                                { label: 'Category', value: book.category, chip: true },
                                { label: 'Author', value: book.authorFullName },
                                { label: 'State', value: book.state, chip: true },
                                { label: 'BookCopies', value: book.availableCopies },
                            ]}
                        />
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default Books;