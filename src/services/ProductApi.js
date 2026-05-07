import axios from "axios";

const PRODUCT_BASE_URL = "http://localhost:8088/products";

export const getProducts = () => {
  return axios.get(PRODUCT_BASE_URL);
};

export const getProductsByPage = (page, size) => {
  return axios.get(`${PRODUCT_BASE_URL}/page?page=${page}&size=${size}`);
};