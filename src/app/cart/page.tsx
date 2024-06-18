"use client";

import axiosInstance from "@/apis/config";
/*
    1. 장바구니에 담긴 상품 목록을 볼 수 있도록 UI를 구성

    2. 장바구니가 비어있는 경우
        2-1. 장바구니가 비어 있습니다. 라는 문구와 바로 아래 쇼핑하러 가기 버튼이 보여진다.

    3. 장바구니에 담긴 상품이 있는 경우
        3-1. 상품 목록이 보여진다.
            Q. 장바구니에 담긴 데이터가 어떤 형식인지 모르겠어서 api 를 통해 받아온 데이터를 확인해봐야할 것 같다.
        3-2. 상품 목록은 3개의 행으로 이루어져 있음
        3-3. 1열 상품 이미지
        3-4. 2열 상품브랜드(한글) / 상품브랜드(영문), 상품명, 원가, 할인가, 배송타입, 잔여재고 수량이 보여지도록 구성.
        3-5. 3열 상품 수량을 - / + 버튼으로 조절할 수 있도록 구성

*/

import Title from "@/components/Title";
import { CartItem } from "@/interface/cart";
import Image from "next/image";
import { useEffect, useState } from "react";

function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const getCart = async () => {
    try {
      const res = await axiosInstance.get("/cart");
      setCartItems(res.data.result.items);
    } catch (error) {
      throw new Error("Failed to fetch data");
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  return (
    <main>
      <Title title="장바구니" />
      <section className="py-6 px-5 lg:py-10 lg:px-8 max-w-screen-lg mx-auto flex flex-col lg:flex-row items-stretch">
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center">
            <p className="text-2xl font-bold mb-4">장바구니가 비어 있습니다.</p>
            <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded">
              쇼핑하러 가기
            </button>
          </div>
        ) : (
          <ul className="space-y-8">
            {cartItems.map((item, index) => (
              <li key={item.id} className="items-center">
                {index !== 0 && (
                  <hr className="border-t-1 border-gray-200 my-4 w-full" />
                )}
                <div className="w-full flex gap-4">
                  <div className="flex-shrink-0">
                    <Image
                      src={item.product.imgSrc}
                      alt={item.product.name}
                      className="w-full mb-3 hover:scale-110 duration-200 ease-in-out active:brightness-75 "
                      width={100}
                      height={100}
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="flex-grow flex flex-col space-y-2">
                    <h2 className="text-lg font-semibold">
                      {item.product.brand.nameKr} / {item.product.brand.nameEn}
                    </h2>
                    <p className="text-lg">{item.product.name}</p>
                    <div className="flex gap-3">
                      <span className="text-lg font-semibold text-red-500 line-through">
                        ₩{item.product.originalPrice.toLocaleString()}
                      </span>
                      <span className="text-lg font-semibold text-black">
                        ₩{item.product.price.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm">
                      {item.product.deliveryType} | 잔여재고{" "}
                      {item.product.onlineStock}ea
                    </p>
                  </div>
                  <div className="flex-shrink-0 ml-4 flex items-center">
                    <div className="border border-black">
                      <button className="px-2 py-1 bg-black text-white">
                        -
                      </button>
                      <span className="px-4">{item.quantity}</span>
                      <button className="px-2 py-1 bg-black text-white">
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

export default CartPage;
