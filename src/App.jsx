import { Routes, Route, Link } from "react-router-dom";
import ProductListPage from "./pages/ProductListPage";
import CartPage from "./pages/CartPage";

function App() {
  return (
    <div>
      <nav>
        <Link to="/">Products</Link> |{" "}
        <Link to="/cart">Cart</Link>
      </nav>

      <Routes>
        <Route path="/" element={<ProductListPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </div>
  );
}

export default App;