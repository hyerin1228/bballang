import Title from "@/components/Title";

/*

    1. 일단 더미데이터로 작성을 해놓고 테스트를 해보는 게 좋겠다.
        Q. 더미데이터를 어떤 형식으로 작성해야할까?
        T. API 를 요청했을 때 받아오는 데이터 형식을 참고해야할 것 같다.
    2. 카테고리 목록의 UI와 스티일링 작성
        2-1. grid layout 으로 작성
        2-2. 각 카테고리는 <ul> -> <li> -> <a> 태그로 구성
        2-3. 한 줄에 6개씩 보여지고, 화면의 크기가 줄면 3개까지 보여지도록 작성
    3. 기본적으로 ALL 이 선택 되어 있는 상태로 시작
    4. 카테고리를 클릭 시 해당 카테고리에 해당하는 상품 목록을 동적으로 보여준다.

*/

const dummyCategories = [
  {
    id: 115,
    nameKr: "꼼데가르송",
    nameEn: "COMME DES GARCONS",
  },
  {
    id: 472,
    nameKr: "톰브라운",
    nameEn: "THOM BROWNE",
  },
  {
    id: 506,
    nameKr: "비비안 웨스트우드",
    nameEn: "VIVIENNE WESTWOOD",
  },
  {
    id: 395,
    nameKr: "프라다",
    nameEn: "PRADA",
  },
  {
    id: 2981,
    nameKr: "나이키",
    nameEn: "NIKE",
  },
  {
    id: 227,
    nameKr: "이자벨마랑",
    nameEn: "ISABEL MARANT",
  },
  {
    id: 1877,
    nameKr: "아디다스",
    nameEn: "ADIDAS",
  },
  {
    id: 6183,
    nameKr: "디아레",
    nameEn: "DIAIRE",
  },
  {
    id: 100,
    nameKr: "셀린느",
    nameEn: "CELINE",
  },
  {
    id: 1098,
    nameKr: "무스너클",
    nameEn: "MOOSE KNUCKLES",
  },
  {
    id: 315,
    nameKr: "막스마라",
    nameEn: "MAX MARA",
  },
  {
    id: 1658,
    nameKr: "버버리",
    nameEn: "BURBERRY",
  },
  {
    id: 212,
    nameKr: "에르노",
    nameEn: "HERNO",
  },
  {
    id: 204,
    nameKr: "지방시",
    nameEn: "GIVENCHY",
  },
  {
    id: 327,
    nameKr: "몽클레르",
    nameEn: "MONCLER",
  },
  {
    id: 5977,
    nameKr: "보연",
    nameEn: "VOYONN",
  },
  {
    id: 38,
    nameKr: "아미",
    nameEn: "AMI",
  },
  {
    id: 585,
    nameKr: "디젤",
    nameEn: "DIESEL",
  },
  {
    id: 2744,
    nameKr: "르메르",
    nameEn: "LEMAIRE",
  },
  {
    id: 288,
    nameKr: "메종키츠네",
    nameEn: "MAISON KITSUNE",
  },
];

function BrandsPage() {
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
          {dummyCategories.map((category) => (
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
