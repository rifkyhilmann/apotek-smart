// hooks/useObat.ts
import { useState, useEffect } from 'react';
import { Data } from "@/middlewares/api";  // Pastikan API yang digunakan sudah benar

export const useObat = () => {
    const [dataObat, setDataObat] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        setError(null);

        try {
            const obatResponse = await Data.GetAllObat();
            setDataObat(obatResponse?.data);
        } catch (err) {
            setError('Gagal memuat data');
        } finally {
            setLoading(false);
        }
    };

    const createObat = async (obatData: any) => {
        try {
            const response = await Data.CreateObat(obatData);
            return response;
        } catch (error) {
            throw error;
        }
    };

    const updateObat = async (id: string, obatData: any) => {
        try {
            const response = await Data.UpdateObat(id, obatData);
            return response;
        } catch (error) {
            throw error;
        }
    };

    const deleteObat = async (id: string) => {
        try {
            const response = await Data.DeleteObat(id);
            return response;
        } catch (error) {
            throw error;
        }
    };

    return {
        dataObat,
        loading,
        error,
        fetchData,
        createObat,
        updateObat,
        deleteObat
    };
};
