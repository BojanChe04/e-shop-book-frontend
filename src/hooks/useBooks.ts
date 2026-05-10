import { useCallback, useEffect, useState } from 'react';
import type { Book } from '../types';
import bookApi from "../api/bookApi.ts";
import type { BookFormData } from "../api/types/book.ts";

const useBooks = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetch = useCallback(async () => {
        try {
            const data = await bookApi.findAll();
            setBooks(data);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setLoading(false);
        }
    }, []);

    const onAdd = useCallback(async (data: BookFormData) => {
        await bookApi.add(data);
        await fetch();
    }, [fetch]);

    const onEdit = useCallback(async (id: number, data: BookFormData) => {
        await bookApi.edit(id.toString(), data);
        await fetch();
    }, [fetch]);

    const onDelete = useCallback(async (id: number) => {
        await bookApi.delete(id.toString());
        await fetch();
    }, [fetch]);

    useEffect(() => {
        void fetch();
    }, [fetch]);

    return { books, loading, error, fetch, onAdd, onEdit, onDelete };
};

export default useBooks;