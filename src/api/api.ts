// src/api.ts
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.b7web.com.br/devsfood/api',
    headers: {
        'Content-Type': 'application/json',
    }
});

export const getCategories = async () => {
    try {
        const response = await api.get('/categories');
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar categorias:', error);
        throw error;
    }
};

export const getResource = async (resourceId: string) => {
    try {
        const response = await api.get(`/resource/${resourceId}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar o recurso:', error);
        throw error;
    }
};
