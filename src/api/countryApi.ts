import axiosInstance from "../axios/axios.ts";
import type {Country} from "../types";

import type {CountryFormData} from "./types/country.ts";



const CountryApi = {
    findAll: async (): Promise<Country[]> => {
        const response = await axiosInstance.get('/api/countries')
        return response.data
    },
    findById : async (id: number): Promise<Country> => {
        const response = await axiosInstance.get(`/api/countries/${id}`)
        return response.data
    },
    add: async (data: CountryFormData) => {
        return await axiosInstance.post<Country>('/api/countries/add', data);
    },
    edit: async (id: string, data: CountryFormData) => {
        return await axiosInstance.put<Country>(`/api/countries/edit/${id}`, data);
    },
    delete: async (id: string) => {
        return await axiosInstance.delete<Country>(`/api/countries/delete/${id}`);
    }
}
export default CountryApi;