import Title from "@/components/Title";
import { Brand } from "@/interface/product";

/*
    ----카테고리 목록 관련----
    1. 일단 더미데이터로 작성을 해놓고 테스트를 해보는 게 좋겠다.
        Q. 더미데이터를 어떤 형식으로 작성해야할까?
        T. API 를 요청했을 때 받아오는 데이터 형식을 참고해야할 것 같다.
    2. 카테고리 목록의 UI와 스티일링 작성
        2-1. grid layout 으로 작성
        2-2. 각 카테고리는 <ul> -> <li> -> <a> 태그로 구성
        2-3. 한 줄에 6개씩 보여지고, 화면의 크기가 줄면 3개까지 보여지도록 작성
    3. api 를 통해 받아온 카테고리 목록을 동적으로 보여주기
        3-1. 더미데이터를 실제 API 데이터로 변경
        3-2. SSR 이니까 서버사이드에서 데이터 불러오기

    ----상품 목록 리스트 관련----
    4. 기본적으로 ALL 이 선택 되어 있는 상태로 시작
    5. 카테고리를 클릭 시 해당 카테고리에 해당하는 상품 목록을 동적으로 보여준다.

*/
async function getCategories() {
  const res = await fetch("https://api.ballang.yoojinyoung.com/brands");
  // The return value is *not* serialized // 반환 값이 *not* serialized 입니다. 무슨 뜻인지..?
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();

  return data.result;
}

async function BrandsPage() {
  const catagories: Brand[] = await getCategories();
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
          {catagories.map((category) => (
            <li key={category.id}>
              <a
                href={`/brands/${category.id}`}
                className="text-sm text-gray-600"
              >
                {category.nameKr}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </main>
  );
}

export default BrandsPage;
