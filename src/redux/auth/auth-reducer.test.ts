import authReducer, {authActions, InitialStateType, UserRolesType} from "./auth-reducer";


describe("auth-reducer", () => {
   let initialState:InitialStateType ;
   beforeEach(() => {
      initialState = {
         isNew: false,
         isAuth: false,
         role: "Nobody" as UserRolesType,
         firstSuccess: false,
         secondSuccess: false,
         isAdv: false,
         loginSuccess: false,
         tikTokSuccess: false,
         verifySuccess: false
      }
   })

   test("setIsAdv works correctly", () => {
      const newState = authReducer(initialState, authActions.setIsAdv(true))
      expect(newState.isAdv).toBeTruthy()
   })
   test("setSecondSuccess works correctly", () => {
      const newState = authReducer(initialState, authActions.setSecondSuccess(true))
      expect(newState.secondSuccess).toBeTruthy()
   })
   test("setIsAuth works correctly", () => {
      const newState = authReducer(initialState, authActions.setIsAuth(true))
      expect(newState.isAuth).toBeTruthy()
   })
   test("setFirstSuccess works correctly", () => {
      const newState = authReducer(initialState, authActions.setFirstSuccess(true))
      expect(newState.firstSuccess).toBeTruthy()
   })
   test("setUserRole works correctly", () => {
      const newState = authReducer(initialState, authActions.setUserRole("Blogger"))
      expect(newState.role).toBe("Blogger")
   })
   test("setIsNew works correctly", () => {
      const newState = authReducer(initialState, authActions.setIsNew(true))
      expect(newState.isNew).toBeTruthy()
   })
   test("clear works correctly", () => {
      const newState = authReducer(initialState, authActions.clear())
      expect(newState.secondSuccess).toBeFalsy()
      expect(newState.isNew).toBeFalsy()
      expect(newState.firstSuccess).toBeFalsy()
      expect(newState.isAdv).toBeFalsy()
      expect(newState.isAuth).toBeFalsy()
      expect(newState.role).toBe("Nobody")
   })
})