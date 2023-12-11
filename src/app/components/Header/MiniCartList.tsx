import React, { useState } from "react";
import { TrashIcon } from "@heroicons/react/20/solid";
import { useDispatch } from "react-redux";
import { removeFromCart } from "@/app/store/slices/cartSlice";
import { setNotification } from "@/app/store/slices/notificationsSlice";
import Spinner from "../Spinner";

type Product = {
  id: number;
  quantity: number;
  price: string;
  name: string;
  images: {
    alt: string;
    date_created: string;
    date_created_gmt: string;
    date_modified: string;
    date_modified_gmt: string;
    id: number;
    name: string;
    src: string;
  }[];
}

type MiniCartListProps = {
  cart: Product[];
}

export default function MiniCartList({cart}: MiniCartListProps) {

  const [loading, setLoading] = useState<boolean>(false);

  // function to delete
  const dispatch = useDispatch();

  const handleDelete = (id: number): void => {
    setLoading(true);

    setTimeout(() => {
      dispatch(removeFromCart(
        {
          id: id,
          quantity: 1,
        }
      ));

      setLoading(false);

      dispatch(setNotification(
        {
          visible: true,
          message: 'Product removed from cart',
          type: 'info',
          key: Math.random(),
        }
      ));
    }, 1000);

  }


  // calculate sum
  const sum = (): string => {

    let total = 0;

    cart.forEach((product) => {
      let price: number;

      if(product?.price ) {
        const priceToInt = parseInt(product.price);

        price = priceToInt;
      } else {

        price = 1;
      }

      total += price * product.quantity;
    });
    
    return total.toFixed(2);
  }


  return (
    <div className="flex flex-col relative overflow-hidden">
      {loading ? (
        <div className="absolute bg-white/50  left-0 top-0 w-full h-full flex justify-center items-center">
          <Spinner />
        </div>
      ) : null}
      <div className="h-[250px] overflow-y-auto pt-2">
        {cart.map((product) => (
          <div key={product.id} className="flex items-center gap-2 mb-2">
            <div className="w-16 h-16 shrink-0 bg-gray-200 rounded-md relative">
              {product.images.length > 0 ? (
                <img
                  src={product.images[0].src}
                  className="w-full h-full object-cover rounded-md"
                />
              ) : (
                <div className="w-full h-full flex justify-center items-center">
                  <p className="text-gray-500 text-sm">No image</p>
                </div>
              )}
              <button 
                onClick={() => handleDelete(product.id)}
                className="absolute top-1 left-1 p-0.5 bg-red-100 w-6 h-6 rounded-full flex justify-center items-center z-20"
              >
                <TrashIcon className="h-4 w-4 text-red-400"/>
              </button>
            </div>
            <div className="flex flex-col">
              <p className="text-xs">{product.name}</p>
              <p className="text-xs font-semibold">{product.quantity} x $ {product.price}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center pt-2">
        <span className="uppercase text-xs font-bold">Sum</span>
        <span className="text-xs font-bold">$ {sum()}</span>
      </div>
    </div>
  )

}
