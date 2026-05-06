import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItems } from "../features/cart/cartSlice";

function CartPage() {
  const dispatch = useDispatch();

  const { cartItems = [], loading, error } = useSelector(
    (state) => state.cart || {}
  );

  useEffect(() => {
    dispatch(fetchCartItems(1));
  }, [dispatch]);

  if (loading) {
    return <h2>Loading Cart...</h2>;
  }

  if (error) {
    return <h2 style={{ color: "red" }}>Error: {error}</h2>;
  }

  return (
    <div>
      <h1>Cart Page</h1>

      {cartItems.length === 0 ? (
        <h3>No Items In Cart</h3>
      ) : (
        cartItems.map((item) => (
          <div key={item.id}>
            <h3>Product ID: {item.productId}</h3>
            <p>Quantity: {item.quantity}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default CartPage;