import {BaseThunkType, InferActionsType, Nullable} from "../store";
import {
   AdvCreateTaskType,
   BlogTasksType,
   RefDataType, StatsType,
   userApi,
   UserDataType, VerifyPayloadType,
   WithdrawPayloadType
} from "../../api/user-api";
import {Dispatch} from "react";
import {authActions, exit} from "../auth/auth-reducer";
import {isBlog} from "../../utils/detectUserRole";
import {checkMessageNotification} from "../../utils/checkMessageNotification";
import {appActions} from "../app/app-reducer";
import {commonThunkHandler} from "../../utils/commonThunkHandler";
import {Action} from "redux";

// userReducer is responsible for main user's information (profile, tasks)

const initialState = {
   blogProfile: null as BlogProfileDataType | null,
   advProfile: null as AdvProfileDataType | null,
   blogNewTasks: null as BlogTasksType | null,
   blogDoneTasks: null as BlogTasksType | null,
   refData: null as RefDataType | null,
   task: null as null | BlogTaskType,
   isAdvTaskCreated: false,
   stats: null as null | StatsType,
   isVerify: false
}

export default function userReducer(state = initialState, action: ActionsType): InitialStateType {
   switch (action.type) {
      case "user/SET_BLOG_PROFILE":
         return {
            ...state,
            blogProfile: action.payload
         }
      case "user/SET_ADV_PROFILE":
         return {
            ...state,
            advProfile: action.payload
         }
      case "user/SET_BLOG_DONE_TASKS":
         return {
            ...state,
            blogDoneTasks: action.payload
         }
      case "user/SET_BLOG_NEW_TASKS":
         return {
            ...state,
            blogNewTasks: action.payload
         }
      case "user/SET_REF_DATA":
         return {
            ...state,
            refData: action.payload
         }
      case "user/SET_IS_ADV_TASK_CREATED":
         return {
            ...state,
            isAdvTaskCreated: action.flag
         }
      case "user/CHANGE_ADV_TASK":
         // replace adv task with action.task.id by action.task
         if (state.advProfile) {
            let copyAdvTasks = [...state.advProfile.tasks]
            copyAdvTasks = copyAdvTasks.map(t => {
               if (t.id === action.task.id) {
                  return action.task
               }
               return t
            })
            return {
               ...state,
               advProfile: {
                  ...state.advProfile,
                  tasks: copyAdvTasks
               }
            }
         }
         return state
      case "user/CREATE_ADV_TASK":
         if (state.advProfile) {
            let copyAdvTasks = [...state.advProfile.tasks]
            copyAdvTasks.unshift(action.task)
            return {
               ...state,
               advProfile: {
                  ...state.advProfile,
                  tasks: copyAdvTasks
               }
            }
         }
         return state
      case "user/SET_TASK":
         return {
            ...state,
            task: action.task
         }
      case "user/SET_STATS":
         return {
            ...state,
            stats: action.stats
         }
      case "user/SET_IS_VERIFY":
         return {
            ...state,
            isVerify: action.isVerify
         }
      case "user/CLEAR":
         return {
            ...state,
            blogDoneTasks: null,
            blogNewTasks: null,
            isAdvTaskCreated: false,
            refData: null,
            advProfile: null,
            blogProfile: null,
            task: null,
            stats: null,
         }
      default:
         return state
   }
}

export const userActions = {
   setBlogProfile: (payload: BlogProfileDataType) => ({type: "user/SET_BLOG_PROFILE", payload} as const),
   setAdvProfile: (payload: AdvProfileDataType) => ({type: "user/SET_ADV_PROFILE", payload} as const),
   setBlogNewTasks: (payload: BlogTasksType) => ({type: "user/SET_BLOG_NEW_TASKS", payload} as const),
   setBlogDoneTasks: (payload: BlogTasksType) => ({type: "user/SET_BLOG_DONE_TASKS", payload} as const),
   setRefData: (payload: RefDataType) => ({type: "user/SET_REF_DATA", payload} as const),
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
            setUserData(data.data, dispatch)
            // detectUserRole(data.data, dispatch)
            if (isBlog(data.data)) {
               if (data.data.task) {
                  dispatch(userActions.setTask(data.data.task))
               }
            }
            // after all i can say, that user is authenticated
            dispatch(authActions.setIsAuth(true))
         } else if (data.error) {
            // exit app
            await dispatch(exit())
         }
         checkMessageNotification(data, dispatch)
      }, dispatch)
   }
}
export const setUserData = (userData: UserDataType, dispatch: Dispatch<Action>) => {
   // set user data correctly
   if (isBlog(userData)) {
      dispatch(userActions.setBlogProfile(userData))
      dispatch(authActions.setUserRole("Blogger"))
      localStorage.setItem("blogProfile", JSON.stringify(userData))
   } else {
      dispatch(userActions.setAdvProfile(userData))
      dispatch(authActions.setUserRole("Advertiser"))
      localStorage.setItem("advProfile", JSON.stringify(userData))
   }
}
export const getBlogTasks = (taskStatus: BlogTaskStatusType): ThunkType => {
   return async (dispatch) => {
      // get tasks for blogger
      const data = await userApi.getBlogTasks(taskStatus)
      if (data.success) {
         switch (taskStatus) {
            case "done":
               localStorage.setItem("blogDoneTasks", JSON.stringify(data.data))
               dispatch(userActions.setBlogDoneTasks(data.data))
               return
            case "new":
               dispatch(userActions.setBlogNewTasks(data.data))
               return
         }
      }
      checkMessageNotification(data, dispatch)
   }
}
export const getRefData = (): ThunkType => {
   return async (dispatch, getState) => {
      // get ref data for blogger
      await commonThunkHandler(async () => {
         if (getState().auth.role === "Blogger") {
            const data = await userApi.getRef()
            if (data.success) {
               dispatch(userActions.setRefData(data.data))
            }
            checkMessageNotification(data, dispatch)
         }
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
export const createAdvTask = (task: AdvCreateTaskType): ThunkType => {
   // create new advertiser's task
   return async (dispatch) => {
      dispatch(appActions.toggleIsFetching(true))
      const data = await userApi.addAdvTask(task)
      if (data.success) {
         dispatch(userActions.createAdvTask(data.data))
         dispatch(userActions.setIsAdvTaskCreated(true))
         await dispatch(getUserData())
      }
      dispatch(appActions.toggleIsFetching(false))
      checkMessageNotification(data, dispatch)
   }
}
export const changeAdvTaskStatus = (taskId: string, taskStatus: AdvTaskStatusType): ThunkType => {
   // change advertiser's task status (play | pause)
   return async (dispatch) => {
      const data = await userApi.changeAdvTaskStatus(taskId, taskStatus)
      if (data.success) {
         dispatch(userActions.changeAdvTask(data.data))
      }
      checkMessageNotification(data, dispatch)
   }
}
export const doBlogTask = (taskId: string): ThunkType => {
   // start doing task
   return async (dispatch) => {
      dispatch(appActions.toggleIsFetching(true))
      const data = await userApi.doBlogTask(taskId)
      if (data.success) {
         await dispatch(getUserData())
      }
      dispatch(appActions.toggleIsFetching(false))
      checkMessageNotification(data, dispatch)
   }
}
export const cancelBlogTask = (taskId: string): ThunkType => {
   // cancel blogger's task and set new tasks
   return async (dispatch) => {
      dispatch(appActions.toggleIsFetching(true))
      const data = await userApi.cancelBlogTask(taskId)
      if (data.success) {
         dispatch(userActions.setBlogNewTasks(data.data))
         dispatch(userActions.setTask(null))
         dispatch(appActions.setNotification("Вы успешно отменили задание"))
      } else {
         dispatch(appActions.setError("Что-то пошло не так, попробуйте снова"))
      }
      dispatch(appActions.toggleIsFetching(false))
   }
}
export const checkBlogTask = (taskId: string): ThunkType => {
   // send blogger's task to done section
   return async (dispatch) => {
      dispatch(appActions.toggleIsFetching(true))
      const data = await userApi.checkBlogTask(taskId)
      if (data.success) {
         await dispatch(getUserData())
         dispatch(userActions.setTask(null))
      }
      dispatch(appActions.toggleIsFetching(false))
      checkMessageNotification(data, dispatch)
   }
}
export const withdraw = (payload: WithdrawPayloadType): ThunkType => {
   // send blogger's task to done section
   return async (dispatch) => {
      dispatch(appActions.toggleIsFetching(true))
      const data = await userApi.withdraw(payload)
      if (data.success) {
         appActions.setNotification("Операция успешно завершена")
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
         dispatch(appActions.setNotification("Вы успешно пополнили бюджет кампании!"))
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
   messageNotification?: string
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
   messageNotification?: string
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
   messageNotification?: string
   task?: BlogTaskType
}
export type BlogTaskType = {
   id: string
   title: string
   info: string
   rate: number
   messageNotification?: string
   link?: string
   url?: string
   text?: string
}
export type BlogTaskStatusType = "new" | "done"
export type AdvTaskStatusType = "play" | "pause"