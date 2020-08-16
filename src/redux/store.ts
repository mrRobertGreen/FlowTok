import {Action, applyMiddleware, compose, createStore} from "redux";
import thunkMiddleware, {ThunkAction} from "redux-thunk";
import createRootReducer from './reducers'


const rootReducer = createRootReducer()

//@ts-ignore
// composeEnhancers = compose for redux devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
   rootReducer, // root reducer with router state
   composeEnhancers(
      applyMiddleware(
         thunkMiddleware,
      ),
   ),
)
export default store

export type RootStateType = ReturnType<typeof rootReducer>

// InferActionsType return type of actions from type of object storing action creators
export type InferActionsType<T> = T extends { [key: string]: (...args: any) => infer U } ? U : never

export type Nullable<T> = null | T

export type BaseThunkType<A extends Action = Action, R = Promise<void>> = ThunkAction<R, RootStateType, unknown, A>

