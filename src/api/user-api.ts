import {BaseDataType, BaseResponseType, instance} from "./api";
import {
   AdvProfileDataType,
   AdvTaskStatusType,
   AdvTaskType,
   BlogProfileDataType,
   BlogTaskStatusType,
   BlogTaskType
} from "../redux/user-reducer";
import {WithdrawTypes} from "../pages/Withdraw_m/Withdraw_m";

export const userApi = {
   getUserData() {
      return instance.get<BaseResponseType<UserDataType>>("/users/user/profile").then(res => res.data)
   },
   getBlogTasks(taskStatus: BlogTaskStatusType) {
      return instance.get<BaseResponseType<BlogTasksType>>(`/tasks/type/${taskStatus}`).then(res => res.data)
   },
   addAdvTask(advTask: AdvCreateTaskType) {
      return instance.post<BaseResponseType<AdvTaskType>>(`/tasks/new`, {...advTask}).then(res => res.data)
   },
   changeAdvTaskStatus(taskId: string, taskStatus: AdvTaskStatusType) {
      return instance.put<BaseResponseType<AdvTaskType>>(`/tasks/${taskId}/status/${taskStatus}`).then(res => res.data)
   },
   getRef() {
      return instance.get<BaseResponseType<RefDataType>>(`/users/user/ref`).then(res => res.data)
   },
   doBlogTask(taskId: string) {
      return instance.put<BaseResponseType<ChangeBlogTaskDataType>>(`/tasks/${taskId}/wait`).then(res => res.data)
   },
   checkBlogTask(taskId: string, videoLink: string) {
      return instance.put<BaseResponseType<ChangeBlogTaskDataType>>(`/tasks/${taskId}/check`, {videoLink}).then(res => res.data)
   },
   withdraw(payload: WithdrawPayloadType) {
      return instance.put<BaseResponseType<BaseDataType>>(`/pay/get`, payload).then(res => res.data)
   },
};

export type UserDataType = AdvProfileDataType | BlogProfileDataType
export type BlogTasksType = BaseDataType & Array<BlogTaskType>
export type AdvCreateTaskType = {
   title: string
   info: string
   link: string
   value: number
   quantity: number
   quality: number
}
export type RefDataType = {
   link: string
   value: number
   refs: number
   messageNotification?: string
}
export type ChangeBlogTaskDataType = {
   message: string
   messageNotification?:  string
}
export type WithdrawPayloadType = {
   money: number
   type: WithdrawTypes
   purse: string
}