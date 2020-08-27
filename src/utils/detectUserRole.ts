import {UserDataType} from "../api/user-api";
import {AdvProfileDataType, BlogProfileDataType} from "../redux/user-reducer";

export function isBlog(user: UserDataType): user is BlogProfileDataType {
   return user.type === "blog";
}
export function isAdv(user: UserDataType): user is AdvProfileDataType {
   return user.type === "ad";
}