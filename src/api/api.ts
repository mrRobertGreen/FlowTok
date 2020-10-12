import axios, {AxiosRequestConfig} from "axios";
import {CyT} from "../redux/app/app-reducer";

export const instance = axios.create({
   baseURL: "https://api.take-container.com/api/v1",
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
   notification?: NotificationT
   telegram?: string
}

export type NotificationT = {
   title: string
   message: string
}

export type ErrorType = {
   message: string
   name?: string
   notification?: string
   telegram?: string
}