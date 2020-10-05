import {BaseThunkType, InferActionsType} from "../store";
import {getContainers, getUserData} from "../user/user-reducer";

const initialState = {
   isFetching: false,
   isInit: false,
   notification: null as null | string,
   error: null as null | string,
   isDesktop: false,
}
export type InitialStateType = typeof initialState

export default function appReducer(state = initialState, action: ActionsType): InitialStateType {
   switch (action.type) {
      case "app/SET_NOTIFICATION":
         return {
            ...state,
            notification: action.notification
         }
      case "app/SET_ERROR":
         return {
            ...state,
            error: action.error
         }
      case "app/TOGGLE_IS_FETCHING":
         return {
            ...state,
            isFetching: action.isFetching
         }
      case "app/TOGGLE_IS_INTI":
         return {
            ...state,
            isInit: action.isInit
         }
      case "app/SET_IS_DESKTOP":
         return {
            ...state,
            isDesktop: action.isDesktop
         }
      case "app/CLEAR":
         return {
            ...state,
            isFetching: false,
            isInit: false,
            notification: null,
            error: null,
            isDesktop: false,
         }
      default:
         return state
   }
}

export const appActions = {
   setNotification: (notification: string | null) => ({type: "app/SET_NOTIFICATION", notification} as const),
   setError: (error: string | null) => ({type: "app/SET_ERROR", error} as const),
   toggleIsFetching: (isFetching: boolean) => ({type: "app/TOGGLE_IS_FETCHING", isFetching} as const),
   toggleIsInit: (isInit: boolean) => ({type: "app/TOGGLE_IS_INTI", isInit} as const),
   setIsDesktop: (isDesktop: boolean) => ({type: "app/SET_IS_DESKTOP", isDesktop} as const),
   clear: () => ({type: "app/CLEAR"} as const),
}

export const initialize = (): ThunkType => { // initialization of app
   return async (dispatch) => {
      if (localStorage.getItem("token")) {
         // try to get user profile data with cached token
         await dispatch(getUserData())
         await dispatch(getContainers())
      }
      dispatch(appActions.toggleIsInit(true)) // initialization finished
   }
}

type ActionsType = InferActionsType<typeof appActions>
type ThunkType = BaseThunkType
