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

export const getProducts = async (category:number, page:number, search:string) => {
    let filters : Record<string, string>={};

    if(category > 0 ) filters["category"] = category.toString();
    if(page > 0) filters["page"] = page.toString();
    if(search) filters["search"] = search;

    let queryString = new URLSearchParams(filters).toString();

    console.log(queryString);

    try {
        const response = await api.get(`/products?${queryString}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar os produtos:', error);
        throw error;
    }
};