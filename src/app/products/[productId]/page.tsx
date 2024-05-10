"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

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

function ProductDetailPage() {
  const { productId } = useParams();

  console.log("productId", productId);
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    async function fetchProduct() {
      const response = await fetch(
        `https://api.ballang.yoojinyoung.com/products/${productId}`
      );
      const data = await response.json();
      console.log("data", data.result);
      setProduct(data.result);
    }
    fetchProduct();
  }, [productId]);

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

export default ProductDetailPage;
