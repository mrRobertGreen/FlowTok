import {BaseDataType, BaseResponseType} from "../api/api";
import {appActions} from "../redux/app/app-reducer";
import {Dispatch} from "react";

export const checkMessageNotification = (data: BaseResponseType<BaseDataType>, dispatch: Dispatch<any>) => {
   // searches for and displays possible message notifications from the api
   if (data.error && data.error.notification) {
      dispatch(appActions.setError(data.error.notification))
   }
   if (data.data && data.data.notification) {
      dispatch(appActions.setNotification(data.data.notification))
   }
}