import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.ballang.yoojinyoung.com",
  withCredentials: true,
});

// 토큰은 짧은 만료시간을 가지며, 만료되면 새로운 액세스 토큰을 발급받아야 한다. (리프레쉬 토큰)

export default axiosInstance;
