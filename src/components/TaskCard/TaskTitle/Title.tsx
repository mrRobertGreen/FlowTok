import React, {FC} from "react";
import styles from "./styles.module.scss";

type PropsT = {
    mod?: "big" | "middle" | "small"
}

// export const Title: FC<PropsT> = ({
//                                     mod
//                                     children
//                                   }) => {
//     let Style = {}
//     return (
//
//         <div style={Style}
//             className={styles.wrapper}>
//             {children}
//         </div>
//     )
// }
