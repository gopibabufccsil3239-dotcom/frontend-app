import axios from "axios";

const PRODUCT_API_BASE_URL = "http://localhost:8088/products";

export const getAllProducts = () => {
  return axios.get(PRODUCT_API_BASE_URL);
};

export const createProduct = (product) => {
  return axios.post(PRODUCT_API_BASE_URL, product);
};