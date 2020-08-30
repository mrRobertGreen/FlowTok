import {combineReducers} from "redux";
import authReducer from "./auth/auth-reducer";
import userReducer from "./user/user-reducer";
import appReducer from "./app/app-reducer";

const createRootReducer = () => combineReducers({
   auth: authReducer,
   user: userReducer,
   app: appReducer,
})

export default createRootReducer