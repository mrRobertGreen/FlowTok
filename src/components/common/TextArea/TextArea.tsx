import {FormikErrors} from "formik";
import React, {FC, HTMLProps} from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";

type PropsT = {
   isError?: boolean
   mod?: "active"
   errorMessage?: string | Array<string> | FormikErrors<any> | Array<FormikErrors<any>>
}

export const TextArea: FC<PropsT & HTMLProps<HTMLTextAreaElement>> = ({
                                                                         isError,
                                                                         errorMessage,
                                                                         mod,
                                                                         ...rest
                                                                      }) => {
   return (
      <div className={styles.wrapper}>
         <textarea
            {...rest}
            className={classNames(styles.textarea, {
               [styles.error]: isError,
               [styles.active]: mod === "active",
            })}
         />
         <div className={styles.errorMsg}
              style={{display: `${isError ? "block" : "none"}` as "block" | "none"}}
         >
            {errorMessage ? errorMessage : null}
         </div>
      </div>

   )
}
