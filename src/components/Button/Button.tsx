import React, {ButtonHTMLAttributes, DetailedHTMLProps, FC} from "react";
import styles from "./styles.module.scss"
import cn from "classnames/bind"
import GoogleIcon from "../../media/icons/google.svg"
import VkIcon from "../../media/icons/vk.svg"
import manIcon from "../../media/icons/man.svg"
import womanIcon from "../../media/icons/woman.svg"

/*
* Кнопки на сайте все одинаковые, отличие только в цвете.
* Я тебе буду передавать mod, который означает цвет.
* По умолчанию делай кнопку с синим градиентом.
*
* В качестве чилда я буду передавать подпись для кнопки.
*
* Также я могу передавать все пропсы, как для обычной кнопки. Их я собираю в ...rest и потом
* прокидываю внутрь кнопки.
*
* СДЕЛАЙ У КНОПКИ width: 100%
* */


type PropsT = {
   mod?: "black" | "gradient" | "red" | "Google" | "VK" | "white" | "woman" | "man" | "grey"
   m?: string
   br?: string
   isActive?: boolean
}

const Button: FC<PropsT &
   DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>> = ({
                                                                                        mod,
                                                                                        m,
                                                                                        br,
                                                                                        children,
                                                                                        isActive,
                                                                                        ...rest
                                                                                     }) => {
   return (
      <button
         style={{margin: m, borderRadius: br,}}
         className={cn(
            styles.btn,
            {[styles.btn_black]: mod === "black"}, // в зависимости от мода присваиваю разный класс
            {[styles.btn_gradient]: mod === "gradient"},
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
         {mod === "man" && <img src={manIcon} className={styles.icon_man} alt=""/>}
         {mod === "woman" && <img src={womanIcon} className={styles.icon} alt=""/>}
         {children}
      </button>
   )
}

export default Button