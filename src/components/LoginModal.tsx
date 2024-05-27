/*

  ---로그인 기능 ---
    - 이메일, 비밀번호 중 하나라도 입력되지 않은 상태라면 경고창이 떠야 합니다.
    - 로그인이 진행되는 중에는 인풋과 버튼이 비활성화 되어야 합니다.
    - 로그인이 된 상태라면 새로고침을 해도 로그인이 풀리지 않아야 합니다.

    1. 인풋에 입력된 값이 없을 때 경고메시지 표시하기
      ㄴ 로그인 버튼 클릭 시 인풋 값이 없다면 경고메시지가 인풋 아래에 텍스트로 나타난다.
      ㄴ 이메일 :  "올바른 이메일을 입력해주세요."
      ㄴ 비밀번호 : "비밀번호는 최소 6자리 이상이어야 합니다."
      Q. 입력 값에 대한 유효성 검사는 상태 관리로 해야하나? 아니면 어떤 방법으로 해야할까?
    2. 로그인 버튼 클릭 시 인풋과 버튼 비활성화
      Q. 로딩 상태를 어떻게 관리해야할까?
      ㄴ api 호출 시 로딩 상태를 관리해야할 것 같고, 호출이 끝나면 로딩 상태를 false 로 변경해야할 것 같은..?
    3. 로그인이 된 상태라면 새로고침을 해도 로그인이 풀리지 않아야 하는데..
      Q1.상태 관리가 필요할 것 같은데 어떻게 해야할지 모르겠다..
       ㄴ 로그인 성공 시 JWT 토큰을 받아와서 로컬스토리지에 저장해야할 것 같은데.. 
    4. 로그인이 되면 모달창이 닫히도록 하기

    ----- 기능 구현 -----
    1. 인풋에 입력된 값이 없을 때 경고메시지 표시하기
      1-1. 인풋에 입력될 값을 상태로 관리하기 (이메일, 비밀번호) - OK
      1-2. 로그인 버튼을 클릭 시 인풋 값을 확인하기
        1-2-1. 인풋 값이 없거나,
        1-2-2. 올바른 이메일 형식이 아니거나,
        1-2-3. 비밀번호가 6자리 미만일 때 경고메시지를 표시하기
      Q. 에러 메시지는 컴포넌트로 만들어서, 메시지를 표시할 수 있도록 하는 게 좋을까..?
*/

import { useState } from "react";
import ErrorMessage from "./ErrorMessage";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  if (!isOpen) return;

  // 모달 닫기
  const handleClose = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // 이메일 입력 시
  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  // 비밀번호 입력 시
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  // 로그인 버튼 클릭 시
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`email: ${email}, password: ${password}`);

    // 1. 입력한 데이터에 대한 유효성 검사
    validateInput();
    console.log(`errors: ${errors.email}, ${errors.password}`);

    // 2. 유효성 검사를 통과했다면 로그인 요청
  };

  // 인풋 유효성 검사
  const validateInput = () => {
    // 이메일이 비어있거나 올바른 값을 입력하지 않은 경우(이메일 형식이 아닌 경우)
    const newErrors = { email: "", password: "" };
    const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/; // https://shinyks.com/2023/11/javascript/regexp-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EC%9D%B4%EB%A9%94%EC%9D%BC-%EC%9C%A0%ED%9A%A8%EC%84%B1-%EA%B2%80%EC%A6%9D/
    if (email === "" || !emailRegex.test(email)) {
      newErrors.email = "올바른 이메일을 입력해주세요.";
    }
    // 비밀번호가 비어있거나 6자리 미만인 경우
    if (password === "" || password.length < 6) {
      newErrors.password = "비밀번호는 최소 6자리 이상이어야 합니다.";
    }

    setErrors(newErrors);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={handleClose}
    >
      <div className="bg-white p-5 rounded-md shadow-md relative">
        <form
          onSubmit={handleSubmit}
          className="p-2 bg-white flex flex-col items-center gap-4 w-full max-w-md"
        >
          <h2 className="text-2xl text-center font-bold">로그인</h2>
          <div className="w-full">
            <label>이메일</label>
            <input
              type="email"
              onChange={handleChangeEmail}
              className="w-full p-2.5 mt-1 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-black-500"
            />
            {errors.email && <ErrorMessage message={errors.email} />}
          </div>
          <div>
            <label>비밀번호</label>
            <input
              type="password"
              onChange={handleChangePassword}
              className="w-full p-2.5 mt-1 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-black-500"
            />
            {errors.password && <ErrorMessage message={errors.password} />}
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
