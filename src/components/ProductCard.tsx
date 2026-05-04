import Image from "next/image";
import { productType } from "../types/productType";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { selectCartItemById } from "../redux/features/cartSelector";
import { addToCart } from "../redux/features/cartSlice";

const ProductCard = ({ product }: { product: productType }) => {
  const dispatch = useAppDispatch();
  const cartItem = useAppSelector(selectCartItemById(product._id));
  const img = `${product.image}?auto=compress&cs=tinysrgb&w=600`;
  return (
    <div className="flex flex-col  justify-between rounded-lg shadow-md ">
      <div className="bg-blue-500">
        <Image
          src={img}
          alt={product.title}
          width={300}
          height={300}
          className="w-full h-60"
        />
      </div>
      <div className="p-2 flex flex-col gap-2">
        <h2 className="font-medium text-xl">{product.title}</h2>
        <p className="text-sm font-light text-gray-700">{product.description.split(" ").slice(0, 10).join(" ")}...</p>
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold">${product.price}</p>
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600" onClick={()=>dispatch(addToCart({
            id : product._id,
            title : product.title,
            price : product.price,
            image : product.image
          }))}>
            Add to Cart
          </button>
        </div>
      </div>


    </div>
  )
};

export default ProductCard;