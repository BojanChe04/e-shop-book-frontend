import { Grid } from '@mui/material';
import { useState } from 'react';
import useAuthors from '../../hooks/useAuthors.ts';
import EntityCard from '../components/EntityCard.tsx';
import LoadingSpinner from '../components/LoadingSpinner.tsx';
import ErrorMessage from '../components/ErrorMessage.tsx';
import Header from '../components/Header.tsx';
import EditAuthorDialog from '../components/dialogs/EditAuthorDialog.tsx';
import DeleteAuthorDialog from '../components/dialogs/DeleteAuthorDialog.tsx';
import type { Author, AuthorFormData } from '../../api/types/author.ts';
import AddAuthorDialog from "../components/dialogs/AddAuthorDIalog.tsx";

const Authors = () => {
    const { authors, loading, error, onAdd, onEdit, onDelete } = useAuthors();
    const [openAdd, setOpenAdd] = useState(false);
    const [authorToEdit, setAuthorToEdit] = useState<Author | null>(null);
    const [authorToDelete, setAuthorToDelete] = useState<Author | null>(null);

    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={error} />;

    const handleAdd = async (data: AuthorFormData) => {
        await onAdd(data);
        setOpenAdd(false);
    };

    const handleEdit = async (id: number, data: AuthorFormData) => {
        await onEdit(id, data);
        setAuthorToEdit(null);
    };

    const handleDelete = async (id: number) => {
        await onDelete(id);
        setAuthorToDelete(null);
    };

    return (
        <>
            <Header
                title="Authors"
                subtitle={`Total: ${authors.length} authors`}
                onAdd={() => setOpenAdd(true)}
            />

            <AddAuthorDialog
                open={openAdd}
                onClose={() => setOpenAdd(false)}
                onAdd={handleAdd}
            />

            {authorToEdit && (
                <EditAuthorDialog
                    author={authorToEdit}
                    open={!!authorToEdit}
                    onClose={() => setAuthorToEdit(null)}
                    onEdit={handleEdit}
                />
            )}

            {authorToDelete && (
                <DeleteAuthorDialog
                    author={authorToDelete}
                    open={!!authorToDelete}
                    onClose={() => setAuthorToDelete(null)}
                    onDelete={handleDelete}
                />
            )}

            <Grid container spacing={3}>
                {authors.map((author) => (
                    <Grid item xs={12} sm={6} md={4} key={author.id}>
                        <EntityCard
                            title={`${author.name} ${author.surname}`}
                            navigateTo={`/authors/${author.id}`}
                            onEdit={() => setAuthorToEdit(author)}
                            onDelete={() => setAuthorToDelete(author)}
                            fields={[
                                { label: 'Country', value: author.countryName },
                                { label: 'Continent', value: author.continent },
                            ]}
                        />
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default Authors;