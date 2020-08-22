import {UserDataType} from "../api/user-api";
import {Dispatch} from "react";
import {Action} from "redux";
import {authActions} from "../redux/auth-reducer";

export const detectUserRole = (userData: UserDataType, dispatch: Dispatch<Action>) => {
   if (userData.type === "blog") {
      dispatch(authActions.setUserRole("Blogger"))
      return "Blogger"
   } else {
      dispatch(authActions.setUserRole("Advertiser"))
      return "Advertiser"
   }
}