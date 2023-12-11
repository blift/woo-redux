import { useState, useEffect } from "react";
import { CheckCircleIcon, ExclamationTriangleIcon, ExclamationCircleIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { useSelector, useDispatch } from "react-redux";
import { setNotification } from "../store/slices/notificationsSlice";

export default function Notification() {

  const dispatch = useDispatch();

  const [timer, setTimer] = useState<number>(100.0);

  const { visible, type, message, key } = useSelector((state: any) => {
    return state.notification;
  });


  const clear = () => {
    dispatch(setNotification({
      visible: false,
      type: type,
      message: '',
      key: 0,
    }));
  }


  // use set interval to fire once
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (visible) {
      setTimer(100.0); // Reset timer when notification becomes visible
      interval = setInterval(() => {
        setTimer((prev) => Math.max(prev - 0.1, 0)); 
      }, 5);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [visible, key]);


  useEffect(() => {
    if (timer === 0) {
      clear();
    }
  }, [timer]);



  // handle close notification
  const handleCloseNotification = (type: "success" | "error" | "info"): void => {
    dispatch(setNotification({
      visible: false,
      type: type,
      message: '',
      key: 0,
    }));
  }


  if(visible && type === 'success') return (
    <div data-testid="alert__popup" className="alert__popup bg-white w-full mx-auto left-0 right-0 max-w-[700px] shadow-lg overflow-hidden fixed top-24 z-20 py-2 px-4 rounded-md">
      <div className="relative  flex items-center justify-cennter gap-4">
        <span className={`h-0.5 absolute -top-2  bg-green-500`}
          style={{width: `${timer}%`}}
        ></span>
        <span className="bg-green-100 rounded-lg p-2">
          <ExclamationCircleIcon className="h-6 w-6 text-green-500"/>
        </span>
        <p className="text-sm">{message}</p>
        <button
          onClick={() => handleCloseNotification('success')} 
          className="absolute top-0 right-0"
        >
          <XMarkIcon className="h-6 w-6 text-gray-400 bg-gray-100 rounded-full transition-colors hover:bg-gray-200"/>
        </button>
      </div>
    </div>
  )

  if(visible && type === 'info') return (
    <div data-testid="alert__popup" className="alert__popup bg-white w-full mx-auto left-0 right-0 max-w-[700px] shadow-lg overflow-hidden fixed top-24 z-20 py-2 px-4 rounded-md">
      <div className="relative  flex items-center justify-cennter gap-4">
        <span className={`h-0.5 absolute -top-2  bg-yellow-500`}
          style={{width: `${timer}%`}}
        ></span>
        <span className="bg-yellow-100 rounded-lg p-2">
          <CheckCircleIcon className="h-6 w-6 text-yellow-500"/>
        </span>
        <p className="text-sm">{message}</p>
        <button
          onClick={() => handleCloseNotification('success')} 
          className="absolute top-0 right-0"
        >
          <XMarkIcon className="h-6 w-6 text-gray-400 bg-gray-100 rounded-full transition-colors hover:bg-gray-200"/>
        </button>
      </div>
    </div>
  )

  if(visible && type === 'error') {
    return (
      <div data-testid="alert__popup" className="alert__popup bg-white w-full mx-auto left-0 right-0 max-w-[700px] shadow-lg overflow-hidden fixed top-24 z-20 py-2 px-4 rounded-md">
        <div className="relative  flex items-center justify-cennter gap-4">
          <span className={`h-0.5 absolute -top-2  bg-red-500`}
            style={{width: `${timer}%`}}
          ></span>
          <span className="bg-red-100 rounded-lg p-2">
            <ExclamationTriangleIcon className="h-6 w-6 text-red-500"/>
          </span>
          <p className="text-sm">Error!</p>
          <button
            onClick={() => handleCloseNotification('success')} 
            className="absolute top-0 right-0"
          >
            <XMarkIcon className="h-6 w-6 text-gray-400 bg-gray-100 rounded-full transition-colors hover:bg-gray-200"/>
          </button>
        </div>
      </div>
    )
  }

  return null;

}