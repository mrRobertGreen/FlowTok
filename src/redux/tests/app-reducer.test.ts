import appReducer, {appActions, initialize, InitialStateType} from "../app-reducer";

import {userApi} from "../../api/user-api";
import {BaseResponseType} from "../../api/api";
import {BlogProfileDataType, getUserData} from "../user-reducer";


// --- reducers ---
let initialState: InitialStateType
beforeEach(() => {
   initialState = {
      notification: null,
      isFetching: false,
      isInit: false,
      error: null,
      isDesktop: false
   }
})
test("toggleIsInit works correctly", () => {
   const newState = appReducer(initialState, appActions.toggleIsInit(true))
   expect(newState.isInit).toBeTruthy()
})
test("toggleIsFetching works correctly", () => {
   const newState = appReducer(initialState, appActions.toggleIsFetching(true))
   expect(newState.isFetching).toBeTruthy()
})
test("setIsDesktop works correctly", () => {
   const newState = appReducer(initialState, appActions.setIsDesktop(true))
   expect(newState.isDesktop).toBeTruthy()
})
test("setNotification works correctly", () => {
   const newState = appReducer(initialState, appActions.setNotification("message"))
   expect(newState.notification).toBe("message")
})
test("setError works correctly", () => {
   const newState = appReducer(initialState, appActions.setError("error"))
   expect(newState.error).toBe("error")
})
test("clear works correctly", () => {
   const newState = appReducer(initialState, appActions.clear())
   expect(newState.error).toBe(null)
   expect(newState.notification).toBe(null)
   expect(newState.isFetching).toBeFalsy()
   expect(newState.isInit).toBeFalsy()
   expect(newState.isDesktop).toBeFalsy()
})

// --- thunks ---
const dispatchMock = jest.fn()
const getStateMock = jest.fn()

beforeEach(() => {
   dispatchMock.mockClear()
   getStateMock.mockClear()
})

jest.mock("../../api/user-api")
const userApiMock = userApi as jest.Mocked<typeof userApi>

test("should be initialize with token and success blogProfile", async () => {
   localStorage.setItem("token", "123")
   // const store = mockStore({})
   const thunk = initialize()
   await thunk(dispatchMock, getStateMock, {})

   // expect(store.getActions())
})

test("should be initialize with token and success blogProfile", async () => {
   localStorage.setItem("token", "123")

   const thunk = initialize()
   await thunk(dispatchMock, getStateMock, {})

   const thunk_2 = getUserData()

   expect(dispatchMock).toBeCalledTimes(2)
   expect(dispatchMock.mock.calls[0]).toBe(thunk_2)
   // expect(dispatchMock).toHaveBeenNthCalledWith(1, getUserData())
   // expect(dispatchMock).toHaveBeenNthCalledWith(2, appActions.toggleIsInit(true))

})
