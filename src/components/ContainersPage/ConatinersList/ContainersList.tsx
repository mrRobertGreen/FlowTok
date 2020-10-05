import React, {FC} from "react";
import styles from "./styles.module.scss"
import {Container} from "../../Container/Container";
import {Purchase} from "../../Purchase/Purchase";
import {useSelector} from "react-redux";
import {RootStateType} from "../../../redux/store";
import Preloader from "../../common/Preloader/Preloader";
import {useParams} from "react-router";
import {ContainerObjT} from "../../../api/user-api";

type PropsType = {}

export const ContainersList: FC<PropsType> = () => {

   // let containers = useSelector((state: RootStateType) => state.user.containers)
   const type = useParams()


   let containers = {
      "small": {
         "container": {
            "type": "Small",
            "image": "https://__budet__pozje",
            "quantity": "1 шт. + 30 %",
            "need": "До 2 шт. осталось 70%"
         },
         "buy": {
            "cost": 10000,
            "percent": 1.2,
            "wallet": 15999.34
         }
      },
      "large": {
         "container": {
            "type": "Small",
            "image": "https://__budet__pozje",
            "quantity": "1 шт. + 30 %",
            "need": "До 2 шт. осталось 70%"
         },
         "buy": {
            "cost": 10000,
            "percent": 1.2,
            "wallet": 15999.34
         }
      },
      "refrigerator": {
         "container": {
            "type": "Small",
            "image": "https://__budet__pozje",
            "quantity": "1 шт. + 30 %",
            "need": "До 2 шт. осталось 70%"
         },
         "buy": {
            "cost": 10000,
            "percent": 1.2,
            "wallet": 15999.34
         }
      }
   }

   const getCurrentContainerInfo = () => {
      switch (type) {
         case "large":
            return containers.large.container
         case "small":
            return containers.small.container
         case "refrigerator":
            return containers.refrigerator.container
      }
      return containers.small.container
   }
   const getCurrentBuyContainerInfo = () => {
      switch (type) {
         case "large":
            return containers.large.buy
         case "small":
            return containers.small.buy
         case "refrigerator":
            return containers.refrigerator.buy
      }
      return containers.small.buy
   }

   return (
      <div className={styles.wrapper}>
         <div className={styles.container}>
            <Container isInformed={true} data={getCurrentContainerInfo()}/>
            <Purchase data={getCurrentBuyContainerInfo()}/>
         </div>
      </div>
   )

}