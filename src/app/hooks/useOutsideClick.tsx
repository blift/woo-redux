import { useEffect, RefObject } from "react";

type UseOutsideClickProps = {
  ref: RefObject<HTMLDivElement>;
  btnRef: RefObject<HTMLButtonElement>;
  callback: () => void;
}

export const useOutsideClick = ({ref, btnRef, callback}: UseOutsideClickProps) => {

  const handleClick = (e: MouseEvent) => {
    if (ref.current && !btnRef.current!.contains(e.target as Node) && !ref.current.contains(e.target as Node)) {
      callback();
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    }
  }, [ref]);

}
