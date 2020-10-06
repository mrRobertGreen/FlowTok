import React, {FC, useEffect} from "react";
import styles from "./styles.module.scss"
import {Container} from "../../Container/Container";
import {Purchase} from "../../Purchase/Purchase";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../../redux/store";
import Preloader from "../../common/Preloader/Preloader";
import {useParams} from "react-router";
import {ContainerT, userActions} from "../../../redux/user/user-reducer";
import {getBuyContainerData, getContainerData} from "../../../redux/user/selectors";

type PropsType = {}

export const ContainersList: FC<PropsType> = () => {

   const dispatch = useDispatch()
   const containerData = useSelector(getContainerData)
   const buyContainerData = useSelector(getBuyContainerData)
   const {type} = useParams()

   useEffect(() => {
      dispatch(userActions.setContainerType(type as ContainerT))
   }, [type])

   if (!containerData || !buyContainerData) return <Preloader/>

   return (
      <div className={styles.wrapper}>
         <div className={styles.container}>
            <Container isInformed={true} data={containerData}/>
            <Purchase data={buyContainerData} type={type}/>
         </div>
      </div>
   )

}