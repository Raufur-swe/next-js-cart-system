import Image from "next/image";
import { productType } from "../types/productType";

const ProductCard = ({ product }: { product: productType }) => {
  const img = `${product.image}?auto=compress&cs=tinysrgb&w=600`;
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden">
      
      {/* Image */}
      <div className="relative w-full h-64 bg-gray-100">
       <Image
  src={img}
  alt={product.title}
  fill
  sizes="(max-width: 768px) 50vw, 25vw"
  className="object-contain p-4 hover:scale-105 transition duration-300"
/>
      </div>

      {/* Content */}
      <div className="p-4">
        <h2 className="text-lg font-medium text-gray-800 line-clamp-1">
          {product.title}
        </h2>

        <p className="text-xl font-bold text-black mt-2">
          ${product.price}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;