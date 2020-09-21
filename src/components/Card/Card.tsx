import React, {FC} from "react";
import styles from "./styles.module.scss"
import {useSelector} from "react-redux";
import {RootStateType} from "../../redux/store";
import {Main} from "../../pages/Landing/Main/Main";

/*
* Карточка для профиля
* */


type PropsT = {
    size?: "small" | "big"
    pad?: string
}

export const Card: FC<PropsT> = ({
                                     pad,
                                     children,
                                     size

                                 }) => {
    const isDesktop = useSelector((state: RootStateType) => state.app.isDesktop)

    let MainStyle = {
        padding: pad
    }

    let TextStyle = {
        padding: "61px 50px", // small desktop size
        borderRadius: "30px",
    }

    if (isDesktop && size === "big") {
        TextStyle.padding = "65px 60px"
    }
    if (!isDesktop) {
        TextStyle.padding = "20px 25px"
        TextStyle.borderRadius = "14px"
    }

    return (
        <div style={MainStyle}
            className={styles.wrapper}>
            <div style={TextStyle}
                 className={styles.container}>
                {children}
            </div>
        </div>
    )
}