import {BaseDataType, BaseResponseType} from "../api/api";

export const checkMessageNotification = (data: BaseResponseType<BaseDataType>) => {
   // searches for and displays possible message notifications from the api
   if (data.error && data.error.messageNotification) {
      alert(data.error.messageNotification)
   }
   if (data.data && data.data.messageNotification) {
      alert(data.data.messageNotification)
   }
}