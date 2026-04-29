import axiosInstance from "../axios/axios.ts";
import type {Country} from "../types";



const CountryApi = {
    findAll: async (): Promise<Country[]> => {
        const response = await axiosInstance.get('/api/countries')
        return response.data
    },
    findById : async (id: number): Promise<Country> => {
        const response = await axiosInstance.get(`/api/countries/${id}`)
        return response.data
    }
}
export default CountryApi;