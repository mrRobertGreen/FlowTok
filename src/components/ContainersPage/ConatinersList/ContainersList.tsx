import React, {FC} from "react";
import styles from "./styles.module.scss"
import {Container} from "../../Container/Container";
import {Purchase} from "../../Purchase/Purchase";

type PropsType = {

}

export const ContainersList: FC<PropsType> = () => {

   return (
      <div className={styles.wrapper}>
         <div className={styles.container}>
            <Container isInformed={true}/>
            <Purchase/>
         </div>
      </div>
   )

}