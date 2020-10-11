import {BaseThunkType, InferActionsType} from "../store";
import {
   BuyContainerReqBodyT,
   GetContainersResDataT, HistoryItemT,
   RefDataType,
   StatsType,
   userApi,
   UserDataType
} from "../../api/user-api";
import {authActions, exit} from "../auth/auth-reducer";
import {checkMessageNotification} from "../../utils/checkMessageNotification";
import {appActions} from "../app/app-reducer";
import {commonThunkHandler} from "../../utils/commonThunkHandler";
import {getEverySecMoney, round} from "../../utils/realTimeData";

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
   realMoneyData: null as null | RealMoneyDataT
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
      case "user/SET_HISTORY":
         if (state.userData) {
            return {
               ...state,
               userData: {
                  ...state.userData,
                  history: [...action.history]
               }
            }
         } else {
            return {
               ...state,
            }
         }
      case "user/SET_GIFT":
         if (state.userData) {
            return {
               ...state,
               userData: {
                  ...state.userData,
                  gift: action.gift
               }
            }
         } else {
            return {
               ...state,
            }
         }
      case "user/SET_WALLET":
         if (state.userData) {
            return {
               ...state,
               userData: {
                  ...state.userData,
                  wallet: action.wallet
               }
            }
         } else {
            return {
               ...state,
            }
         }
      case "user/SET_USER_STATS":
         return {
            ...state,
            userStats: action.data
         }
      case "user/SET_REAL_MONEY_DATA":
         return {
            ...state,
            realMoneyData: action.data
         }
      case "user/CLEAR":
         return {
            ...state,
            refData: null,
            stats: null,
            containers: null,
            bank: 0,
            userData: null,
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
   setGift: (gift: boolean) => ({type: "user/SET_GIFT", gift} as const),
   setWallet: (wallet: number) => ({type: "user/SET_WALLET", wallet} as const),
   setHistory: (history: Array<HistoryItemT>) => ({type: "user/SET_HISTORY", history} as const),
   clear: () => ({type: "user/CLEAR"} as const),
   setUserStats: (data: {quantity: number}) => ({type: "user/SET_USER_STATS", data} as const),
   setRealMoneyData: (data: RealMoneyDataT) => ({type: "user/SET_REAL_MONEY_DATA", data} as const),
}

export const getUserData = (): ThunkType => { // getting and setting user data
   return async (dispatch) => {
      await commonThunkHandler(async () => {
         // this thunk is called only if there is a token
         const data = await userApi.getUserData()
         if (data.success) { // if token is true
            dispatch(userActions.setUserData(data.data))
            await localStorage.setItem("userData", JSON.stringify(data.data))

            const {allDayMoney, allTimeMoney} = data.data

            const realMoneyData: RealMoneyDataT = {
               everySecMoney: {
                  all: getEverySecMoney(allDayMoney.still.small + allDayMoney.still.large + allDayMoney.still.refrigerator),
                  large: getEverySecMoney(allDayMoney.still.large),
                  refrigerator: getEverySecMoney(allDayMoney.still.refrigerator),
                  small: getEverySecMoney(allDayMoney.still.small),
               },
               realAllTimeMoney: {
                  all: round(allTimeMoney.all, 3),
                  large:  round(allTimeMoney.large, 3),
                  refrigerator:  round(allTimeMoney.refrigerator, 3),
                  small:  round(allTimeMoney.small, 3)
               },
               realDayMoney: {
                  all:  round(allDayMoney.now.small + allDayMoney.now.large + allDayMoney.now.refrigerator, 3),
                  large:  round(allDayMoney.now.large, 3),
                  refrigerator:  round(allDayMoney.now.refrigerator, 3),
                  small:  round(allDayMoney.now.small, 3)
               }
            }
            dispatch(userActions.setRealMoneyData(realMoneyData))
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
export const getUsersCount = (): ThunkType => {
   return async (dispatch) => {
      await commonThunkHandler(async () => {
         const res = await userApi.getUsersCount()
         if (res.success) {
            dispatch(userActions.setUserStats(res.data))
         }
      }, dispatch)
   }
}
export const getHistory = (): ThunkType => {
   return async (dispatch) => {
      await commonThunkHandler(async () => {
         const res = await userApi.getHistory()
         if (res.success) {
            dispatch(userActions.setHistory(res.data))
         }
      }, dispatch)
   }
}
export const getGift = (): ThunkType => {
   return async (dispatch) => {
      await commonThunkHandler(async () => {
         const res = await userApi.getGift()
         if (res.success) {
            dispatch(userActions.setGift(false))
            dispatch(userActions.setWallet(res.data.wallet))
         }
         checkMessageNotification(res, dispatch)
      }, dispatch)
   }
}
export const closeGift = (): ThunkType => {
   return async (dispatch) => {
      await commonThunkHandler(async () => {
         const res = await userApi.closeGift()
         if (res.success) {
            dispatch(userActions.setGift(false))
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
export type RealMoneyDataT = {
   everySecMoney: {
      small: number
      large: number
      refrigerator: number
      all: number
   }
   realDayMoney: {
      small: number
      large: number
      refrigerator: number
      all: number
   }
   realAllTimeMoney: {
      small: number
      large: number
      refrigerator: number
      all: number
   }
}