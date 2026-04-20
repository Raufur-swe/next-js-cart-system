import Image from "next/image"
import {productType} from "../types/productType"

const ProductCard = ({product}:{product : productType}) => {
  return (
    <div>
       <Image src={Array.isArray(product.image) ? product.image[0] : product.image} alt="Product" width={200} height={200} />
       <h2>{product.title}</h2>
       <p>${product.price.toFixed(2)}</p>
    </div>
  )
}

export default ProductCard