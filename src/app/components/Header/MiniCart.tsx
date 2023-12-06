import { useState, useRef } from "react"
import { ShoppingBagIcon } from "@heroicons/react/20/solid"
import { useOutsideClick } from "@/app/hooks/useOutsideClick";
import { useSelector } from "react-redux";
import MiniCartClear from "./MiniCartClear";

type MiniCartComponentProps = {
  setIsOverlay: (value: boolean) => void;
  isOverlay: boolean;
};

export default function MiniCart({ setIsOverlay, isOverlay }: MiniCartComponentProps) {

  const btnRef = useRef<HTMLButtonElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { cart } = useSelector((state: any) => {
    return state.cart;
  });

  // console.log(cart)

  // outside click
  useOutsideClick({
    ref: cartRef, 
    btnRef: btnRef, 
    callback: () => {
      setIsOpen(false);
      setIsOverlay(false);
    }
  });

  // handle open cart
  const handleOpenCart = (): void => {
    setIsOpen(!isOpen);
    setIsOverlay(!isOverlay);
  };


  return (
    <div className="relative z-20">
      <span className="absolute w-4 h-4 -left-1 text-xs flex justify-center items-center text-white bg-orange-500 rounded-full">
        {cart.length}
      </span>
      <button
        ref={btnRef}
        className="flex items-center p-2 bg-gray-100 rounded-md"
        onClick={handleOpenCart}
      >
        <ShoppingBagIcon className="h-6 w-6"/>
      </button>
      {isOpen && (
        <div
          ref={cartRef}
          className={`absolute transition-opacity opacity-100 top-11 right-0 bg-white rounded-md shadow-md p-2 w-72 overflow-y-auto max-h-72 border border-gray-100`}
        >
          <span className="uppercase text-xs font-bold">Cart</span>
          {cart.length === 0 && (
            <div className="flex justify-center items-center w-full h-full">
              <p className="text-sm py-4 text-gray-500">Cart is empty</p>
            </div> 
          )}
          <MiniCartClear 
            cart={cart}
          />
        </div>
      )}
    </div>
  )

}