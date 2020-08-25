import {BaseDataType, BaseResponseType} from "../api/api";
import {appActions} from "../redux/app-reducer";
import {Dispatch} from "react";

export const checkMessageNotification = (data: BaseResponseType<BaseDataType>, dispatch: Dispatch<any>) => {
   // searches for and displays possible message notifications from the api
   if (data.error && data.error.messageNotification) {
      dispatch(appActions.setError(data.error.messageNotification))
      if (data.error && data.error.telegram) {
         // eslint-disable-next-line no-restricted-globals
         let confirmResult = confirm("Подключить Telegram бота, чтобы получать новые задания?")
         if (confirmResult) {
            window.location.href = data.error.telegram
         }
      }
   } else {
      if (data.error && data.error.telegram) {
         // eslint-disable-next-line no-restricted-globals
         let confirmResult = confirm("Подключить Telegram бота, чтобы получать новые задания?")
         if (confirmResult) {
            window.location.href = data.error.telegram
         }
      }
   }
   if (data.data && data.data.messageNotification) {
      dispatch(appActions.setNotification(data.data.messageNotification))
      if (data.data && data.data.telegram) {
         // eslint-disable-next-line no-restricted-globals
         let confirmResult = confirm("Подключить Telegram бота, чтобы получать новые задания?")
         if (confirmResult) {
            window.location.href = data.data.telegram
         }
      }
   } else {
      if (data.data && data.data.telegram) {
         // eslint-disable-next-line no-restricted-globals
         let confirmResult = confirm("Подключить Telegram бота, чтобы получать новые задания?")
         if (confirmResult) {
            window.location.href = data.data.telegram
         }
      }
   }

}