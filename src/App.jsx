import { Routes, Route, Link, Navigate } from "react-router-dom";
import ProductListPage from "./pages/ProductListPage";
import AddProductPage from "./pages/AddProductPage";
import CartPage from "./pages/CartPage";

function App() {
  return (
    <div>
      <nav style={{ padding: "15px", borderBottom: "1px solid gray" }}>
        <Link to="/products">Products</Link> |{" "}
        <Link to="/add-product">Add Product</Link> |{" "}
        <Link to="/cart">Cart</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/products" />} />
        <Route path="/products" element={<ProductListPage />} />
        <Route path="/add-product" element={<AddProductPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </div>
  );
}

export default App;