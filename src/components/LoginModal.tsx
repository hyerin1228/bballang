interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function LoginModal({ isOpen, onClose }: LoginModalProps) {
  if (!isOpen) return;

  const handleClose = (e: React.MouseEvent) => {
    // 모달 닫기
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={handleClose}
    >
      <div className="bg-white p-5 rounded-md shadow-md relative">
        <form className="p-2 bg-white flex flex-col items-center gap-4 w-full max-w-md">
          <h2 className="text-2xl text-center font-bold">로그인</h2>
          <div className="w-full">
            <label>이메일</label>
            <input
              type="email"
              className="w-full p-2.5 mt-1 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-black-500"
            />
          </div>
          <div>
            <label>비밀번호</label>
            <input
              type="password"
              className="w-full p-2.5 mt-1 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-black-500"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-3 mt-5 bg-black text-white font-bold hover:bg-gray-800 transition"
          >
            로그인하기
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;
