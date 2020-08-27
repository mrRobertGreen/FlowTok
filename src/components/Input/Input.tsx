import React, {FC, HTMLProps} from 'react';
import styles from "./styles.module.scss"
import classNames from "classnames";
import {FormikErrors} from "formik";
import MaskedInput, {MaskedInputProps} from "react-text-mask";
import {WithdrawTypes, withdrawTypes} from "../../pages/Withdraw_m/Withdraw_m";


type PropsType = {
   isError?: boolean
   mod?: "blue"
   errorMessage?: string | Array<string> | FormikErrors<any> | Array<FormikErrors<any>>
}

export const Input: FC<PropsType & HTMLProps<HTMLInputElement>> = ({
                                                                      isError,
                                                                      mod,
                                                                      errorMessage,
                                                                      ...rest
                                                                   }) => {
   return (
      <div className={styles.wrapper}>
         <input
            {...rest}
            className={classNames(styles.input, {
               [styles.error]: isError,
               [styles.blue]: mod === "blue"
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
type InputWithMaskPropsType = {
   withdrawType: WithdrawTypes
   mod?: "blue"
   isError?: boolean
   errorMessage?: string | Array<string> | FormikErrors<any> | Array<FormikErrors<any>>
}

export const InputWithMask: FC<InputWithMaskPropsType & MaskedInputProps> = ({
                                                                                withdrawType,
                                                                                mod,
                                                                                isError,
                                                                                errorMessage,
                                                                                ...rest
                                                                             }) => {
   return (
      <div className={styles.wrapper}>
         <MaskedInput
            mask={withdrawTypes[withdrawType].mask as Array<RegExp | string>}
            className={classNames(styles.input, {
               [styles.error]: isError,
               [styles.blue]: mod === "blue"
            })}
            {...rest}
         />
         <div className={styles.errorMsg}
              style={{visibility: `${isError ? "visible" : "hidden"}` as "hidden" | "visible"}}
         >
            {errorMessage ? errorMessage : "hidden"}
         </div>
      </div>
   )
}