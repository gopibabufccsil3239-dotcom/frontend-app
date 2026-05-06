import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../features/products/productSlice";

function AddProductPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    stock: "",
  });

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;

    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    await dispatch(
      addProduct({
        name: product.name,
        price: Number(product.price),
        stock: Number(product.stock),
      })
    );

    navigate("/");
  };

  return (
    <div>
      <h2>Add Product</h2>

      <form onSubmit={handleSubmit}>
        <label>Product Name</label>
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          required
        />

        <label>Price</label>
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          required
        />

        <label>Stock</label>
        <input
          type="number"
          name="stock"
          value={product.stock}
          onChange={handleChange}
          required
        />

        <button type="submit">Create Product</button>
      </form>
    </div>
  );
}

export default AddProductPage;