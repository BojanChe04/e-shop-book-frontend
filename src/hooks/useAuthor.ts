import { useEffect, useState } from 'react';
import type { Author } from '../types';
import AuthorApi from '../api/authorApi';

const useAuthor = (id: number) => {
    const [author, setAuthor] = useState<Author | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        AuthorApi.findById(id)
            .then(setAuthor)
            .catch(() => setError('Error'))
            .finally(() => setLoading(false));
    }, [id]);

    return { author, loading, error };
};

export default useAuthor;