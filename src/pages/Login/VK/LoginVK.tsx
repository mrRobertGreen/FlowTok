import React, {FC, useEffect, useState} from "react";
import styles from "../../Login_m/FirstStep/styles.module.scss";
import Button from "../../../components/Button/Button";
import {extractVkCode} from "../../../utils/extractVkCode";
import {useHistory} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../../redux/store";

export const LoginVK: FC = () => {
   const history = useHistory()
   const dispatch = useDispatch()
   const redirectUri = history.location.pathname
   const onVkButtonClick = () => { // call vk api which return us vk code in "search" from url
      // const vkApiPath = "https://oauth.vk.com/authorize?client_id=7565076&display=popup&redirect_uri=https://flowtok.com/login/1&response_type=code"
      const vkApiPath = `https://oauth.vk.com/authorize?client_id=7565076&display=popup&redirect_uri=https://localhost:3000${redirectUri}&response_type=code`
      document.location.href = vkApiPath
   }
   const [buttonSuccess, setButtonSuccess] = useState(false)
   const loginSuccess = useSelector((state: RootStateType) => state.auth.loginSuccess)

   useEffect(() => { // check "search" in url - part of url which is after "?"
      if (history.location.search) {
         let vkCode = extractVkCode(history.location.search) // get vk code from "search"
         history.push(redirectUri)
      }
   }, [history.location.search, dispatch, history, redirectUri]) // depends on history.location.search

   if (loginSuccess && !buttonSuccess) return <></>

   return (
      <Button onClick={onVkButtonClick} mod={"VK"} isActive={buttonSuccess}>
         Войти через VK
      </Button>
   )
}