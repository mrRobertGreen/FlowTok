import axios, {AxiosRequestConfig} from "axios";

export const instance = axios.create({
   baseURL: "http://45.84.225.122:3002/api/v1",
   headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*"
   }
});

// middleware which add Auth Token to every request
instance.interceptors.request.use(
   (config: AxiosRequestConfig) => {
      return {
         ...config,
         headers: {
            ...config.headers,
            "Authorization": `Bearer ${localStorage.getItem("token")}`
         }
      }
   }
)

export type BaseResponseType<D> = {
   success: boolean
   data: D
   error?: ErrorType
}

export type BaseDataType = {
   messageNotification?: string
   telegram?: string
}
export type ErrorType = {
   message: string
   name?: string
   messageNotification?: string
   telegram?: string
}