import axiosInstance from "../axios/axios.ts";
import type {Book} from "../types";

const BookApi = {
    findAll: async (): Promise<Book[]> => {
        const response = await axiosInstance.get('/api/books')
        return response.data
    },
    findById : async (id: number): Promise<Book> => {
        const response = await axiosInstance.get(`/api/books/${id}`)
        return response.data
    }
}
export default BookApi;