import {AuthMeReqDataType} from "../api/auth-api";

export const createAuthReqBody = (googleId: string = "", vkCode: string = ""): AuthMeReqDataType => {
   const ref = localStorage.getItem("ref") // get ref link

   // create authMe request body
   let reqBody: AuthMeReqDataType = {}

   if (ref) {
      reqBody.ref = ref
   }
   if (googleId) {
      reqBody.auth = googleId
   } else if (vkCode) {
      reqBody.vkCode = vkCode
   }
   return reqBody
}