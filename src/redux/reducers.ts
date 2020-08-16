import {combineReducers} from "redux";
import authReducer from "./auth-reducer";
import userReducer from "./user-reducer";
import appReducer from "./app-reducer";

const createRootReducer = () => combineReducers({
   auth: authReducer,
   user: userReducer,
   app: appReducer,
})

export default createRootReducer