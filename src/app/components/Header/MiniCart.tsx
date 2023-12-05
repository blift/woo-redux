import { useState, useRef } from "react"
import { ShoppingBagIcon } from "@heroicons/react/20/solid"
import { useOutsideClick } from "@/app/hooks/useOutsideClick";


type MiniCartComponentProps = {
  setIsOverlay: (value: boolean) => void;
  isOverlay: boolean;
};

export default function MiniCart({ setIsOverlay, isOverlay }: MiniCartComponentProps) {

  const btnRef = useRef<HTMLButtonElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState<boolean>(false);

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
    cartRef.current?.classList.add("animate_____");
  };


  return (
    <div className="relative z-20">
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
        </div>
      )}
    </div>
  )

}