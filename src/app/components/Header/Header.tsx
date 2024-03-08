"use client"

import { useState } from "react";
import Title from "./Title";
import MiniCart from "./MiniCart";
import Link from "next/link";

export default function Header() {

  const [isOverlay, setIsOverlay] = useState<boolean>(false);

  return (
    <>
      {isOverlay && (
        <span className="fixed top-0 left-0 w-full min-h-screen bg-black/70 z-30"></span>
      )}
      <div className="w-full flex justify-between items-center p-1 bg-white container mx-auto">
        <Link href="/">
          <Title 
            title="WOO + REDUX"
          />
        </Link>
        <MiniCart 
          setIsOverlay={setIsOverlay}
          isOverlay={isOverlay}
        />
      </div>
    </>
  )
}