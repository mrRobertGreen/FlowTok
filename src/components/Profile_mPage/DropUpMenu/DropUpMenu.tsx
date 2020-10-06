import React, {FC} from "react";
import styles from "./styles.module.scss"
import closeIcon from "../../../media/icons/close_icon.svg"
import ArrowRightIcon from "../../../media/icons/arrow_right_icon.svg"
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootStateType} from "../../../redux/store";

type PropsType = {
   hideMenu: () => void
   isDesktop: boolean
   exit: () => void
}

const DropUpMenu: FC<PropsType> = ({hideMenu, isDesktop, exit}) => {

   return (
      <div>
      </div>
   )

}

export default DropUpMenu