import React, {ButtonHTMLAttributes, DetailedHTMLProps, FC} from "react";
import styles from "./styles.module.scss"
import cn from "classnames/bind"
import GoogleIcon from "../../media/icons/google.svg"
import VkIcon from "../../media/icons/vk.svg"
import manIcon from "../../media/icons/man.svg"
import manActiveIcon from "../../media/icons/man_active.svg"
import womanIcon from "../../media/icons/woman.svg"
import womanActiveIcon from "../../media/icons/woman_active.svg"
import copyIcon from "../../media/icons/copy.svg"
import {MiniLoader} from "../MiniLoader/MiniLoader";

type PropsT = {
   mod?: "black" | "gradient" | "red" | "Google" | "VK" | "white" | "woman" | "man" | "grey" | "loading" | "copy"
   m?: string
   br?: string
   isActive?: boolean
   p?: string
}

const Button: FC<PropsT &
   DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>> = ({
                                                                                        mod,
                                                                                        m,
                                                                                        br,
                                                                                        children,
                                                                                        isActive,
                                                                                        p,
                                                                                        ...rest
                                                                                     }) => {
   if (mod === "loading") return <MiniLoader/>
   return (
      <button
         style={{margin: m, borderRadius: br, padding: p}}
         className={cn(
            styles.btn,
            {[styles.btn_black]: mod === "black"}, // в зависимости от мода присваиваю разный класс
            {[styles.btn_gradient]: mod === "gradient"},
            {[styles.btn_copy]: mod === "copy"},
            {[styles.btn_white]: mod === "white"},
            {[styles.btn_active]: isActive},
            {[styles.btn_red]: mod === "red"},
            {[styles.btn_grey]: mod === "grey"},
            {[styles.btn_sex]: mod === "woman" || mod === "man"},
            {[styles.btn_vk]: mod === "VK"},
            {[styles.btn_google]: mod === "Google"},
         )}
         {...rest}>
         {mod === "Google" && <img src={GoogleIcon} className={styles.icon} alt=""/>}
         {mod === "VK" && <img src={VkIcon} className={styles.icon} alt=""/>}
         {mod === "man" && !isActive && <img src={manIcon} className={styles.icon_man} alt=""/>}
         {mod === "man" && isActive && <img src={manActiveIcon} className={styles.icon_man} alt=""/>}
         {mod === "woman" && !isActive && <img src={womanIcon} className={styles.icon_woman} alt=""/>}
         {mod === "woman" && isActive && <img src={womanActiveIcon} className={styles.icon_woman} alt=""/>}
         {mod === "copy" && <img src={copyIcon} className={styles.icon_copy} alt=""/>}
         {children}
      </button>
   )
}

export default Button