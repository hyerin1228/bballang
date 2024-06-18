interface Brand {
  id: number;
  nameKr: string;
  nameEn: string;
}

interface Product {
  id: number;
  name: string;
  imgSrc: string;
  onlineStock: number;
  price: number;
  originalPrice: number;
  deliveryType: string;
  brandId: number;
  brand: Brand;
}

export interface CartItem {
  id: number;
  quantity: number;
  cartId: number;
  productId: number;
  createdAt: string;
  updatedAt: string;
  product: Product;
}
