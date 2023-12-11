import { PlusIcon } from "@heroicons/react/20/solid"
import { useDispatch } from "react-redux"
import { addToCart } from "../store/slices/cartSlice";
import { setNotification } from "../store/slices/notificationsSlice";

type Image = {
  id: number;
  src: string;
}

type ProductListBuyComponentProps = {
  id: number;
  name: string;
  price: string;
  images: Image[];
}


export default function ProductListBuy({id, name, price, images}: ProductListBuyComponentProps) {

  const dispatch = useDispatch();


  // add to cart
  const handleAddToCart = (): void => {
    
    // dispatch add to cart
    dispatch(addToCart(
      { 
        id: id, 
        quantity: 1,
        name: name,
        price: price,
        images: images, 
      }
    ));

    // dispatch notification
    dispatch(setNotification(
      {
        visible: true,
        message: 'Product added to cart',
        type: 'success',
        key: Math.random(),
      }
    ));

  }


  return (
    <button 
      onClick={handleAddToCart}
      className="bg-orange-500 text-white px-3 py-2 rounded-sm flex items-center gap-1 transition-colors hover:bg-orange-600"
    >
      <PlusIcon className="h-5 w-5 bg-white/20 rounded-full p-1 mr-1"/>
     Add to cart
    </button>
  )

}