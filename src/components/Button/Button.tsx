import React, {FC} from "react";
import styles from "./styles.module.scss"
import cn from "classnames/bind"
import tikTokIcon from "../../media/icons/tiktok.svg"
import doneIcon from "../../media/icons/done_icon.svg"

type PropsType = {
   onButtonClick?: () => void,
   mod?: "bright" | "light" | "grey" | "tiktok" | "black" | "done" | "red" | undefined
   disabled?: boolean
   type?: string
}

const Button: FC<PropsType> = ({
                                  onButtonClick,
                                  children,
                                  mod,
                                  disabled,
                               }) => {
   return (
      <button
         disabled={disabled}
         className={cn(
            styles.btn,
            {[styles.btn_light]: mod === "light"},
            {[styles.btn_grey]: mod === "grey"},
            {[styles.btn_black]: mod === "black"},
            {[styles.btn_bright]: mod === "bright"},
            {[styles.btn_tiktok]: mod === "tiktok"},
            {[styles.btn_red]: mod === "red"},
         )}
         onClick={onButtonClick}>
         {mod === "tiktok" && "Перейти в TikTok"}
         {mod === "done" && <img src={doneIcon} alt=""/>}
         {children}
      </button>
   )
}

export default Button