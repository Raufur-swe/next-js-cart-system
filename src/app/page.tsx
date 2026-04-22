'use client';

import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { fetchProducts } from "../redux/features/productSlice";
import ProductCard from "../components/ProductCard";

const Page = () => {
  const dispatch = useAppDispatch();

  // Redux store থেকে data নিচ্ছি
  const { products, loading, lastFetched } = useAppSelector(
    (state) => state.products
  );

  // শুরুতে 5টা product show হবে
  const [visibleCount, setVisibleCount] = useState(5);

  // Products fetch logic with cache expiry (5 min)
  useEffect(() => {
    const fiveMinutes = 5 * 60 * 1000;

    const shouldFetch =
      products.length === 0 || // যদি products না থাকে
      !lastFetched || // যদি lastFetched না থাকে
      Date.now() - lastFetched > fiveMinutes; // যদি 5 min old data হয়

    if (shouldFetch && !loading) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length, lastFetched, loading]);

  // Scroll করলে নিচে গেলে আরও 4টা product show হবে
  useEffect(() => {
    const handleScroll = () => {
      const isBottom =
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 100;

      // নিচে গেলে visibleCount বাড়বে
      if (isBottom && visibleCount < products.length) {
        setVisibleCount((prev) => prev + 4);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // cleanup
    return () => window.removeEventListener("scroll", handleScroll);
  }, [visibleCount, products.length]);

  // Loading UI (only first load)
  if (loading && products.length === 0) {
    return <p className="p-4">Loading products...</p>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">

      {/* যতগুলো visibleCount আছে ততগুলো product show হবে */}
      {products.slice(0, visibleCount).map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}

    </div>
  );
};

export default Page;