import { PlusIcon } from "@heroicons/react/20/solid"
import { useDispatch } from "react-redux"
import { addToCart } from "../store/slices/cartSlice";
import { setNotification } from "../store/slices/notificationsSlice";

type Image = {
  id: number;
  src: string;
}

type ProductBuyComponentProps = {
  id: number;
  name: string;
  price: string;
  images: Image[];
}


export default function ProductBuy({id, name, price, images}: ProductBuyComponentProps) {

  const dispatch = useDispatch();


  // add to cart
  const handleAddToCart = (): void => {

    // dispatch add to cart
    if(price) {
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
    } else {
      dispatch(setNotification(
        {
          visible: true,
          message: 'Product out of stock',
          type: 'error',
          key: Math.random(),
        }
      ));
    
    }

  }

  const styleBtn = price ? "bg-orange-500 text-white px-3 py-2 rounded-sm flex items-center gap-1 transition-colors hover:bg-orange-600 cursor-pointer" : "bg-gray-300 text-white px-3 py-2 rounded-sm flex items-center gap-1 transition-colors";


  return (
    <button
      disabled={price ? false : true} 
      onClick={handleAddToCart}
      className={styleBtn}
    >
      <PlusIcon className="h-5 w-5 bg-white/20 rounded-full p-1 mr-1"/>
     Add to cart
    </button>
  )

}