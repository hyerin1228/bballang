import Link from "next/link";

function Header() {
  return (
    <header className="sticky top-0 flex items-center bg-white border-b border-gray-300 p-4 h-16">
      <Link href="/" className="text-lg ml-5">
        <h1 className="inline-block font-bold text-2xl">빨랑</h1>
      </Link>
      <nav className="ml-20">
        <Link href="/" className="text-lg">
          Brand
        </Link>
      </nav>
      <div className="flex items-center ml-auto gap-4 pr-4">
        <Link href="/" className="text-lg">
          <span>장바구니</span>
        </Link>
        <Link href="/sign-up" className="text-lg">
          <span>회원가입</span>
        </Link>
        <Link href="/" className="text-lg">
          <span>로그인</span>
        </Link>
      </div>
    </header>
  );
}

export default Header;
