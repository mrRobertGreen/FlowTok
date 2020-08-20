import {BaseThunkType, InferActionsType} from "./store";
import {getUserData} from "./user-reducer";


const initialState = {
   isError: false,
   isFetching: false,
   isInit: false
}
export type InitialStateType = typeof initialState

export default function appReducer(state = initialState, action: ActionsType): InitialStateType {
   switch (action.type) {
      case "app/TOGGLE_IS_ERROR":
         return {
            ...state,
            isError: action.isError
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
      case "app/CLEAR":
         return {
            ...state,
            isFetching: false,
            isInit: false,
            isError: false
         }
      default:
         return state
   }
}

export const appActions = {
   toggleIsError: (isError: boolean) => ({type: "app/TOGGLE_IS_ERROR", isError} as const),
   toggleIsFetching: (isFetching: boolean) => ({type: "app/TOGGLE_IS_FETCHING", isFetching} as const),
   toggleIsInit: (isInit: boolean) => ({type: "app/TOGGLE_IS_INTI", isInit} as const),
   clear: () => ({type: "app/CLEAR"} as const),
}

export const initialize = (): ThunkType => { // initialization of app
   return async (dispatch) => {
      if (localStorage.getItem("token")) {
         // try to get user profile data with cached token
         await dispatch(getUserData())
      }
      dispatch(appActions.toggleIsInit(true)) // initialization finished
   }
}

type ActionsType = InferActionsType<typeof appActions>
type ThunkType = BaseThunkType
