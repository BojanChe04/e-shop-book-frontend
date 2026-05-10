import axiosInstance from "../axios/axios.ts";
import type {Author} from "../types";

import type {AuthorFormData} from "./types/author.ts";


const AuthorApi = {
    findAll: async (): Promise<Author[]> => {
        const response = await axiosInstance.get('/api/authors')
        return response.data
    },
    findById : async (id: number): Promise<Author> => {
        const response = await axiosInstance.get(`/api/authors/${id}`)
        return response.data
    },
    add: async (data: AuthorFormData) => {
        return await axiosInstance.post<Author>('/api/authors/add', data);
    },
    edit: async (id: string, data: AuthorFormData) => {
        return await axiosInstance.put<Author>(`/api/authors/edit/${id}`, data);
    },
    delete: async (id: string) => {
        return await axiosInstance.delete<Author>(`/api/authors/delete/${id}`);
    }
}
export default AuthorApi;