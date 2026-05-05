import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8088",
});

export const getProducts = async () => {
  const res = await api.get("/products");
  return res.data;
};

export const createProduct = async (product) => {
  const res = await api.post("/products", product);
  return res.data;
};