"use client";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { default as LoginModal } from "./LoginModal";

function Header() {
  // 모달 열기/닫기 상태
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 로그인 상태 관리
  const { isLoggedIn, logout } = useAuth();

  return (
    <header className="sticky top-0 flex items-center bg-white border-b border-gray-300 p-4 h-16">
      <a href="/" className="text-lg ml-5">
        <h1 className="inline-block font-bold text-2xl">빨랑</h1>
      </a>
      <nav className="ml-20">
        <a href="/" className="text-lg">
          Brand
        </a>
      </nav>
      <div className="flex items-center ml-auto gap-4 pr-4">
        <a href="/" className="text-lg">
          장바구니
        </a>
        <a href="/sign-up" className="text-lg">
          회원가입
        </a>
        {isLoggedIn ? (
          <button className="text-lg" onClick={logout}>
            로그아웃
          </button>
        ) : (
          <button
            className="text-lg"
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            로그인
          </button>
        )}
        <LoginModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </header>
  );
}

export default Header;
