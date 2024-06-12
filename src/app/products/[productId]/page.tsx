/*
  * 상품 상세 페이지 - SSR

  1. 데이터 페칭
    1. ssr 서버 사이드에서 데이터 불러오도록 수정이 필요
    Q. useParams 를 사용해야하는데.. 서버컴포넌트에서는 사용이 안되는 듯 ..
  
  2. 상품의 장바구니 담기
   1. 로그인이 된 상태
    - 장바구니에 담기 버튼 클릭 시 
      - 장바구니에 상품이 담겨야 한다.
    - 상품이 이미 장바구니에 있는 경우
      - 장바구니에서 빼기 버튼이 보여져야 한다.
      - 장바구니에서 빼기 버튼 클릭 시 상품이 장바구니에서 삭제되어야 한다.

    2. 로그인이 안 된 상태
      - 장바구니에 담기 버튼 클릭 시 
        - 로그인 모달이 뜨도록 한다. ( 오른쪽 하단에 뜨고 몇 초 후 사라지는 알림창..)
        - 홈화면으로 이동한다.
    1. 장바구니에 담기 버튼 클릭 시 로그인 모달이 뜨도록 한다.
    2. 로그인이 성공하면 오른쪽 하단에 알림창이 뜨네요! 로그인이 성공했습니다(?) 라는 메시지가 뜨다가 몇 초 후 사라지고, 동시에 홈화면으로 이동함.
  
  3. 상품의 장바구니 빼기
    1. 상품 상세 페이지 로드 시
      - 사용자가 로그인되어 있고 해당 상품이 장바구니에 있는 경우 장바구니 빼기 버튼ㅇ이 보여져야 한다.

*/

import axiosInstance from "@/apis/config";
import Image from "next/image";

interface Product {
  id: number;
  name: string;
  imgSrc: string;
  price: number;
  originalPrice: number;
  onlineStock: number;
  deliveryType: string;
  brand: {
    nameKr: string;
    nameEn: string;
  };
}

async function getProduct(productId: string): Promise<Product> {
  try {
    const response = await axiosInstance.get(`/products/${productId}`);
    console.log("response", response.data.result);
    return response.data.result;
  } catch (error) {
    console.error("Failed to fetch product", error);
    throw error;
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: { productId: string };
}) {
  const { productId } = params;
  console.log("productId", productId);

  const product: Product = await getProduct(productId);

  return (
    <section className="py-6 px-5 lg:py-10 lg:px-8 max-w-screen-lg mx-auto flex flex-col lg:flex-row items-stretch">
      {product === null ? (
        <p>상품 정보가 없습니다.</p>
      ) : (
        <>
          <div className="w-full max-w-md mb-8 lg:mb-0 lg:mr-8">
            <Image
              src={product.imgSrc}
              alt="product thumbnail"
              className="w-full h-auto"
              width={500}
              height={500}
            />
          </div>
          <div className="flex flex-col py-8">
            <div className="font-bold text-lg mb-2">
              {product.brand.nameKr} / {product.brand.nameEn}
              <hr />
            </div>
            <div className="text-xl mb-2">{product.name}</div>
            <div className="text-base mb-8">
              <div className="flex items-center mb-2">
                <span className="text-gray-700 mr-2">정가</span>
                <span className="text-lg text-gray-700 line-through">
                  {product.originalPrice.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center mb-2">
                <span className="text-gray-700 mr-2">판매가</span>
                <span className="text-xl text-red-500">
                  {product.price.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center mb-2">
                <span className="text-gray-700 mr-2">배송</span>
                <span className="text-base text-gray-700">
                  {product.deliveryType}
                </span>
              </div>
              <div className="flex items-center mb-2">
                <span className="text-gray-700 mr-2">재고 번호</span>
                <span className="text-base text-gray-700">
                  {product.onlineStock || "재고 정보 없음"}
                </span>
              </div>
            </div>
            <button className="bg-black text-white py-4 px-6 w-full text-center cursor-pointer">
              장바구니에 담기
            </button>
          </div>
        </>
      )}
    </section>
  );
}
