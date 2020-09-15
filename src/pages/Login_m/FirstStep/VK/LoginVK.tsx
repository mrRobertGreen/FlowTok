import React, {FC, useEffect} from "react";
import styles from "../styles.module.scss";
import Button from "../../../../components/Button/Button";
import {goToSecondLoginStep} from "../../../../redux/auth/auth-reducer";
import {extractVkCode} from "../../../../utils/extractVkCode";
import {useHistory} from "react-router";
import {useDispatch} from "react-redux";

export const LoginVK: FC = () => {
   const history = useHistory()
   const dispatch = useDispatch()
   const onVkButtonClick = () => { // call vk api which return us vk code in "search" from url
      // const vkApiPath = "https://oauth.vk.com/authorize?client_id=7565076&display=popup&redirect_uri=https://flowtok.com/login/1&response_type=code"
      const vkApiPath = "https://oauth.vk.com/authorize?client_id=7565076&display=popup&redirect_uri=https://localhost:3000/login/1&response_type=code"
      document.location.href = vkApiPath
   }

   useEffect(() => { // check "search" in url - part of url which is after ?
      if (history.location.search) {
         let vkCode = extractVkCode(history.location.search) // get vk code from "search"
         if (vkCode) {
            dispatch(goToSecondLoginStep("", vkCode))
         }
         history.push("login/1")
      }
   }, [history.location.search, dispatch, history]) // depends on history.location.search

   return (
      <div className={styles.btn}>
         <Button onClick={onVkButtonClick}>
            ВКонтакте
         </Button>
      </div>
   )
}