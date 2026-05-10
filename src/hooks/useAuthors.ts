import { useCallback, useEffect, useState } from 'react';
import type { Author } from '../types';
import AuthorApi from '../api/authorApi';
import type { AuthorFormData } from '../api/types/author.ts';

const useAuthors = () => {
    const [authors, setAuthors] = useState<Author[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetch = useCallback(async () => {
        try {
            const data = await AuthorApi.findAll();
            setAuthors(data);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setLoading(false);
        }
    }, []);

    const onAdd = useCallback(async (data: AuthorFormData) => {
        await AuthorApi.add(data);
        await fetch();
    }, [fetch]);

    const onEdit = useCallback(async (id: number, data: AuthorFormData) => {
        await AuthorApi.edit(id.toString(), data);
        await fetch();
    }, [fetch]);

    const onDelete = useCallback(async (id: number) => {
        await AuthorApi.delete(id.toString());
        await fetch();
    }, [fetch]);

    useEffect(() => {
        void fetch();
    }, [fetch]);

    return { authors, loading, error, fetch, onAdd, onEdit, onDelete };
};

export default useAuthors;