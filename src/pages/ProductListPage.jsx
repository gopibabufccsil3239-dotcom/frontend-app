import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/productSlice";

function ProductList() {
  const dispatch = useDispatch();

  const { items, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) {
    return <h3>Loading products...</h3>;
  }

  if (error) {
    return <h3>Error: {error}</h3>;
  }

  return (
    <div>
      <h2>Product List</h2>

      {items.map((product) => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>Price: {product.price}</p>
          <p>Stock: {product.stock}</p>
        </div>
      ))}
    </div>
  );
}

export default ProductList;