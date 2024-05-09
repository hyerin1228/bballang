interface Brand {
  id: number;
  nameEn: string;
  nameKr: string;
}

export interface Product {
  brand: Brand;
  id: string;
  name: string;
  originalPrice: number;
  price: number;
  imgSrc: string;
}
