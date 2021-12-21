import axios from "axios";
const baseURL = 'http://localhost:3000'
const products = {
    getAll: () => axios.get(`${baseURL}/products`),
    getOne: async (id) => await axios.get(`${baseURL}/products/${id}`),
    create: (item) => axios.post(`${baseURL}/products`, item),
    modify: (item) => axios.put(`${baseURL}/products/${item.id}`, item),
    delete: (id) => axios.delete(`${baseURL}/products/${id}`)
};

export default {
    products
};