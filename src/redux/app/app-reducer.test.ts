import appReducer, {appActions, InitialStateType} from "./app-reducer";

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
describe("app-reducer", () => {
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
})

