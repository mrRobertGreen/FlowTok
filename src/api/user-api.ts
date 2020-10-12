import {BaseDataType, BaseResponseType, instance, NotificationT} from "./api";
import {WithdrawTypes} from "../pages/Withdraw_m/Withdraw_m";

export const userApi = {
   getUserData() {
      return instance.get<BaseResponseType<UserDataType>>("/users/user/profile").then(res => res.data)
   },
   getContainers() {
      return instance.get<BaseResponseType<GetContainersResDataT>>(`/containers`).then(res => res.data)
   },
   buyContainer(body: BuyContainerReqBodyT) {
      return instance.post<BaseResponseType<GetContainersResDataT>>(`/containers/buy`, body).then(res => res.data)
   },
   transfer() {
      return instance.get<BaseResponseType<UserDataType>>(`/users/user/transfer`).then(res => res.data)
   },
   getStats() {
      return instance.get<BaseResponseType<StatsType>>(`/users/stat`).then(res => res.data)
   },
   getUsersCount() {
      return instance.get<BaseResponseType<{ quantity: number }>>(`/users/user/quantity`).then(res => res.data)
   },
   getHistory() {
      return instance.get<BaseResponseType<Array<HistoryItemT>>>(`/users/user/history`).then(res => res.data)
   },
   getGift() {
      return instance.post<BaseResponseType<GetGiftResT>>(`/users/user/gift/get`).then(res => res.data)
   },
   closeGift() {
      return instance.post<BaseResponseType<{ gift: false }>>(`/users/user/gift/close`).then(res => res.data)
   },
};

// types
export type UserDataType = {
   userName: string
   wallet: number
   allTimeMoney: UserMoneyT
   allDayMoney: {
      now: {
         small: number
         large: number
         refrigerator: number
      }
      still: {
         small: number
         large: number
         refrigerator: number
      }
   }
   bank?: number
   containers: Array<ContainerObjT>
   referral: ReferralT
   notification?: NotificationT
   gift: boolean
   history?: Array<HistoryItemT>
}
export type GetGiftResT = {
   wallet: number
   notification?: NotificationT
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
   type: string
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
   min: number
}
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