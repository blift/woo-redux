import React, { useState } from "react";
import { useDispatch } from "react-redux"
import { clearCart } from "../../store/slices/cartSlice";
import { setNotification } from "@/app/store/slices/notificationsSlice";
import Modal from "../Modal";

type Products = {
  id: number;
  quantity: number;
}

type CartProps = {
  cart: Products[];
}

export default function MiniCartClear({cart}: CartProps) {

  const [isModal, setIsModal] = useState<boolean>(false);

  const dispatch = useDispatch();

  // open modal
  const handleModal = (): void => {
    setIsModal(!isModal);
  }

  // clear cart
  const handleClearCart = (): void => {
    dispatch(clearCart());
    dispatch(setNotification(
      {
        visible: true,
        message: 'Cart cleared',
        type: 'info',
        key: Math.random(),
      }
    ));
  }


  if(cart.length === 0) return null;

  return (
    <>
      <button 
        onClick={handleModal}
        className="bg-red-500 text-white w-full text-sm py-2 mt-2 rounded-sm transition-colors hover:bg-red-600"
      >
        <p>Delete all</p>
      </button>
      <Modal 
        isOpened={isModal}
        setIsModal={setIsModal}
      >
        <div className="mt-10 p-4 h-[calc(100%_-_3rem)] flex flex-col justify-between">
          <div className="h-full flex items-center justify-center">
            <p>Are you sure you want to clear your cart?</p>
          </div>
          <div className="flex items-center justify-center gap-2 text-white text-sm">
            <button
              onClick={handleModal} 
              className="px-4 py-2 bg-black rounded-sm"
            >
              Close
            </button>
            <button
              onClick={handleClearCart} 
              className="px-4 py-2 bg-red-500 rounded-sm"
            >
              Confirm
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
}