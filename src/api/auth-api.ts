import {BaseResponseType, instance} from "./api";
import {AdvProfileDataType, BlogProfileDataType} from "../redux/user/user-reducer";


export const authApi = {
   authMe(body: AuthMeReqPayloadType) {
      return instance.post<BaseResponseType<AuthMeResDataType>>("/users/new", body).then(res => res.data)
   },
   sendMoreInfo(body: SendMoreInfoReqPayloadT) {
      return instance.put<BaseResponseType<SendMoreResDataT>>("/users/udata", body  ).then(res => res.data)
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
   messageNotification?: string
   needMoreInfo: boolean
}
type SendMoreResDataT = {
   token: string
   messageNotification?: string
}
export type AuthMeReqPayloadType = {
   auth: string
   password: string
   type: "u"|"f"
}
export type SendMoreInfoReqPayloadT = {
   inn: string
   ogrn: string
   name: string
}

