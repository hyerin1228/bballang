"use client";

import ProductCard from "@/components/ProductCard";
import { Product } from "@/interface/product";
import Link from "next/link";
import { useEffect, useState } from "react";

function ProductListPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch(
        "https://api.ballang.yoojinyoung.com/products/"
      );
      const data = await response.json();
      setProducts(data.result);
    }
    fetchProducts();
  }, []);
  return (
    <>
      <h2 className="block text-center mt-12 mb-12 text-2xl font-bold">
        Trending
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-y-12 gap-x-8 px-5">
        {products.map((product) => (
          <Link href={`/products/${product.id}`} key={product.id}>
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
    </>
  );
}

export default ProductListPage;
