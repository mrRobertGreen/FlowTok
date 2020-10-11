import React, {FC, useEffect} from "react";
import styles from "./styles.module.scss"
import {Container} from "../../Container/Container";
import {Purchase} from "../../Purchase/Purchase";
import {useDispatch, useSelector} from "react-redux";
import Preloader from "../../common/Preloader/Preloader";
import {useParams} from "react-router";
import {ContainerT, getContainers, userActions} from "../../../redux/user/user-reducer";
import {
   getBuyContainerData,
   getContainerData,
   getContainerType,
   getterBuyContainerData,
   getterContainerData
} from "../../../redux/user/selectors";
import {useCache} from "../../../hooks/useCache";

type PropsType = {}

export const ContainersList: FC<PropsType> = () => {

   const dispatch = useDispatch()
   const containerType = useSelector(getContainerType)
   let containerData = useSelector(getContainerData)
   let buyContainerData = useSelector(getBuyContainerData)


   const containersCache = useCache("containers")
   const buyContainerCache = getterBuyContainerData(containersCache, containerType)
   const containerCache = getterContainerData(containersCache, containerType)

   const {type} = useParams()

   useEffect(() => {
      dispatch(userActions.setContainerType(type as ContainerT))
   }, [type])


   useEffect(() => {
      dispatch(getContainers())
   }, [])

   if (!containerData) containerData = containerCache
   if (!buyContainerData) buyContainerData = buyContainerCache

   if (!containerData || !buyContainerData) return <Preloader/>

   return (
      <div className={styles.wrapper}>
         <div className={styles.container}>
            <Container isInformed={true} data={containerData} buyData={buyContainerData}/>
            <Purchase data={buyContainerData} type={type}/>
         </div>
      </div>
   )

}