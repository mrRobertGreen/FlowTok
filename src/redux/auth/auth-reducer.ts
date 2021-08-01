import {BaseThunkType, InferActionsType} from "../store";
import {authApi, AuthMeReqDataType} from "../../api/auth-api";
import {getUserData, userActions} from "../user/user-reducer";
import {checkMessageNotification} from "../../utils/checkMessageNotification";
import {appActions, initialize} from "../app/app-reducer";
import {tikTokUrlParser} from "../../utils/tikTokUrlParser";

const initialState = {
   isNew: false,
   isAuth: false,
   role: "Nobody" as UserRolesType,
   firstSuccess: false,
   secondSuccess: false,
   isAdv: false
}
const authReducer = (state = initialState, action: ActionsType): InitialStateType => {
   switch (action.type) {
      case "auth/SET_IS_NEW":
         return {
            ...state,
            isNew: action.isNew
         }
      case "auth/SET_IS_AUTH":
         return {
            ...state,
            isAuth: action.isAuth
         }
      case "auth/SET_IS_ADV":
         return {
            ...state,
            isAdv: action.isAdv
         }
      case "auth/SET_USER_ROLE":
         return {
            ...state,
            role: action.role
         }
      case "auth/SET_FIRST_SUCCESS":
         return {
            ...state,
            firstSuccess: action.success
         }
      case "auth/SET_SECOND_SUCCESS":
         return {
            ...state,
            secondSuccess: action.success
         }
      case "auth/CLEAR":
         return {
            ...state,
            role: "Nobody",
            secondSuccess: false,
            firstSuccess: false,
            isAuth: false,
            isNew: false,
         }
      default:
         return state
   }
}
export default authReducer

export const authActions = {
   setIsNew: (isNew: boolean) => ({type: "auth/SET_IS_NEW", isNew} as const),
   setIsAuth: (isAuth: boolean) => ({type: "auth/SET_IS_AUTH", isAuth} as const),
   setIsAdv: (isAdv: boolean) => ({type: "auth/SET_IS_ADV", isAdv} as const),
   setUserRole: (role: UserRolesType) => ({type: "auth/SET_USER_ROLE", role} as const),
   setFirstSuccess: (success: boolean) => ({type: "auth/SET_FIRST_SUCCESS", success} as const),
   setSecondSuccess: (success: boolean) => ({type: "auth/SET_SECOND_SUCCESS", success} as const),
   clear: () => ({type: "auth/CLEAR"} as const),
}

export const callbackVk = () => {
   const vkApiPath = "https://oauth.vk.com/authorize?client_id=7565076&display=popup&redirect_uri=https://flowtok.com/login/1&response_type=code"
   document.location.href = vkApiPath
}

export const goToSecondLoginStep = (auth: string = "", vkCode: string = "",): ThunkType => {
   return async (dispatch, getState) => {
      if (localStorage.getItem("token")) { // if token already received do nothing
         return
      }

      const ref = localStorage.getItem("ref") // get ref link

      // create authMe request body
      let reqBody: AuthMeReqDataType = {}

      if (ref) {
         reqBody.ref = ref
      }
      if (auth) {
         reqBody.auth = auth
      } else if (vkCode) {
         reqBody.vkCode = vkCode
      }

      dispatch(appActions.toggleIsFetching(true))

      // if we have auth key we send this else we send vkCode
      const data = await authApi.authMe(reqBody)

      if (data.success) {
         // if token received set it
         localStorage.setItem("token", data.data.token)
         // dispatch flag isNew
         dispatch(authActions.setIsNew(data.data.isNew))
         if (!data.data.isNew) {
            // if user already registered (isNew === false) try to get and set user data
            await dispatch(getUserData())
            // if getting and setting data is successful authorization finished
         } else {
            // if user is new continue registration
            dispatch(authActions.setFirstSuccess(true))
            // it's temporary, because we turn off advertiser
            if (getState().auth.isAdv) {
               await dispatch(goToThirdLoginStep("Advertiser"))
            } else {
               await dispatch(goToThirdLoginStep("Blogger"))
            }
         }
      } else {
         await dispatch(exit())
      }
      dispatch(appActions.toggleIsFetching(false))
      checkMessageNotification(data, dispatch)
   }
}

export const goToThirdLoginStep = (role: UserRolesType): ThunkType => {
   return async (dispatch, getState) => {
      if (role === "Advertiser") {
         dispatch(appActions.toggleIsFetching(true))
         dispatch(authActions.setUserRole("Advertiser"))
         // say to server that user is advertiser and in response we get user data (advProfile)
         const data = await authApi.setAdv()
         if (data.success) {
            // if we get advProfile set data and finish authorization
            dispatch(userActions.setAdvProfile(data.data))
            dispatch(authActions.setIsAuth(true))
         } else {
            await dispatch(exit())
         }
         dispatch(appActions.toggleIsFetching(false))
         checkMessageNotification(data, dispatch)
      } else if (role === "Blogger") {
         // we need to continue authorization
         dispatch(authActions.setUserRole("Blogger"))
         dispatch(authActions.setSecondSuccess(true))
      }
   }
}

export const setTikTok = (tikTokUrl: string): ThunkType => {
   return async (dispatch) => {
      // send blogger's tiktok account link to api
      dispatch(appActions.toggleIsFetching(true))

      const data = await authApi.setTikTokProfile(tikTokUrlParser(tikTokUrl))
      if (data.success) {
         await dispatch(getUserData())
      } else {
         await dispatch(exit())
      }
      dispatch(appActions.toggleIsFetching(false))
      checkMessageNotification(data, dispatch)
   }
}

export const exit = (): ThunkType => {
   return async (dispatch) => {
      // log out and clear all
      localStorage.setItem("token", "")
      localStorage.setItem("ref", "")
      dispatch(authActions.clear())
      dispatch(userActions.clear())
      dispatch(appActions.clear())
      await dispatch(initialize())
   }
}


type ActionsType = InferActionsType<typeof authActions>
export type InitialStateType = typeof initialState
type ThunkType = BaseThunkType
export type UserRolesType = "Blogger" | "Advertiser" | "Nobody"
export type LoginStepType = 1 | 2 | 3