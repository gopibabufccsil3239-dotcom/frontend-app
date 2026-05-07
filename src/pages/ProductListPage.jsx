import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByPage } from "../features/products/productSlice";
import { addProductToCart } from "../features/cart/cartSlice";

function ProductListPage() {

    const dispatch = useDispatch();

    const {
        products = [],
        loading,
        error,
        totalPages
    } = useSelector((state) => state.products || {});

    const [searchText, setSearchText] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {

        dispatch(
            fetchProductsByPage({
                page: currentPage,
                size: 3
            })
        );

    }, [dispatch, currentPage]);

    const filteredProducts = useMemo(() => {

        return products.filter((product) => {

            const matchesName =
                product.name
                    .toLowerCase()
                    .includes(searchText.toLowerCase());

            const matchesPrice =
                maxPrice === "" ||
                product.price <= Number(maxPrice);

            return matchesName && matchesPrice;

        });

    }, [products, searchText, maxPrice]);

    const handleAddToCart = (productId) => {

        const cartData = {
            userId: 1,
            productId: productId,
            quantity: 1
        };

        dispatch(addProductToCart(cartData));

        alert("Product Added To Cart");
    };

    if (loading) {
        return <h2>Loading Products...</h2>;
    }

    if (error) {
        return (
            <h2 style={{ color: "red" }}>
                Error: {error}
            </h2>
        );
    }

    return (

        <div style={{ padding: "20px" }}>

            <h1>Products</h1>

            <div style={{ marginBottom: "20px" }}>

                <input
                    type="text"
                    placeholder="Search Product"
                    value={searchText}
                    onChange={(e) =>
                        setSearchText(e.target.value)
                    }
                    style={{
                        padding: "10px",
                        marginRight: "10px"
                    }}
                />

                <input
                    type="number"
                    placeholder="Max Price"
                    value={maxPrice}
                    onChange={(e) =>
                        setMaxPrice(e.target.value)
                    }
                    style={{
                        padding: "10px"
                    }}
                />

            </div>

            {
                filteredProducts.length === 0 ? (

                    <h3>No Products Found</h3>

                ) : (

                    filteredProducts.map((product) => (

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

            {/* Pagination */}

            <div style={{ marginTop: "20px" }}>

                <button
                    disabled={currentPage === 0}
                    onClick={() =>
                        setCurrentPage(currentPage - 1)
                    }
                >
                    Prev
                </button>

                {
                    [...Array(totalPages)].map((_, index) => (

                        <button
                            key={index}
                            onClick={() =>
                                setCurrentPage(index)
                            }
                            style={{
                                margin: "5px"
                            }}
                        >
                            {index + 1}
                        </button>

                    ))
                }

                <button
                    disabled={currentPage === totalPages - 1}
                    onClick={() =>
                        setCurrentPage(currentPage + 1)
                    }
                >
                    Next
                </button>

            </div>

        </div>
    );
}

export default ProductListPage;