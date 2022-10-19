import Link from "next/link";
import { useQuery } from "react-query";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import { getProducts } from "../../fetchers/products";
import formatCurrency from "../../lib/formatCurrency";

type CartItemProps = {
  id:string,
  quantity:number,
}


const ShoppingCartItem = ({id, quantity}:CartItemProps) => {

  const {removeFromCart} = useShoppingCart()

const {data:products, isLoading} = useQuery(['products'], getProducts)

    if(isLoading) return <p>Loading...</p>

    const product = products?.find(item => item.id === id)

    if(!product) return null

  return (
    <li key={product.id} className="flex py-6">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img
          src={product.main_image}
          alt={product.name}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <Link href={`/products/${product.slug}`}>
              <a>{product.name}</a>
            </Link>
            <p className="ml-4">{formatCurrency(product.price * quantity)}</p>
          </div>

          <p className="mt-1 text-sm text-gray-500">{formatCurrency(product.price)} each</p>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <p className="text-gray-500">Qty {quantity}</p>

          <div className="flex">
            <button
              onClick={() => removeFromCart(id)}
              type="button"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};
export default ShoppingCartItem;
