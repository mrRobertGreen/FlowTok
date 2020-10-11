import React, {FC} from "react";
import styles from "./styles.module.scss";
import container from "../../media/images_new/container.svg";
import VerticalLine from "../../media/images_new/VerticalLine.svg";
import info from "../../media/images_new/Info.svg";

import Modal from "../common/Modal/Modal";
import {ToolTip} from "../ToolTip/ToolTip";

import {BuyContainerT, ContainerObjT} from "../../api/user-api";


type PropsT = {
   isInformed?: boolean
   data: ContainerObjT
   buyData?: BuyContainerT
}
export const Container: FC<PropsT> = ({isInformed = false, data, buyData}) => {

   const {image, need, quantity, type} = data


    return (
        <div className={styles.wrapper}>
            <Modal isOpen={isInformed}>
                <ToolTip />
            </Modal>
         <div className={styles.title}>
            Контейнер {type}
            <InformedButton isInformed={isInformed}/>
            {buyData ? <p className={styles.text__little_2}>Цена: {buyData.cost} ₽ за шт.</p> : <div/>}
         </div>
         <div className={styles.container}>
            <img src={image} className={styles.image} alt=" "/>
            <img src={VerticalLine} alt=""/>
            <div className={styles.text}>
               <div className={styles.text__little}>Количество</div>
               <div className={styles.text__large}>{quantity}</div>
               <div className={styles.text__little}>{need}</div>

            </div>
         </div>
      </div>
   )
}

type InfoProps = {
   isInformed: boolean
}


const InformedButton: FC<InfoProps> = ({isInformed}) => {

    if (isInformed) {
        return (
            <img src={info} style={{paddingLeft: "9px", height: "19px"}} alt=""/>
        )
    } else {
        return (
            <span/>
        )
    }

// const Cost: FC<InfoProps> = ({isInformed}) => {
//     if (isInformed) {
//         return (
//             <div>ih</div>
//         )
//     }
// }