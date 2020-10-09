import {BaseThunkType, InferActionsType, Nullable} from "../store";
import {
   AdvCreateTaskType,
   BlogTasksType, BuyContainerReqBodyT, GetContainersResDataT,
   RefDataType,
   StatsType,
   userApi,
   UserDataType,
   VerifyPayloadType,
   WithdrawPayloadType
} from "../../api/user-api";
import {authActions, exit} from "../auth/auth-reducer";
import {checkMessageNotification} from "../../utils/checkMessageNotification";
import {appActions} from "../app/app-reducer";
import {commonThunkHandler} from "../../utils/commonThunkHandler";
import {NotificationT} from "../../api/api";

// userReducer is responsible for main user's information

const initialState = {
   userData: null as UserDataType | null,
   containers: null as GetContainersResDataT | null,
   containerType: "small" as ContainerT,
   everySecAllMoney: 0,
   refData: null as RefDataType | null,
   task: null as null | BlogTaskType,
   isAdvTaskCreated: false,
   stats: null as null | StatsType,
   isVerify: false
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
      case "user/SET_EVERY_SEC_ALL_MONEY":
         return {
            ...state,
            everySecAllMoney: action.value
         }
      case "user/CLEAR":
         return {
            ...state,
            isAdvTaskCreated: false,
            refData: null,
            task: null,
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
   setEverySecAllMoney: (value: number) => ({type: "user/SET_EVERY_SEC_ALL_MONEY", value} as const),
   changeAdvTask: (task: AdvTaskType) => ({type: "user/CHANGE_ADV_TASK", task} as const),
   createAdvTask: (task: AdvTaskType) => ({type: "user/CREATE_ADV_TASK", task} as const),
   setIsAdvTaskCreated: (flag: boolean) => ({type: "user/SET_IS_ADV_TASK_CREATED", flag} as const),
   clear: () => ({type: "user/CLEAR"} as const),
   setTask: (task: BlogTaskType | null) => ({type: "user/SET_TASK", task} as const),
   setStats: (stats: StatsType | null) => ({type: "user/SET_STATS", stats} as const),
   setVerify: (isVerify: boolean) => ({type: "user/SET_IS_VERIFY", isVerify} as const),
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
export const getStatsData = (): ThunkType => {
   return async (dispatch) => {
      await commonThunkHandler(async () => {
         // get admin stats
         const data = await userApi.getStats()
         if (data.success) {
            dispatch(userActions.setStats(data.data))
         }
         checkMessageNotification(data, dispatch)
      }, dispatch)
   }
}
export const withdraw = (payload: WithdrawPayloadType): ThunkType => {
   // send blogger's task to done section
   return async (dispatch) => {
      dispatch(appActions.toggleIsFetching(true))
      const data = await userApi.withdraw(payload)
      if (data.success) {
         appActions.setNotification({
            message: "Операция успешно завершена",
            title: "Поздравляем!"
         })
      }
      dispatch(appActions.toggleIsFetching(false))
      checkMessageNotification(data, dispatch)
   }
}
export const pushTaskBalance = (money: number, taskId: string): ThunkType => {
   // add money to blogger's task balance
   return async (dispatch) => {
      dispatch(appActions.toggleIsFetching(true))
      const data = await userApi.pushTaskBalance(money, taskId)
      if (data.success) {
         dispatch(appActions.setNotification({
            message: "Вы успешно пополнили бюджет кампании!",
            title: "Поздравляем!"
         }))
         await dispatch(getUserData())
      }
      dispatch(appActions.toggleIsFetching(false))
      checkMessageNotification(data, dispatch)
   }
}
export const verifyMe = (payload: VerifyPayloadType, handleReset: () => void, push: (link: string) => void): ThunkType => {
   // send verification data to api server
   return async (dispatch) => {
      dispatch(appActions.toggleIsFetching(true))
      const data = await userApi.verifyMe(payload)
      if (data.success) {
         handleReset()
         dispatch(userActions.setVerify(true))
         push("/profile")
      }
      dispatch(appActions.toggleIsFetching(false))
      checkMessageNotification(data, dispatch)
   }
}

type ThunkType = BaseThunkType
export type InitialStateType = typeof initialState
type ActionsType = InferActionsType<typeof userActions>
export type AdvProfileDataType = {
   value: number
   tasks: Array<AdvTaskType>
   admin: boolean
   type: "ad"
   notification?: NotificationT
}
export type AdvTaskType = {
   id: string
   title: string
   info: string
   value: number
   clips: number
   reposts: string
   views: string
   likes: string
   min: string
   max: string
   state: "play" | "pause"
   notification?: NotificationT
}
export type BlogProfileDataType = {
   rate: number
   name: string
   login: string
   image: string
   fans: string
   heart: string
   medianViews: string
   valueUp: number
   valueDown: number
   holdUp: number
   holdDown: number
   rating: number
   type: "blog"
   admin: boolean
   isOffer: boolean
   needVerification: boolean
   usersForMoney: number
   newTask: Nullable<number>
   notification?: NotificationT
   task?: BlogTaskType
}
export type BlogTaskType = {
   id: string
   title: string
   info: string
   rate: number
   notification?: NotificationT
   link?: string
   url?: string
   text?: string
   isActive?: boolean
}
export type ContainerT = "small" | "large" | "refrigerator"
export type AdvTaskStatusType = "play" | "pause"