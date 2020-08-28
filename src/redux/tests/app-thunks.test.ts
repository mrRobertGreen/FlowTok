import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {appActions, initialize, InitialStateType} from "../app-reducer";
import {getUserData} from "../user-reducer";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);


describe("Test App Thunks", () => {
   let initialState: InitialStateType
   let store: any;
   beforeEach(() => {
      store = mockStore(initialState);
   });
   afterEach(() => {
      localStorage.setItem("token", "")
   });

   it("shouldn't be initialize without token", async (done) => {
      localStorage.setItem("token", "")

      const expectedActions = [appActions.toggleIsInit(true)];

      await store.dispatch(initialize())
      done()

      const actualAction = store.getActions();
      expect(actualAction).toEqual(expectedActions);

   });
})


const dispatchMock = jest.fn()
const getStateMock = jest.fn()

beforeEach(() => {
   dispatchMock.mockClear()
   getStateMock.mockClear()
})

test("shouldn't be initialize without token", async () => {
   localStorage.setItem("token", "")

   const thunk = initialize()
   await thunk(dispatchMock, getStateMock, {})

   expect(dispatchMock).toBeCalledTimes(1)
   expect(dispatchMock).toHaveBeenNthCalledWith(1, appActions.toggleIsInit(true))
})
