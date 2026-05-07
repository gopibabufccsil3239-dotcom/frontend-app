import { useProducts } from "../hooks/useProducts";

function ProductListPage() {
  const {
    loading,
    error,
    filteredProducts,
    searchText,
    setSearchText,
    maxPrice,
    setMaxPrice,
    currentPage,
    setCurrentPage,
    totalPages,
    handleAddToCart,
  } = useProducts();

  if (loading) {
    return <h2>Loading Products...</h2>;
  }

  if (error) {
    return <h2 style={{ color: "red" }}>Error: {error}</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Products</h1>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search Product"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ padding: "10px", marginRight: "10px" }}
        />

        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          style={{ padding: "10px" }}
        />
      </div>

      {filteredProducts.length === 0 ? (
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
              width: "300px",
            }}
          >
            <h2>{product.name}</h2>
            <p>Price: ${product.price}</p>
            <p>Stock: {product.stock}</p>

            <button onClick={() => handleAddToCart(product.id)}>
              Add To Cart
            </button>
          </div>
        ))
      )}

      <div style={{ marginTop: "20px" }}>
        <button
          disabled={currentPage === 0}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index)}
            style={{ margin: "5px" }}
          >
            {index + 1}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages - 1}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ProductListPage;