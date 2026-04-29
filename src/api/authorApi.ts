import axiosInstance from "../axios/axios.ts";
import type {Author} from "../types";


const AuthorApi = {
    findAll: async (): Promise<Author[]> => {
        const response = await axiosInstance.get('/api/authors')
        return response.data
    },
    findById : async (id: number): Promise<Author> => {
        const response = await axiosInstance.get(`/api/authors/${id}`)
        return response.data
    }
}
export default AuthorApi;