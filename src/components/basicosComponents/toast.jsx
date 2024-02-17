// Toast.js
import React, { useState, useEffect } from "react";

const Toast = ({ duration = 3000, type = "default", children }) => {
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

  const toastClasses = `fixed bottom-5 right-5 p-4 rounded shadow-md z-50 animate__animated ${
    type === "success"
      ? "bg-green-500 text-white animate__fadeInRight animate__fast"
      : type === "error"
      ? "bg-red text-white animate__fadeInRight animate__sanimate__fast"
      : "bg-gray-800 text-white animate__fadeInRight animate__fast"
  } ${exitAnimation}`;

  return isVisible ? (
    <div className={toastClasses}>
      {type === "error"
        ? "Aconteceu algum erro inesperado ao executar essa ação, se o erro persistir entre em contato com o suporte!"
        : null}
      {children}
    </div>
  ) : null;
};

export default Toast;
