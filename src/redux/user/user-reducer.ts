import {BaseThunkType, InferActionsType} from "../store";
import {
   BuyContainerReqBodyT, CreateTicketReqBodyT,
   GetContainersResDataT, HistoryItemT, MessageT,
   RefDataType, SendTicketMessageReqBodyT,
   StatsType, TicketT,
   userApi,
   UserDataType, WithdrawReqBodyT
} from "../../api/user-api";
import {authActions, exit} from "../auth/auth-reducer";
import {checkMessageNotification} from "../../utils/checkMessageNotification";
import {appActions} from "../app/app-reducer";
import {commonThunkHandler} from "../../utils/commonThunkHandler";
import {getEverySecMoney, round} from "../../utils/realTimeData";
import {getBody} from "../../utils/getBody";

// userReducer is responsible for main user's information

const initialState = {
   userData: null as UserDataType | null,
   containers: null as GetContainersResDataT | null,
   containerType: "small" as ContainerT,
   bank: 0 as number | undefined,
   refData: null as RefDataType | null,
   isAdvTaskCreated: false,
   stats: null as null | StatsType,
   isVerify: false,
   userStats: {quantity: 0},
   realMoneyData: null as null | RealMoneyDataT,
   tickets: null as null | Array<TicketT>,
   ticketMessages: null as null | Array<MessageT>,
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
      case "user/SET_TICKETS":
         return {
            ...state,
            tickets: action.payload
         }
      case "user/SET_TICKET_MESSAGES":
         return {
            ...state,
            ticketMessages: action.payload
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
   setTickets: (payload: Array<TicketT>) => ({type: "user/SET_TICKETS", payload} as const),
   setTicketMessages: (payload: Array<MessageT>) => ({type: "user/SET_TICKET_MESSAGES", payload} as const),
   setContainerType: (payload: ContainerT) => ({type: "user/SET_CONTAINER_TYPE", payload} as const),
   setBank: (bank: number | undefined) => ({type: "user/SET_BANK", bank} as const),
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
         const data = await userApi.getUserData(getBody())
         if (data.success) { // if token is true
            dispatch(userActions.setUserData(data.data))
            await localStorage.setItem("userData", JSON.stringify(data.data))
            dispatch(userActions.setBank(data.data.bank))

            const {allDayMoney, allTimeMoney} = data.data

            const realMoneyData: RealMoneyDataT = {
               everySecMoney: {
                  all: getEverySecMoney(allDayMoney.still.small + allDayMoney.still.large + allDayMoney.still.refrigerator),
                  large: getEverySecMoney(allDayMoney.still.large),
                  refrigerator: getEverySecMoney(allDayMoney.still.refrigerator),
                  small: getEverySecMoney(allDayMoney.still.small),
               },
               realAllTimeMoney: {
                  all: allTimeMoney.all,
                  large:  allTimeMoney.large,
                  refrigerator:  allTimeMoney.refrigerator,
                  small:  allTimeMoney.small,
               },
               realDayMoney: {
                  all:  allDayMoney.now.small + allDayMoney.now.large + allDayMoney.now.refrigerator,
                  large:  allDayMoney.now.large,
                  refrigerator:  allDayMoney.now.refrigerator,
                  small:  allDayMoney.now.small,
               }
            }
            dispatch(userActions.setRealMoneyData(realMoneyData))
            // after this i can say, that user is authenticated
            dispatch(authActions.setIsAuth(true))
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
         const res = await userApi.getUsersCount(getBody())
         if (res.success) {
            dispatch(userActions.setUserStats(res.data))
         }
      }, dispatch)
   }
}
export const getHistory = (): ThunkType => {
   return async (dispatch) => {
      await commonThunkHandler(async () => {
         const res = await userApi.getHistory(getBody())
         if (res.success) {
            dispatch(userActions.setHistory(res.data))

         }
      }, dispatch)
   }
}
export const getGift = (): ThunkType => {
   return async (dispatch) => {
      await commonThunkHandler(async () => {
         const res = await userApi.getGift(getBody())
         if (res.success) {
            checkMessageNotification(res, dispatch)
            dispatch(userActions.setGift(false))
            await dispatch(getUserData())
         }

      }, dispatch)
   }
}
export const closeGift = (): ThunkType => {
   return async (dispatch) => {
      await commonThunkHandler(async () => {
         const res = await userApi.closeGift(getBody())
         if (res.success) {
            dispatch(userActions.setGift(false))
         }
      }, dispatch)
   }
}
export const withdraw = (payload: WithdrawReqBodyT, closeForm?: () => void): ThunkType => {
   return async (dispatch) => {
      await commonThunkHandler(async () => {
         const res = await userApi.withdraw(payload)
         if (res.success) {
            await dispatch(getUserData())
         }
         if (closeForm) closeForm()
         checkMessageNotification(res, dispatch)
      }, dispatch)
   }
}
export const getContainers = (): ThunkType => {
   return async (dispatch, getState) => {
      await commonThunkHandler(async () => {

         const data = await userApi.getContainers(getBody())
         if (data.success) {
            localStorage.setItem("containers", JSON.stringify(data.data))
            dispatch(userActions.setContainers(data.data))
         }
         checkMessageNotification(data, dispatch)
      }, dispatch)
   }
}
export const getTickets = (): ThunkType => {
   return async (dispatch, getState) => {
      await commonThunkHandler(async () => {
         const data = await userApi.getTickets(getBody())
         if (data.success) {
            localStorage.setItem("tickets", JSON.stringify(data.data))
            dispatch(userActions.setTickets(data.data))
         }
      }, dispatch)
   }
}
export const createTicket = (payload: CreateTicketReqBodyT,
                             resetForm: () => void,
                             closeForm: () => void): ThunkType => {
   return async (dispatch, getState) => {
      await commonThunkHandler(async () => {
         const data = await userApi.createTicket(payload)
         if (data.success) {
            localStorage.setItem("tickets", JSON.stringify(data.data))
            dispatch(userActions.setTickets(data.data))
            resetForm()
            closeForm()
         }
      }, dispatch)
   }
}
export const getTicketMessages = (ticketId: string): ThunkType => {
   return async (dispatch, getState) => {
      await commonThunkHandler(async () => {
         const data = await userApi.getTicketMessages({ticketId})
         if (data.success) {
            dispatch(userActions.setTicketMessages(data.data))
         }
      }, dispatch)
   }
}
export const sendTicketMessage = (payload: SendTicketMessageReqBodyT): ThunkType => {
   return async (dispatch, getState) => {
      await commonThunkHandler(async () => {
         const data = await userApi.sendTicketMessage(payload)
         if (data.success) {
            dispatch(userActions.setTicketMessages(data.data))
         }
      }, dispatch)
   }
}
export const buyContainer = (body: BuyContainerReqBodyT,
                             setIsLoading: (flag: boolean) => void): ThunkType => {
   return async (dispatch, getState) => {
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
      await commonThunkHandler(async () => {
         setIsLoading(true)
         const res = await userApi.transfer(getBody())

         if (res.success) {
            dispatch(userActions.setUserData(res.data))
            await localStorage.setItem("userData", JSON.stringify(res.data))
            dispatch(userActions.setBank(res.data.bank))
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