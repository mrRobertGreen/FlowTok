import {BaseThunkType, InferActionsType} from "../store";
import {
   BuyContainerReqBodyT,
   GetContainersResDataT,
   RefDataType,
   StatsType,
   userApi,
   UserDataType
} from "../../api/user-api";
import {authActions, exit} from "../auth/auth-reducer";
import {checkMessageNotification} from "../../utils/checkMessageNotification";
import {appActions} from "../app/app-reducer";
import {commonThunkHandler} from "../../utils/commonThunkHandler";

// userReducer is responsible for main user's information

const initialState = {
   userData: null as UserDataType | null,
   containers: null as GetContainersResDataT | null,
   containerType: "small" as ContainerT,
   bank: 0,
   refData: null as RefDataType | null,
   isAdvTaskCreated: false,
   stats: null as null | StatsType,
   isVerify: false,
   userStats: {quantity: 0},
}

export default function userReducer(state = initialState, action: ActionsType): InitialStateType {
   switch (action.type) {
      case "user/SET_USER_DATA":
         return {
            ...state,
            userData: action.payload
         }
      case "user/SET_CONTAINERS":
         return {
            ...state,
            containers: action.payload
         }
      case "user/SET_CONTAINER_TYPE":
         return {
            ...state,
            containerType: action.payload
         }
      case "user/SET_BANK":
         return {
            ...state,
            bank: action.bank
         }
      case "user/SET_USER_STATS":
         return {
            ...state,
            userStats: action.data
         }
      case "user/CLEAR":
         return {
            ...state,
            isAdvTaskCreated: false,
            refData: null,
            stats: null,
         }
      default:
         return state
   }
}

export const userActions = {
   setUserData: (payload: UserDataType) => ({type: "user/SET_USER_DATA", payload} as const),
   setContainers: (payload: GetContainersResDataT) => ({type: "user/SET_CONTAINERS", payload} as const),
   setContainerType: (payload: ContainerT) => ({type: "user/SET_CONTAINER_TYPE", payload} as const),
   setBank: (bank: number) => ({type: "user/SET_BANK", bank} as const),
   clear: () => ({type: "user/CLEAR"} as const),
   setUserStats: (data: {quantity: number}) => ({type: "user/SET_USER_STATS", data} as const),
}

export const getUserData = (): ThunkType => { // getting and setting user data
   return async (dispatch) => {
      await commonThunkHandler(async () => {
         // this thunk is called only if there is a token
         const data = await userApi.getUserData()
         if (data.success) { // if token is true
            dispatch(userActions.setUserData(data.data))
            await localStorage.setItem("userData", JSON.stringify(data.data))
            // after this i can say, that user is authenticated
            dispatch(authActions.setIsAuth(true))
         } else if (data.error && data.error.name === "no_user") {
            // exit app
            dispatch(appActions.setError("Для начала авторизируйтесь!"))
         } else {
            await dispatch(exit())
         }
         checkMessageNotification(data, dispatch)
      }, dispatch)
   }
}
export const getUsersCount = (): ThunkType => { // getting and setting user data
   return async (dispatch) => {
      await commonThunkHandler(async () => {
         const res = await userApi.getUsersCount()
         if (res.success) {
            dispatch(userActions.setUserStats(res.data))
         }
      }, dispatch)
   }
}

export const getContainers = (): ThunkType => {
   return async (dispatch, getState) => {
      // get ref data for blogger
      await commonThunkHandler(async () => {

         const data = await userApi.getContainers()
         if (data.success) {
            localStorage.setItem("containers", JSON.stringify(data.data))
            dispatch(userActions.setContainers(data.data))
         }
         checkMessageNotification(data, dispatch)

      }, dispatch)
   }
}
export const buyContainer = (body: BuyContainerReqBodyT,
                             setIsLoading: (flag: boolean) => void): ThunkType => {
   return async (dispatch, getState) => {
      // get ref data for blogger
      await commonThunkHandler(async () => {
         setIsLoading(true)
         const res = await userApi.buyContainer(body)

         if (res.success) {
            dispatch(userActions.setContainers(res.data))
         }
         setIsLoading(false)
         checkMessageNotification(res, dispatch)
      }, dispatch)
   }
}
export const transfer = (setIsLoading: (flag: boolean) => void): ThunkType => {
   return async (dispatch, getState) => {
      // get ref data for blogger
      await commonThunkHandler(async () => {
         setIsLoading(true)
         const res = await userApi.transfer()

         if (res.success) {
            dispatch(userActions.setUserData(res.data))
         }
         setIsLoading(false)
         checkMessageNotification(res, dispatch)
      }, dispatch)
   }
}

type ThunkType = BaseThunkType
export type InitialStateType = typeof initialState
type ActionsType = InferActionsType<typeof userActions>
export type BankT = {
   restDayBank: number
   realTimeBank: number
}
export type ContainerT = "small" | "large" | "refrigerator"