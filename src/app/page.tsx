import ProductList from "@/components/ProductList";
import Title from "@/components/Title";
import { Product } from "@/interface/product";

/*
- [ ]  전체 상품 목록을 보여주어야 합니다
- [ ]  서버사이드에서 60초에 한 번씩 새롭게 Static Site를 Generate해야 합니다.

SSG가 빌드시에 한 번 호출이 된다는 것 같은데, revalidate 를 통해서 60초에 한 번씩 호출이 되는지 확인을 어떻게 해야할지...??
*/

// export const revalidate = 60;

export const revalidate = 60;

// revalidate 를 통해서 다음 페이지 요청 시 새로운 요청에 대해 캐시를 업데이트하는 것 같다. 근데 캐시가 동일하면 새로운 요청을 하지 않는다. 그럼 아예 getProducts 가 호출되지 않는건가?
// 외부에 있는 함수니까 빌드 시에 호출이 한 번 될텐데
async function getProducts() {
  // fetch('https://...', { next: { revalidate: 3600 } })
  // const response = await axios.get("https://api.ballang.yoojinyoung.com/products/");
  // console.log(`Products fetched at ${new Date().toLocaleTimeString()}`);
  // return data.result;
  const response = await fetch(
    "https://api.ballang.yoojinyoung.com/products/",
    {
      next: { revalidate: 60 }, // 60초마다 캐시 재검증
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await response.json();
  return data.result;
}

export default async function ProductsPage() {
  const products: Product[] = await getProducts();

  console.log(`Page rendered at ${new Date().toLocaleTimeString()}`);

  return (
    <main>
      <Title title="Trending" />
      <ProductList products={products} />
    </main>
  );
}
