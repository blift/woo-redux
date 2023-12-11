import { XMarkIcon } from '@heroicons/react/20/solid';
import React, { useState } from 'react'

type ModalProps = {
  children: React.ReactNode;
  isOpened: boolean;
  setIsModal: (value: boolean) => void;
}


export default function Modal({ children, isOpened, setIsModal }: ModalProps ) {

  if(!isOpened) return null;

  return (
    <div className="fixed top-0 left-0 z-20 bg-black/50 w-full min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-[600px] h-[600px] bg-white rounded-lg shadow-md p-4 relative">
        <button 
          onClick={() => setIsModal(false)}
          className="absolute top-2 right-2 h-8 w-8 bg-gray-100 rounded-full flex justify-center items-center transition-colors hover:bg-gray-200"
        >
          <XMarkIcon className="h-6 w-6 text-gray-400"/>
        </button>
        {children}
      </div>
    </div>
  )

}