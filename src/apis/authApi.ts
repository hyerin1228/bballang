import axiosInstance from "./config";

export const loginApi = async (email: string, password: string) => {
  const res = await axiosInstance.post("/auth/log-in", {
    email,
    password,
  });

  console.log(`res.data: ${JSON.stringify(res.data)}`);
  return res.data;
};
