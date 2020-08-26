import {Dispatch} from "react";
import {appActions} from "../redux/app-reducer";

export const commonThunkHandler = async (operation: any, dispatch: Dispatch<any>) => {
   try {
      dispatch(appActions.toggleIsFetching(true))
      await operation()
      dispatch(appActions.toggleIsFetching(false))
   } catch (error) {
      dispatch(appActions.setError(error.message))
   }
}