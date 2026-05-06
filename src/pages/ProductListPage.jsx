import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/productSlice";
import { addProductToCart } from "../features/cart/cartSlice";

function ProductListPage() {

    const dispatch = useDispatch();

    const {
        products = [],
        loading,
        error
    } = useSelector((state) => state.products || {});

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleAddToCart = (productId) => {

        const cartData = {
            userId: 1,
            productId: productId,
            quantity: 1
        };

        dispatch(addProductToCart(cartData));

        alert("Product Added To Cart");
    };

    // ✅ Loading State

    if (loading) {

        return (
            <div>
                <h2>Loading Products...</h2>
            </div>
        );
    }

    // ✅ Error Handling

    if (error) {

        return (
            <div>
                <h2 style={{ color: "red" }}>
                    Error: {error}
                </h2>
            </div>
        );
    }

    return (

        <div style={{ padding: "20px" }}>

            <h1>Products</h1>

            {
                products.length === 0 ? (

                    <h3>No Products Found</h3>

                ) : (

                    products.map((product) => (

                        <div
                            key={product.id}
                            style={{
                                border: "1px solid gray",
                                padding: "15px",
                                marginBottom: "15px",
                                borderRadius: "10px",
                                width: "300px"
                            }}
                        >

                            <h2>{product.name}</h2>

                            <p>
                                Price: ${product.price}
                            </p>

                            <p>
                                Stock: {product.stock}
                            </p>

                            <button
                                onClick={() =>
                                    handleAddToCart(product.id)
                                }
                            >
                                Add To Cart
                            </button>

                        </div>

                    ))
                )
            }

        </div>
    );
}

export default ProductListPage;