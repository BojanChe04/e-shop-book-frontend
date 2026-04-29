import { useEffect, useState } from 'react';
import type { Country } from '../types';
import CountryApi from '../api/countryApi';

const useCountries = () => {
    const [countries, setCountries] = useState<Country[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        CountryApi.findAll()
            .then(setCountries)
            .catch(() => setError('Error'))
            .finally(() => setLoading(false));
    }, []);

    return { countries, loading, error };
};

export default useCountries;