import {BaseDataType, BaseResponseType} from "../api/api";
import {appActions} from "../redux/app/app-reducer";
import {Dispatch} from "react";

export const checkMessageNotification = (res: BaseResponseType<BaseDataType>, dispatch: Dispatch<any>) => {
   // searches for and displays possible message notifications from the api
   if (res.error && res.error.notification) {
      dispatch(appActions.setError(res.error.notification))
   }
   if (res.data && res.data.notification) {
      dispatch(appActions.setNotification(res.data.notification))
   }
}