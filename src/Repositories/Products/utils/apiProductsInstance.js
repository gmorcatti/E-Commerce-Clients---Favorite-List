import axios from "axios";

const { PRODUCTS_BASE_URL } = process.env;

const apiProductsInstance = axios.create({
    baseURL: PRODUCTS_BASE_URL,
})

export default apiProductsInstance