import {BaseDataType, BaseResponseType} from "../api/api";

export const checkMessageNotification = (data: BaseResponseType<BaseDataType>) => {
   // searches for and displays possible message notifications from the api
   if (data.error && data.error.messageNotification) {
      alert(data.error.messageNotification)
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
      alert(data.data.messageNotification)
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