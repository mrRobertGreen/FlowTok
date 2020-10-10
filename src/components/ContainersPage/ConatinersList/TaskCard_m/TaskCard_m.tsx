import React, {FC} from "react";
import styles from "./styles.module.scss"
import {useSelector} from "react-redux";
import {RootStateType} from "../../../../redux/store";
import {ContainerT} from "../../../../redux/user/user-reducer";

type PropsT = {

}

export const TaskCard_m: FC<PropsT> = () => {
   const isDesktop = useSelector((state: RootStateType) => state.app.isDesktop)
   return <></>
};