"use client";
import { loginApi } from "@/apis/authApi";
import { useMutation } from "@tanstack/react-query";
import Error from "next/error";
import { createContext, useContext, useState } from "react";

type AuthContextValue = {
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const initialValue: AuthContextValue = {
  isLoggedIn: false,
  login: async (email: string, password: string) => {},
  logout: () => {},
};

// 1. 컨텍스트 생성
const AuthContext = createContext<AuthContextValue>(initialValue);

// 2. 사용한다 -> useContext
export const useAuth = () => useContext(AuthContext);

// 3. 범위를 정해서 상위 컴포넌트에서 프로바이더 설정, 하위 컴포넌트에서 컨텍스트 값 사용
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const mutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginApi(email, password),
    onSuccess: () => {
      setIsLoggedIn(true);
      console.log("Login successful");
    },
    onError: (error: Error) => {
      console.error("Login failed", error);
    },
  });

  const login = async (email: string, password: string): Promise<void> => {
    return mutation.mutateAsync({ email, password });
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
