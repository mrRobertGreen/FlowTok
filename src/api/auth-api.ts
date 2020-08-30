import {BaseResponseType, instance} from "./api";
import {AdvProfileDataType, BlogProfileDataType} from "../redux/user/user-reducer";


export const authApi = {
   authMe(body: AuthMeReqDataType) {
      return instance.post<BaseResponseType<AuthMeResDataType>>("/users/new", {...body}).then(res => res.data)
   },
   setTikTokProfile(tikTokUrl: string) {
      return instance.post<BaseResponseType<BlogProfileDataType>>("/profile", {url: tikTokUrl}).then(res => res.data)
   },
   setAdv() {
      return instance.post<BaseResponseType<AdvProfileDataType>>("/users/user/ad").then(res => res.data)
   },

};

type AuthMeResDataType = {
   token: string
   isNew: boolean
   messageNotification?: string
}
export type AuthMeReqDataType = {
   auth?: string
   vkCode?: string
   ref?: string
}

