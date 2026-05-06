import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/productSlice";
import { addProductToCart } from "../features/cart/cartSlice";

function ProductListPage() {
  const dispatch = useDispatch();

  const { products = [], loading, error } = useSelector(
    (state) => state.products || {}
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddToCart = (productId) => {
    const cartData = {
      userId: 1,
      productId: productId,
      quantity: 1,
    };

    dispatch(addProductToCart(cartData));
    alert("Product added to cart successfully");
  };

  if (loading) {
    return <h3>Loading products...</h3>;
  }

  if (error) {
    return <h3 style={{ color: "red" }}>Error: {error}</h3>;
  }

  return (
    <div>
      <h1>Products</h1>

      {products.length === 0 ? (
        <h3>No products found</h3>
      ) : (
        products.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "8px",
            }}
          >
            <h3>{product.name}</h3>
            <p>Price: {product.price}</p>
            <p>Stock: {product.stock}</p>

            <button onClick={() => handleAddToCart(product.id)}>
              Add to Cart
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default ProductListPage;