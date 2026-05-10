import axiosInstance from "../axios/axios.ts";
import type {Book} from "../types";
import type {BookFormData} from "./types/book.ts";

const BookApi = {
    findAll: async (): Promise<Book[]> => {
        const response = await axiosInstance.get('/api/books')
        return response.data
    },
    findById : async (id: number): Promise<Book> => {
        const response = await axiosInstance.get(`/api/books/${id}`)
        return response.data
    },
    add: async (data: BookFormData) => {
        return await axiosInstance.post<Book>('/api/books/add', data);
    },
    edit: async (id: string, data: BookFormData) => {
        return await axiosInstance.put<Book>(`/api/books/edit/${id}`, data);
    },
    delete: async (id: string) => {
        return await axiosInstance.delete<Book>(`/api/books/delete/${id}`);
    }

}
export default BookApi;