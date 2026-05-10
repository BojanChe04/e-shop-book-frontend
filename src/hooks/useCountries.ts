import {useCallback, useEffect, useState} from 'react';
import type { Country } from '../types';
import CountryApi from '../api/countryApi';

import type {CountryFormData} from "../api/types/country.ts";


const useCountries = () => {
    const [countries, setCountries] = useState<Country[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetch = useCallback(async () => {
        try {
            const data = await CountryApi.findAll();
            setCountries(data);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setLoading(false);
        }
    }, []);

    const onAdd = useCallback(async (data: CountryFormData) => {
        await CountryApi.add(data);
        await fetch();
    }, [fetch]);

    const onEdit = useCallback(async (id: number, data: CountryFormData) => {
        await CountryApi.edit(id.toString(), data);
        await fetch();
    }, [fetch]);

    const onDelete = useCallback(async (id: number) => {
        await CountryApi.delete(id.toString());
        await fetch();
    }, [fetch]);

    useEffect(() => {
        void fetch();
    }, [fetch]);

    return { countries, loading, error, fetch, onAdd, onEdit, onDelete };
};

export default useCountries;