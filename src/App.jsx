import { Link } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <div>
      <h1>Enterprise Product UI</h1>

      <nav>
        <Link to="/">Product List</Link>
        <Link to="/products/add">Add Product</Link>
      </nav>

      <AppRoutes />
    </div>
  );
}

export default App;