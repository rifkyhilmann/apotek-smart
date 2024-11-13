import axios, { AxiosResponse } from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

// Helper function for making API requests
const handleRequest = async (request: Promise<AxiosResponse>) => {
    try {
        const response = await request;
        return response;
    } catch (error) {
        throw error;
    }
};

export const Auth = {
    Login: (email: string, password: string) => 
        handleRequest(axios.post(`${baseUrl}/sign-in`, { email, password })),
}

export const Data = {
    GetAllObat : () => 
        handleRequest(axios.get(`${baseUrl}/obat`)),
    CreateObat : (data : any) => 
        handleRequest(axios.post(`${baseUrl}/obat`, data)),
    UpdateObat : (id : string, data : any) => 
        handleRequest(axios.put(`${baseUrl}/obat/${id}`, data)),
    DeleteObat : (id : string) => 
        handleRequest(axios.delete(`${baseUrl}/obat/${id}`)),
    GetObatById : (id : string) =>
        handleRequest(axios.get(`${baseUrl}/obat/${id}`)),

    GetKategori : () => 
        handleRequest(axios.get(`${baseUrl}/kategori`)),
    GetKategoriById : (id : string) =>
        handleRequest(axios.get(`${baseUrl}/kategori/${id}`)),
    CreateKategori : (name : string) => 
        handleRequest(axios.post(`${baseUrl}/kategori`, { name })),
    DeleteKategori : (id : string) => 
        handleRequest(axios.delete(`${baseUrl}/kategori/${id}`)),
    UpdateKategori : (id : string, name : any) => 
        handleRequest(axios.put(`${baseUrl}/kategori/${id}`, { name })),


    CreateSatuan : (name : string) => 
        handleRequest(axios.post(`${baseUrl}/satuan`, { name })),
    GetSatuan : () => 
        handleRequest(axios.get(`${baseUrl}/satuan`)),
    GetSatuanById : (id : string) => 
        handleRequest(axios.get(`${baseUrl}/satuan/${id}`)),
    DeleteSatuan : (id : string) => 
        handleRequest(axios.delete(`${baseUrl}/satuan/${id}`)),
    UpdateSatuan : (id : string, name : any) => 
        handleRequest(axios.put(`${baseUrl}/satuan/${id}`, { name })),
}