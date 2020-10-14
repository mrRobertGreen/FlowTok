import {BaseDataType, BaseResponseType, instance, NotificationT} from "./api";
import {WithdrawTypes} from "../pages/Withdraw_m/Withdraw_m";
import {CyT, LangT} from "../redux/app/app-reducer";

export const userApi = {
   getUserData(body: BaseBodyT) {
      return instance.post<BaseResponseType<UserDataType>>("/users/user/profile", body).then(res => res.data)
   },
   getContainers(body: BaseBodyT) {
      return instance.post<BaseResponseType<GetContainersResDataT>>(`/containers`, body).then(res => res.data)
   },
   buyContainer(body: BuyContainerReqBodyT) {
      return instance.post<BaseResponseType<GetContainersResDataT>>(`/containers/buy`, body).then(res => res.data)
   },
   transfer(body: BaseBodyT) {
      return instance.post<BaseResponseType<UserDataType>>(`/users/user/transfer`, body).then(res => res.data)
   },
   getStats(body: BaseBodyT) {
      return instance.post<BaseResponseType<StatsType>>(`/users/stat`, body).then(res => res.data)
   },
   getTickets(body: BaseBodyT) {
      return instance.post<BaseResponseType<Array<TicketT>>>(`/ticket/all`, body).then(res => res.data)
   },
   createTicket(body: CreateTicketReqBodyT) {
      return instance.post<BaseResponseType<Array<TicketT>>>(`/ticket/new`, body).then(res => res.data)
   },
   getTicketMessages(body: {ticketId: string}) {
      return instance.post<BaseResponseType<Array<MessageT>>>(`/ticket/messages/all`, body).then(res => res.data)
   },
   sendTicketMessage(body: SendTicketMessageReqBodyT) {
      return instance.post<BaseResponseType<Array<MessageT>>>(`/ticket/messages/new`, body).then(res => res.data)
   },
   getUsersCount(body: BaseBodyT) {
      return instance.post<BaseResponseType<{ quantity: number }>>(`/users/user/quantity`, body).then(res => res.data)
   },
   getHistory(body: BaseBodyT) {
      return instance.post<BaseResponseType<Array<HistoryItemT>>>(`/users/user/history`, body).then(res => res.data)
   },
   getGift(body: BaseBodyT) {
      return instance.post<BaseResponseType<GetGiftResT>>(`/users/user/gift/get`, body).then(res => res.data)
   },
   closeGift(body: BaseBodyT) {
      return instance.post<BaseResponseType<{ gift: false }>>(`/users/user/gift/close`, body).then(res => res.data)
   },
};

// types
export type CreateTicketReqBodyT = {
   topic: string
   text: string
}
export type SendTicketMessageReqBodyT = {
   ticketId: string
   text: string
}
export type TicketT = {
   id: string
   title: string
   status: string
   messages: number
}
export type MessageT =  {
   text: string
   who: "you" | "operator"
}
export type BaseBodyT = {
   cy: CyT
   lang: LangT
}
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
export type BuyContainerReqBodyT= {
   type: "small" | "large" | "refrigerator"
   amount: number
   date: number
} & BaseBodyT
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