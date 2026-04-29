import { useEffect, useState } from 'react';
import type { Author } from '../types';
import AuthorApi from '../api/authorApi';

const useAuthors = () => {
    const [authors, setAuthors] = useState<Author[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        AuthorApi.findAll()
            .then(setAuthors)
            .catch(() => setError('Error'))
            .finally(() => setLoading(false));
    }, []);

    return { authors, loading, error };
};

export default useAuthors;