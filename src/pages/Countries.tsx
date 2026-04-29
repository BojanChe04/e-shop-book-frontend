import { Grid } from '@mui/material';
import useCountries from '../hooks/useCountries';
import EntityCard from '../components/EntityCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import Header from '../components/Header';

const Countries = () => {
    const { countries, loading, error } = useCountries();

    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={error} />;

    return (
        <>
            <Header title="Countries" subtitle={`Total: ${countries.length} countries`} />
            <Grid container spacing={3}>
                {countries.map((country) => (
                    <Grid item xs={12} sm={6} md={4} key={country.id}>
                        <EntityCard
                            title={country.name}
                            navigateTo={`/countries/${country.id}`}
                            fields={[
                                { label: 'Continent', value: country.continent },
                            ]}
                        />
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default Countries;