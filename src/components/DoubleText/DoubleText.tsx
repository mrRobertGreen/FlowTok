import React, {FC} from "react";
import styles from "./styles.module.scss";

type PropsT = {
    FirstChildren: string,
    SecondChildren: string,
    pt: string,
    pb: string,
}

export const DoubleText: FC<PropsT> = ({
                                           FirstChildren,
                                           SecondChildren,
                                           pt,
                                           pb,
                                       }) => {
    let Style = {
        paddingTop: "0",
        paddingBottom: "0"
    }
    if (pb) {
        Style.paddingBottom = pb;
    }
    if (pt) {
        Style.paddingTop = pt;
    }

    return (
        <div style={Style}>
            <p className={styles.first}>{FirstChildren}</p>
            <p className={styles.second}>{SecondChildren}</p>
        </div>
    )
}