import {BaseThunkType, InferActionsType, Nullable} from "./store";
import {AdvCreateTaskType, BlogTasksType, RefDataType, userApi, UserDataType} from "../api/user-api";
import {Dispatch} from "react";
import {authActions} from "./auth-reducer";
import {detectUserRole} from "../utils/detectUserRole";
import {checkMessageNotification} from "../utils/checkMessageNotification";
import {appActions} from "./app-reducer";

// userReducer is responsible for main user's information (profile, tasks)

const initialState = {
   blogProfile: null as BlogProfileDataType | null,
   advProfile: null as AdvProfileDataType | null,
   blogTasks: null as BlogTasksType | null,
   refData: null as RefDataType | null,
   isAdvTaskCreated: false
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
      case "user/SET_BLOG_TASKS":
         return {
            ...state,
            blogTasks: action.payload
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
      case "user/DELETE_BLOG_TASK":
         if (state.blogTasks) {
            return {
               ...state,
               blogTasks: [...state.blogTasks.filter(task => task.id !== action.taskId)]
            }
         }
         return state
      case "user/DELETE_ALL_BLOG_TASKS":
         return {
            ...state,
            blogTasks: null
         }
      case "user/CLEAR":
         return {
            ...state,
            blogTasks: null,
            isAdvTaskCreated: false,
            refData: null,
            advProfile: null,
            blogProfile: null
         }

      default:
         return state
   }
}

export const userActions = {
   setBlogProfile: (payload: BlogProfileDataType) => ({type: "user/SET_BLOG_PROFILE", payload} as const),
   setAdvProfile: (payload: AdvProfileDataType) => ({type: "user/SET_ADV_PROFILE", payload} as const),
   setBlogTasks: (payload: BlogTasksType) => ({type: "user/SET_BLOG_TASKS", payload} as const),
   setRefData: (payload: RefDataType) => ({type: "user/SET_REF_DATA", payload} as const),
   changeAdvTask: (task: AdvTaskType) => ({type: "user/CHANGE_ADV_TASK", task} as const),
   createAdvTask: (task: AdvTaskType) => ({type: "user/CREATE_ADV_TASK", task} as const),
   setIsAdvTaskCreated: (flag: boolean) => ({type: "user/SET_IS_ADV_TASK_CREATED", flag} as const),
   deleteBlogTask: (taskId: string) => ({type: "user/DELETE_BLOG_TASK", taskId} as const),
   deleteAllBlogTasks: () => ({type: "user/DELETE_ALL_BLOG_TASKS"} as const),
   clear: () => ({type: "user/CLEAR"} as const),
}

export const getUserData = (): ThunkType => { // getting and setting user data
   return async (dispatch) => {
      // this thunk is called only if there is a token
      const data = await userApi.getUserData()
      if (data.success) { // if token is true
         setUserData(data.data, dispatch)
         detectUserRole(data.data, dispatch)
         await dispatch(getRefData())
         // after all i can say, that user is authenticated
         dispatch(authActions.setIsAuth(true))
      } else if (data.error) {
         // delete current token
         localStorage.setItem("token", "")
         dispatch(authActions.setIsAuth(false))
         console.error("getUserData error")
      }
      checkMessageNotification(data)
   }
}
export const setUserData = (userData: UserDataType, dispatch: Dispatch<ActionsType>) => {
   // set user data correctly
   if (userData.type === "blog") {
      dispatch(userActions.setBlogProfile(userData))
   } else {
      dispatch(userActions.setAdvProfile(userData))
   }
}
export const getBlogTasks = (taskStatus: TaskStatusType): ThunkType => {
   return async (dispatch) => {
      // get tasks for blogger
      const data = await userApi.getBlogTasks(taskStatus)
      if (data.success) {
         dispatch(userActions.setBlogTasks(data.data))
      } else if (data.error) {
         console.error("getBlogTasks error")
      }
      checkMessageNotification(data)
   }
}

export const getRefData = (): ThunkType => {
   return async (dispatch, getState) => {
      // get ref data for blogger
      if (getState().auth.role === "Blogger") {
         const data = await userApi.getRef()
         if (data.success) {
            dispatch(userActions.setRefData(data.data))
         } else if (data.error) {
            console.error("getBlogTasks error")
         }
         checkMessageNotification(data)
      }
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
      } else {
         console.error("createAdvTask error")
      }
      dispatch(appActions.toggleIsFetching(false))
      checkMessageNotification(data)
   }
}
export const changeAdvTaskStatus = (taskId: string, taskStatus: AdvTaskStatusType): ThunkType => {
   // change advertiser's task status (play | pause)
   return async (dispatch) => {
      const data = await userApi.changeAdvTaskStatus(taskId, taskStatus)
      if (data.success) {
         dispatch(userActions.changeAdvTask(data.data))
      } else {
         console.error("changeTaskStatus error")
      }
      checkMessageNotification(data)
   }
}
export const doBlogTask = (taskId: string): ThunkType => {
   // change advertiser's task status (play | pause)
   return async (dispatch) => {
      const data = await userApi.doBlogTask(taskId)
      if (data.success) {
         dispatch(userActions.deleteBlogTask(taskId))
      } else {
         console.error("changeTaskStatus error")
      }
      checkMessageNotification(data)
   }
}
export const finishBlogTask = (taskId: string, videoLink: string): ThunkType => {
   // send blogger's task to finished section
   return async (dispatch) => {
      const data = await userApi.checkBlogTask(taskId, videoLink)
      if (data.success) {
         dispatch(userActions.deleteBlogTask(taskId))
      } else {
         console.error("finishBlogTask error")
      }
      checkMessageNotification(data)
   }
}

type ThunkType = BaseThunkType
type InitialStateType = typeof initialState
type ActionsType = InferActionsType<typeof userActions>
export type AdvProfileDataType = {
   value: number
   tasks: Array<AdvTaskType>
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
   rating: number
   tiktok: boolean
   type: "blog"
   newTask: Nullable<number>
   messageNotification?: string
}
export type BlogTaskType = {
   id: string
   title: string
   info: string
   rate: number
   messageNotification?: string
   link: string
}
export type TaskStatusType = "wait" | "new" | "done"
export type AdvTaskStatusType = "play" | "pause"