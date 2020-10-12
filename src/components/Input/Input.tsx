import React, {FC, HTMLProps, useRef} from 'react';
import styles from "./styles.module.scss"
import classNames from "classnames";
import {FormikErrors} from "formik";
import MaskedInput, {MaskedInputProps} from "react-text-mask";
import {WithdrawTypes, withdrawTypes} from "../../pages/Withdraw_m/Withdraw_m";
import {CyT, LangT} from "../../redux/app/app-reducer";


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
   isLabel?: boolean
   changeLang?: (lang: LangT) => void
   changeCy?: (cy: CyT) => void
}


export const ChooseLang:FC<SwitchPropsT & HTMLProps<HTMLInputElement>> = ({ changeLang, ...rest}) => {

   const togglerLang = useRef<HTMLInputElement>(null)

   const onChangeLang = () => {
      if (togglerLang.current && changeLang) {
         if (togglerLang.current.checked) changeLang("ru")
         else changeLang("en")
      }
   }

   return (
      <div className={styles.switchWrapLang} onChange={onChangeLang}>
         <div className={styles.lang}>
            EN
         </div>
         <input
            className={styles.checkbox}
            type="checkbox"
            id="switch-lang"
            ref={togglerLang}
            {...rest}
         />
         <label
            className={styles.label}
            htmlFor="switch-lang"
         >
            <span className={styles.switchBtn} />
         </label>
         <div className={styles.lang}>
            RU
         </div>
      </div>
   )
}

export const ChooseCy:FC<SwitchPropsT & HTMLProps<HTMLInputElement>> = ({ changeCy, ...rest}) => {

   const togglerCy = useRef<HTMLInputElement>(null)

   const onChangeCy = () => {
      if (togglerCy.current && changeCy) {
         if (togglerCy.current.checked) changeCy("RUB")
         else changeCy("USD")
      }
   }

   return (
      <div className={styles.switchWrapLang} onChange={onChangeCy}>
         <div className={styles.lang}>
            USD
         </div>
         <input
            className={styles.checkbox}
            type="checkbox"
            id="switch-cy"
            ref={togglerCy}
            {...rest}
         />
         <label
            className={styles.label}
            htmlFor="switch-cy"
         >
            <span className={styles.switchBtn} />
         </label>
         <div className={styles.lang}>
            RUB
         </div>
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