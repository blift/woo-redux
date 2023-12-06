import { useDispatch } from "react-redux"
import { clearCart } from "../../store/slices/cartSlice";

type Products = {
  id: number;
  quantity: number;
}

type CartProps = {
  cart: Products[];
}

export default function MiniCartClear({cart}: CartProps) {


  console.log('---->', cart)

  const dispatch = useDispatch();


  const handleClearCart = (): void => {
    dispatch(clearCart());
  }

  if(cart.length === 0) return null;

  return (
    <button 
      onClick={handleClearCart}
      className="bg-red-500 text-white w-full text-sm py-2 mt-2 rounded-sm transition-colors hover:bg-red-600"
    >
      <p>Delete all</p>
    </button>
  )
}