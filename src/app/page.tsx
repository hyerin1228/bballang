import ProductCard from "@/components/ProductCard";
import { Product } from "@/interface/product";
import Link from "next/link";

/*
- [ ]  전체 상품 목록을 보여주어야 합니다
- [ ]  서버사이드에서 60초에 한 번씩 새롭게 Static Site를 Generate해야 합니다.

SSG가 빌드시에 한 번 호출이 된다는 것 같은데, revalidate 를 통해서 60초에 한 번씩 호출이 되는지 확인을 어떻게 해야할지...??
*/

export const revalidate = 60;

async function getProducts() {
  // fetch('https://...', { next: { revalidate: 3600 } })
  // const response = await axios.get("https://api.ballang.yoojinyoung.com/products/");

  const response = await fetch(
    "https://api.ballang.yoojinyoung.com/products/",
    { next: { revalidate: 60 } }
  );
  const data = await response.json();

  console.log(`Products fetched at ${new Date().toLocaleTimeString()}`);

  return data.result;
}

export default async function Page() {
  const products: Product[] = await getProducts();
  console.log("rendered");

  return (
    <main>
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
    </main>
  );
}
