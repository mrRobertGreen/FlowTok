import appReducer, {appActions, initialize, InitialStateType} from "../app-reducer";
import {userApi} from "../../api/user-api";
import {BaseResponseType} from "../../api/api";
import {BlogProfileDataType, userActions} from "../user-reducer";
import {authActions} from "../auth-reducer";

// --- reducers ---
let initialState: InitialStateType
beforeEach(() => {
   initialState = {
      isError: false,
      isFetching: false,
      isInit: false
   }
})
test("toggleIsError work correctly", () => {
   const newState = appReducer(initialState, appActions.toggleIsError(true))
   expect(newState.isError).toBeTruthy()
})
test("toggleIsInit work correctly", () => {
   const newState = appReducer(initialState, appActions.toggleIsInit(true))
   expect(newState.isInit).toBeTruthy()
})
test("toggleIsFetching work correctly", () => {
   const newState = appReducer(initialState, appActions.toggleIsFetching(true))
   expect(newState.isFetching).toBeTruthy()
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
   const successBlogProfile: BaseResponseType<BlogProfileDataType> = {
      data: {
         image: "",
         login: "",
         medianViews: "",
         messageNotification: "msg",
         name: "sd",
         newTask: 3,
         rate: 32,
         rating: 2,
         heart: "4",
         fans: "43",
         tiktok: true,
         type: "blog",
         valueDown: 43,
         valueUp: 32,
      },
      success: true
   }
   userApiMock.getUserData.mockReturnValue(Promise.resolve(successBlogProfile))

   const thunk = initialize()
   await thunk(dispatchMock, getStateMock, {})

   expect(dispatchMock).toBeCalledTimes(4)
   expect(dispatchMock).toHaveBeenNthCalledWith(1, authActions.setUserRole("Blogger"))
   expect(dispatchMock).toHaveBeenNthCalledWith(2, userActions.setBlogProfile(successBlogProfile.data))
   expect(dispatchMock).toHaveBeenNthCalledWith(3, authActions.setIsAuth(true))
   expect(dispatchMock).toHaveBeenNthCalledWith(4, appActions.toggleIsInit(true))

})
test("shouldn't be initialize without token", async () => {
   localStorage.setItem("token", "")

   const thunk = initialize()
   await thunk(dispatchMock, getStateMock, {})

   expect(dispatchMock).toBeCalledTimes(0)
})

test("", () => {

})