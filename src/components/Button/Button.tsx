import React, {ButtonHTMLAttributes, DetailedHTMLProps, FC} from "react";
import styles from "./styles.module.scss"
import cn from "classnames/bind"

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
   mod?: "black" | "gradient" | "red"
}

const Button: FC<PropsT &
   DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>> = ({
                                                                                        mod,
                                                                                        children,
                                                                                        ...rest
                                                                                     }) => {
   return (
      <button
         className={cn(
            styles.btn,
            {[styles.btn_black]: mod === "black"}, // в зависимости от мода присваиваю разный класс
            {[styles.btn_gradient]: mod === "gradient"},
            {[styles.btn_red]: mod === "red"},
         )}
         {...rest}>
         {children}
      </button>
   )
}

export default Button