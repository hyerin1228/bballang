import Link from "next/link";

import { Product } from "@/interface/product";
import ProductCard from "./ProductCard";

function ProductList({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-y-12 gap-x-8 px-5">
      {products.map((product) => (
        <Link href={`/products/${product.id}`} key={product.id}>
          <ProductCard product={product} />
        </Link>
      ))}
    </div>
  );
}

export default ProductList;
