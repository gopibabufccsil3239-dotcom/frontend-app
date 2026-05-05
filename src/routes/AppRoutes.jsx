import { Routes, Route } from "react-router-dom";
import ProductListPage from "../pages/ProductListPage";
import AddProductPage from "../pages/AddProductPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ProductListPage />} />
      <Route path="/products/add" element={<AddProductPage />} />
    </Routes>
  );
}

export default AppRoutes;