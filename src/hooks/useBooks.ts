import { useEffect, useState } from 'react';
import type { Book } from '../types';
import BookApi from '../api/bookApi';

const useBooks = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        BookApi.findAll()
            .then(setBooks)
            .catch(() => setError('Error'))
            .finally(() => setLoading(false));
    }, []);

    return { books, loading, error };
};

export default useBooks;