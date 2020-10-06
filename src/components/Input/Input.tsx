import React, {FC, HTMLProps} from 'react';
import styles from "./styles.module.scss"
import classNames from "classnames";
import {FormikErrors} from "formik";
import MaskedInput, {MaskedInputProps} from "react-text-mask";
import {WithdrawTypes, withdrawTypes} from "../../pages/Withdraw_m/Withdraw_m";


type PropsType = {
   isError?: boolean
   mod?: "active" | "blue" | "grey" | "white"
   errorMessage?: string | Array<string> | FormikErrors<any> | Array<FormikErrors<any>>
}

export const  Input: FC<PropsType & HTMLProps<HTMLInputElement>> = ({
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
               [styles.blue]: mod === "blue",
               [styles.active]: mod === "active",
               [styles.grey]: mod === "grey",
               [styles.white]: mod === "white",
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

type SwitchPropsT = {
   isLabel: boolean
}

export const ToggleSwitch:FC<SwitchPropsT & HTMLProps<HTMLInputElement>> = ({isLabel, ...rest}) => {
   return (
      <div className={styles.switchWrap}>
         <input
            className={styles.checkbox}
            type="checkbox"
            id="switch"
            {...rest}
         />
         <label
            className={styles.label}
            htmlFor="switch"
         >
            <span className={styles.switchBtn} />
         </label>
         {isLabel && <div className={styles.switchLabel}>
	         +1.00 ₽
         </div>}
      </div>
   )
}

export const ChooseSex: FC<PropsType & HTMLProps<HTMLInputElement>> = ({
                                                                           isError,
                                                                           mod,
                                                                           ...rest
                                                                        }) => {
   return (
      <div className={styles.wrapper}>
         <label htmlFor="">
            <input
               {...rest}
               type={"radio"}
               className={classNames(styles.input, {
                  [styles.error]: isError,
                  [styles.blue]: mod === "blue"
               })}
            />
            Мужской
         </label>

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