import { Product } from "@/interface/product";
import { formatCurrency } from "@/utils/formatters";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="block rounded-md">
      <Image
        src={product.imgSrc}
        alt={product.name}
        className="w-full h-48 object-cover mb-3 hover:scale-110 duration-200 ease-in-out active:brightness-75 "
        width={100}
        height={100}
        layout="responsive"
      />
      <div className="text-sm font-bold">{product.brand.nameEn}</div>
      <h6 className="text-[15px]">{product.name}</h6>
      <div className="text-sm flex flex-col sm:flex-row items-baseline gap-1.5">
        <span className="text-red-500 font-bold line-through">
          ₩{formatCurrency(product.originalPrice)}
        </span>
        <span className="font-bold">₩{formatCurrency(product.price)}</span>
      </div>
    </div>
  );
}

export default ProductCard;
