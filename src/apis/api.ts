// 전체 브랜드 목록 조회
async function getBrands() {
  const res = await fetch("https://api.ballang.yoojinyoung.com/brands");
  // The return value is *not* serialized // 반환 값이 *not* serialized 입니다. 무슨 뜻인지..?
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();

  return data.result;
}

// 브랜드별 상품 목록 조회
async function getBrandProducts(brandId: string) {
  const url =
    brandId === ""
      ? "https://api.ballang.yoojinyoung.com/products"
      : `https://api.ballang.yoojinyoung.com/brands/${brandId}`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  console.log(data.result);

  return data.result;
}

export { getBrandProducts, getBrands };
