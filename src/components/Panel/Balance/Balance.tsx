import React, {FC} from "react";
import styles from "./styles.module.scss";
import Button from "../../Button/Button";

// type PropsT = {
//     isDesktop: boolean
// }

type Props = {
    isCard?: boolean
}

export const Balance: FC<Props> = ({isCard}) => {
    if (isCard) {
        return (
            <div className={styles.wrapper_card}>
                <div className={styles.container_card}>
                    <p className={styles.text_card}>Баланс:</p>
                    <p className={styles.numbers_card}>16 500 ₽</p>
                    <div className={styles.button}>
                        <Button mod={"blue"} children={"Пополнить"} m={"21px 0 0 0"}/>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <div className={styles.balance}>
                        <p className={styles.balance__text}>Баланс:</p>
                        <p className={styles.balance__numbers}>16 500 ₽</p>
                    </div>
                    <div className={styles.button}>
                        <Button mod={"pinkGradient"} children={"Пополнить"}/>
                    </div>
                </div>
            </div>
        )
    }
}