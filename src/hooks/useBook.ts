import { useEffect, useState } from 'react';
import type { Book } from '../types';
import BookApi from '../api/bookApi';

const useBook = (id: number) => {
    const [book, setBook] = useState<Book | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        BookApi.findById(id)
            .then(setBook)
            .catch(() => setError('Error'))
            .finally(() => setLoading(false));
    }, [id]);

    return { book, loading, error };
};

export default useBook;