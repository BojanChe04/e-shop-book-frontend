import { Grid } from '@mui/material';
import useAuthors from '../hooks/useAuthors';
import EntityCard from '../components/EntityCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import PageHeader from '../components/Header';

const Authors = () => {
    const { authors, loading, error } = useAuthors();

    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={error} />;

    return (
        <>
            <PageHeader title="Authors" subtitle={`Total: ${authors.length} authors`} />
            <Grid container spacing={3}>
                {authors.map((author) => (
                    <Grid item xs={12} sm={6} md={4} key={author.id}>
                        <EntityCard
                            title={`${author.name} ${author.surname}`}
                            navigateTo={`/authors/${author.id}`}
                            fields={[
                                { label: 'Country', value: author.countryName},
                                { label: 'Continent', value: author.continent},
                            ]}
                        />
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default Authors;