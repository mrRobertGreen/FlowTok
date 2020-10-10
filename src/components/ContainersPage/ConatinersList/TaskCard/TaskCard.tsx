import React, {FC} from "react";
import {useSelector} from "react-redux";
import {RootStateType} from "../../../../redux/store";
import {ContainerT} from "../../../../redux/user/user-reducer";

type PropsT = {
   taskType: ContainerT
   isActiveTask: boolean
}

export const TaskCard: FC<PropsT> = ({}) => {
   const isDesktop = useSelector((state: RootStateType) => state.app.isDesktop)

   return <></>
};