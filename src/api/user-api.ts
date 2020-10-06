import {BaseDataType, BaseResponseType, instance, NotificationT} from "./api";
import {AdvTaskStatusType, AdvTaskType, BlogTaskType} from "../redux/user/user-reducer";
import {WithdrawTypes} from "../pages/Withdraw_m/Withdraw_m";

export const userApi = {
   getUserData() {
      return instance.get<BaseResponseType<UserDataType>>("/users/user/profile").then(res => res.data)
   },
   getContainers() {
      return instance.get<BaseResponseType<GetContainersResDataT>>(`/containers`).then(res => res.data)
   },
   buyContainer(body: BuyContainerReqBodyT) {
      return instance.post<BaseResponseType<BuyContainerResDataT>>(`/containers/buy`, body).then(res => res.data)
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
   getStats() {
      return instance.get<BaseResponseType<StatsType>>(`/users/stat`).then(res => res.data)
   },
   doBlogTask(taskId: string) {
      return instance.put<BaseResponseType<ChangeBlogTaskDataType>>(`/tasks/${taskId}/wait`).then(res => res.data)
   },
   cancelBlogTask(taskId: string) {
      return instance.put<BaseResponseType<Array<BlogTaskType>>>(`/tasks/${taskId}/cancel`).then(res => res.data)
   },
   checkBlogTask(taskId: string) {
      return instance.put<BaseResponseType<ChangeBlogTaskDataType>>(`/tasks/${taskId}/check`).then(res => res.data)
   },
   withdraw(payload: WithdrawPayloadType) {
      return instance.put<BaseResponseType<BaseDataType>>(`/pay/get`, payload).then(res => res.data)
   },
   pushTaskBalance(money: number, taskId: string) {
      return instance.put<BaseResponseType<BaseDataType>>(`/tasks/${taskId}/money`, {money}).then(res => res.data)
   },
   verifyMe(payload: VerifyPayloadType) {
      return instance.put<BaseResponseType<BaseDataType>>(`/users/verification`, payload).then(res => res.data)
   },
};

// types
export type UserDataType = {
   wallet: number
   allTimeMoney: UserMoneyT
   dayMoney: UserMoneyT
   containers: Array<ContainerObjT>
   referral: ReferralT
   notification?: NotificationT
   history: Array<HistoryItemT>
}
export type BuyContainerReqBodyT = {
   type: "small" | "large" | "refrigerator"
   amount: number
   date: number
}
export type BuyContainerResDataT = {
   data: GetContainersResDataT
   notification?: NotificationT
}
export type HistoryItemT = {
   sign: number
   value: number
   date: string
}
export type UserMoneyT = {
   small: number
   large: number
   refrigerator: number
   all: number
}
export type ContainerObjT = {
   type: string
   image: string
   quantity: string
   need: string
}
export type ReferralT = {
   link: string
   money: number
   referrals: {
      a: number
      b: number
      c: number
      d: number
      e: number
   }
}
export type GetContainersResDataT = {
   small: {
      container: ContainerObjT
      buy: BuyContainerT
   }
   large: {
      container: ContainerObjT
      buy: BuyContainerT
   }
   refrigerator: {
      container: ContainerObjT
      buy: BuyContainerT
   }
   notification?: NotificationT
}
export type BuyContainerT = {
   cost: number
   percent: number
   wallet: number
}
export type BlogTasksType = BaseDataType & Array<BlogTaskType>
export type StatsType = BaseDataType & Array<StatItemType>
export type AdvCreateTaskType = {
   title: string
   info: string
   link: string
   value: number
   quantity: number
   quality: number
   max: number | null
   min: number | null
}
export type RefDataType = {
   link: string
   value: number
   refs: number
   notification?: NotificationT
}
export type ChangeBlogTaskDataType = {
   message: string
   notification?: NotificationT
}
export type WithdrawPayloadType = {
   money: number
   type: WithdrawTypes
   purse: string
}
export type StatItemType = {
   name: string
   value: string
}
export type VerifyPayloadType = {
   country: string
   age: number
   sex: string
   platform: string
}