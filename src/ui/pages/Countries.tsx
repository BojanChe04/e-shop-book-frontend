import { Grid } from '@mui/material';
import { useState } from 'react';
import useCountries from '../../hooks/useCountries.ts';
import EntityCard from '../components/EntityCard.tsx';
import LoadingSpinner from '../components/LoadingSpinner.tsx';
import ErrorMessage from '../components/ErrorMessage.tsx';
import Header from '../components/Header.tsx';
import AddCountryDialog from '../components/dialogs/AddCountryDialog.tsx';
import EditCountryDialog from '../components/dialogs/EditCountryDialog.tsx';
import DeleteCountryDialog from '../components/dialogs/DeleteCountryDialog.tsx';
import type { Country, CountryFormData } from '../../api/types/country.ts';

const Countries = () => {
    const { countries, loading, error, onAdd, onEdit, onDelete } = useCountries();
    const [openAdd, setOpenAdd] = useState(false);
    const [countryToEdit, setCountryToEdit] = useState<Country | null>(null);
    const [countryToDelete, setCountryToDelete] = useState<Country | null>(null);

    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={error} />;

    const handleAdd = async (data: CountryFormData) => {
        await onAdd(data);
        setOpenAdd(false);
    };

    const handleEdit = async (id: number, data: CountryFormData) => {
        await onEdit(id, data);
        setCountryToEdit(null);
    };

    const handleDelete = async (id: number) => {
        await onDelete(id);
        setCountryToDelete(null);
    };

    return (
        <>
            <Header
                title="Countries"
                subtitle={`Total: ${countries.length} countries`}
                onAdd={() => setOpenAdd(true)}
            />

            <AddCountryDialog
                open={openAdd}
                onClose={() => setOpenAdd(false)}
                onAdd={handleAdd}
            />

            {countryToEdit && (
                <EditCountryDialog
                    country={countryToEdit}
                    open={!!countryToEdit}
                    onClose={() => setCountryToEdit(null)}
                    onEdit={handleEdit}
                />
            )}

            {countryToDelete && (
                <DeleteCountryDialog
                    country={countryToDelete}
                    open={!!countryToDelete}
                    onClose={() => setCountryToDelete(null)}
                    onDelete={handleDelete}
                />
            )}

            <Grid container spacing={3}>
                {countries.map((country) => (
                    <Grid item xs={12} sm={6} md={4} key={country.id}>
                        <EntityCard
                            title={country.name}
                            navigateTo={`/countries/${country.id}`}
                            onEdit={() => setCountryToEdit(country)}
                            onDelete={() => setCountryToDelete(country)}
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