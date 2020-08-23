import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./Portal.module.scss"

// 'modal-root' is a sibling to 'app-root'
const modalRoot = document.getElementById("portal");

function Modal({ isOpen, children }) {
  const el = document.createElement("div");

  useEffect(() => {
    modalRoot.appendChild(el);
    return () => {
      modalRoot.removeChild(el);
    };
  }, [el]);

  return (
    isOpen &&
    createPortal(
      <div className={styles.main}>
        <p style={{width:"75%"}}>
          {children}
        </p>
      </div>,
      // target container
      el
    )
  );
}
export default Modal;