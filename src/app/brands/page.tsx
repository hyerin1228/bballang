import { getBrandProducts, getBrands } from "@/apis/api";
import ProductList from "@/components/ProductList";
import Title from "@/components/Title";
import { Brand } from "@/interface/product";

/*
    ----카테고리 목록 관련----
    1. 일단 더미데이터로 작성을 해놓고 테스트를 해보는 게 좋겠다.
        Q. 더미데이터를 어떤 형식으로 작성해야할까?
            ㄴ API 를 요청했을 때 받아오는 데이터 형식을 참고해야할 것 같다.
    2. 카테고리 목록의 UI와 스티일링 작성
        2-1. grid layout 으로 작성
        2-2. 각 카테고리는 <ul> -> <li> -> <a> 태그로 구성
        2-3. 한 줄에 6개씩 보여지고, 화면의 크기가 줄면 3개까지 보여지도록 작성
    3. api 를 통해 받아온 카테고리 목록을 동적으로 보여주기
        3-1. 더미데이터를 실제 API 데이터로 변경
        3-2. SSR 이니까 서버사이드에서 데이터 불러오기

    ----상품 목록 리스트 관련----
    4. 기본적으로 ALL 이 선택 되어 있는 상태로 시작
        4-1. ALL 이 선택되어 있는 경우(default) 전체 상품 목록을 보여준다. getProducts
        4-2. 특정 카테고리를 선택한 경우 해당 카테고리에 해당하는 상품 목록을 보여준다. getBrand
        Q. 그런데 홈페이지에서도 똑같은 걸 호출해야되는데 중복이니까 api 호출을 따로 빼서 관리해야하나..?
        Q. 카테고리를 어떤 걸 선택했는지 알기 위해 상태관리를 해야 할 것 같은데.. SSR 이니까 어떻게 해야할지 모르겠다.
    5. 카테고리를 클릭 시 해당 카테고리에 해당하는 상품 목록을 동적으로 보여준다.

    ----분리 관련----
        Q. 전체 브랜드 목록을 가져오는 함수와 브랜드별 상품 목록을 가져오는 함수를 분리해야할까?
            ㄴ 일단 분리는 해놨는데./..
        Q. nav 밑에 특정 카테고리에 대한 상품 목록이 보여져야 하는데, query parameter 는 동적 라우팅인데 이 페이지에서 사용할 수가 있나..?
        Q. 쿼리 파라미터를 서버 컴포넌트에서 사용할 수 있는 방법이 어떤 게 있을까?? 
        Q. 1. src> app > brands BrandsPage.tsx http://localhost:3000/brands -> ALL 전체 상품목록
           2.  src> app > brands > [brandId] BrandPage.tsx http://localhost:3000//brands?:brandId


*/

async function BrandsPage({
  searchParams,
}: {
  searchParams: { brandId?: string };
}) {
  const brandId = searchParams.brandId || "";
  console.log(`brandId: ${brandId}`);
  const brands: Brand[] = await getBrands();
  const products = await getBrandProducts(brandId);

  return (
    <main className="flex flex-col">
      <Title title="Brands" />
      <nav className="mx-auto mb-8">
        <ul className="grid grid-cols-6 text-center gap-y-4">
          <li key="all" className="col-span-6 text-center mb-5">
            <a href="/brands" className="font-semibold">
              ALL
            </a>
          </li>
          {brands.map((brand) => (
            <li key={brand.id}>
              <a
                href={`/brands?brandId=${brand.id}`}
                className="text-sm text-gray-600"
              >
                {brand.nameKr}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <ProductList products={products} />
    </main>
  );
}

export default BrandsPage;
