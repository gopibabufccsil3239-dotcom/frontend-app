import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByPage } from "../features/products/productSlice";
import { addProductToCart } from "../features/cart/cartSlice";

export const useProducts = () => {
  const dispatch = useDispatch();

  const { products = [], loading, error, totalPages } = useSelector(
    (state) => state.products || {}
  );

  const [searchText, setSearchText] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    dispatch(
      fetchProductsByPage({
        page: currentPage,
        size: 3,
      })
    );
  }, [dispatch, currentPage]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesName = product.name
        .toLowerCase()
        .includes(searchText.toLowerCase());

      const matchesPrice =
        maxPrice === "" || product.price <= Number(maxPrice);

      return matchesName && matchesPrice;
    });
  }, [products, searchText, maxPrice]);

  const handleAddToCart = (productId) => {
    const cartData = {
      userId: 1,
      productId,
      quantity: 1,
    };

    dispatch(addProductToCart(cartData));
    alert("Product Added To Cart");
  };

  return {
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
  };
};