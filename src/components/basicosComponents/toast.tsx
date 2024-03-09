// Toast.js
import React, { useState, useEffect, ReactNode } from "react";
import { CiCircleCheck } from "react-icons/ci";

interface Props {
  duration?: number;
  type?: "default" | "success" | "error";
  children?: ReactNode;
}

const Toast = ({ duration = 3000, type = "default", children }: Props) => {
  const [isVisible, setIsVisible] = useState(true);
  const [exitAnimation, setExitAnimation] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      //setExitAnimation("animate__fadeOutRight");
      setTimeout(() => {
        setIsVisible(false);
      }, 500);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  const toastClasses = `flex items-center gap-2 fixed bottom-5 right-5 py-5 px-4 rounded shadow-md z-50 animate__animated ${
    type === "success"
      ? "bg-green-500 text-white animate__fadeInRight animate__fast"
      : type === "error"
      ? "bg-red text-white animate__fadeInRight animate__sanimate__fast"
      : "bg-gray-800 text-white animate__fadeInRight animate__fast"
  } ${exitAnimation}`;

  return isVisible ? (
    <div className={toastClasses}>
      {type === "error" &&
        "Aconteceu algum erro inesperado ao executar essa ação, se o erro persistir entre em contato com o suporte!"}
        {/*@ts-ignore  */}
      {type === "success" && <CiCircleCheck className="w-5" size={34}/>}

      {children}
    </div>
  ) : null;
};

export default Toast;
