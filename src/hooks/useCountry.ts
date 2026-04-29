import { useEffect, useState } from 'react';
import type { Country } from '../types';
import CountryApi from '../api/countryApi';

const useCountry = (id: number) => {
    const [country, setCountry] = useState<Country | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        CountryApi.findById(id)
            .then(setCountry)
            .catch(() => setError('Грешка при вчитување'))
            .finally(() => setLoading(false));
    }, [id]);

    return { country, loading, error };
};

export default useCountry;