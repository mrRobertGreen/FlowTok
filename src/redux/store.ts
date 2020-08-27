import {Action, createStore, applyMiddleware, compose} from "redux";
import {ThunkAction} from "redux-thunk";
import createRootReducer from './reducers'
import thunkMiddleware from "redux-thunk"


const rootReducer = createRootReducer()

//@ts-ignore
// composeEnhancers = compose for redux devtools
const composeEnhancers = (process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

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

