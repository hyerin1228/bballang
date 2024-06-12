"use client";
import { loginApi } from "@/apis/authApi";
import axiosInstance from "@/apis/config";
import { useMutation } from "@tanstack/react-query";
import Error from "next/error";
import { createContext, useContext, useEffect, useState } from "react";

type AuthContextValue = {
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const initialValue: AuthContextValue = {
  isLoggedIn: false,
  login: async (email: string, password: string) => {},
  logout: async () => {},
};

// 1. 컨텍스트 생성
const AuthContext = createContext<AuthContextValue>(initialValue);

// 2. 사용한다 -> useContext
export const useAuth = () => useContext(AuthContext);

// 3. 범위를 정해서 상위 컴포넌트에서 프로바이더 설정, 하위 컴포넌트에서 컨텍스트 값 사용
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    console.log("AuthProvider useEffect");
    const checkAuthStatus = async () => {
      try {
        const response = await axiosInstance.get("/auth/refresh-token");
        if (response.data.success && response.data.result) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Failed to refresh token", error);
        setIsLoggedIn(false);
      }
    };

    checkAuthStatus();
  }, []);

  const mutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginApi(email, password),
    onSuccess: (data) => {
      if (data.success) {
        setIsLoggedIn(true);
        console.log("Login successful");
      } else {
        setIsLoggedIn(false);
      }
    },
    onError: (error: Error) => {
      console.error("Login failed", error);
    },
  });

  const login = async (email: string, password: string): Promise<void> => {
    return mutation.mutateAsync({ email, password });
  };

  const logout = async () => {
    // 로그아웃 API 호출
    try {
      const response = await axiosInstance.delete("/auth/log-out");
      console.log("Logout response", response);
      if (response.data.success) {
        setIsLoggedIn(false);
      } else {
        console.error("Logout failed", response.data.error);
      }
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
