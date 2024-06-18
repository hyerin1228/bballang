export interface Brand {
  id: number;
  nameEn: string;
  nameKr: string;
}

export interface Product {
  id: string;
  name: string;
  imgSrc: string;
  brand: Brand;
  originalPrice: number;
  price: number;
}
