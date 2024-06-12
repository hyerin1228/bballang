// src/apis/brandApi.ts
import axiosInstance from "./config";

export const getBrands = async () => {
  try {
    const res = await axiosInstance.get("/brands");
    return res.data.result;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};

export const getBrandProducts = async (brandId: string) => {
  try {
    const url = brandId === "" ? "/products" : `/brands/${brandId}`;
    const res = await axiosInstance.get(url);
    return brandId === "" ? res.data.result : res.data.result.products;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};
