import {BlogTasksType, RefDataType, StatsType} from "../../api/user-api";
import userReducer, {
   AdvProfileDataType,
   AdvTaskType,
   BlogProfileDataType,
   BlogTaskType,
   InitialStateType,
   userActions
} from "./user-reducer";

describe("user-reducer", () => {
   let initialState: InitialStateType;
   beforeEach(() => {
      initialState = {
         blogProfile: null as BlogProfileDataType | null,
         advProfile: null as AdvProfileDataType | null,
         blogNewTasks: null as BlogTasksType | null,
         blogDoneTasks: null as BlogTasksType | null,
         refData: null as RefDataType | null,
         task: null as null | BlogTaskType,
         isAdvTaskCreated: false,
         stats: null as null | StatsType
      }
   })

   test("setStats works correctly", () => {
      const stats: StatsType = [
         {
            name: "name1",
            value: "value1",
         },
         {
            name: "name2",
            value: "value2",
         },
         {
            name: "name3",
            value: "value3",
         },
      ]
      const newState = userReducer(initialState, userActions.setStats(stats))
      expect(newState.stats).toEqual(stats)
   })
   test("setTask works correctly", () => {
      const task: BlogTaskType = {
         text: "text",
         url: "http://link.com",
         title: "title",
         rate: 12,
         messageNotification: "msg",
         link: "link",
         info: "info",
         id: "1234qwer"
      }
      const newState = userReducer(initialState, userActions.setTask(task))
      expect(newState.task).toEqual(task)
   })
   test("setBlogNewTasks works correctly", () => {
      const tasks: BlogTasksType = [
         {
            text: "text",
            url: "http://link.com",
            title: "title",
            rate: 12,
            messageNotification: "msg",
            link: "link",
            info: "info",
            id: "1234qwer"
         },
         {
            text: "text123",
            url: "http://link.com123",
            title: "title123",
            rate: 1213,
            messageNotification: "msg123",
            link: "link123",
            info: "info123",
            id: "1234qwer123"
         },
      ]
      const newState = userReducer(initialState, userActions.setBlogNewTasks(tasks))
      expect(newState.blogNewTasks).toEqual(tasks)
   })
   test("setIsAdvTaskCreated works correctly", () => {
      const newState = userReducer(initialState, userActions.setIsAdvTaskCreated(true))
      expect(newState.isAdvTaskCreated).toBeTruthy()
   })
   test("setRefData works correctly", () => {
      const data: RefDataType = {
         refs: 123,
         link: "link",
         messageNotification: "msg",
         value: 123,
      }
      const newState = userReducer(initialState, userActions.setRefData(data))
      expect(newState.refData).toEqual(data)
   })
   test("createAdvTask works correctly", () => {
      const task: AdvTaskType = {
         id: "fgsdg",
         state: "pause",
         views: "234",
         reposts: "3",
         likes: "23",
         info: "sdf",
         clips: 3,
         title: "re",
         value: 23,
         max: "12",
         min: "3",
         messageNotification: "msg"
      }
      const tasks: Array<AdvTaskType> = [
         {
            id: "fgqwesdg",
            state: "play",
            views: "sa",
            reposts: "323",
            likes: "2233",
            info: "sd23f",
            clips: 2,
            title: "re",
            value: 23,
            max: "192",
            min: "3",
            messageNotification: "mssdfg"
         },
      ]
      initialState = {
         ...initialState, advProfile: {
            tasks: [...tasks],
            messageNotification: "msg",
            admin: false,
            type: "ad",
            value: 23,
         }
      }
      const newState = userReducer(initialState, userActions.createAdvTask(task))
      expect(newState.advProfile?.tasks[0]).toEqual(task)
   })
   test("setAdvProfile works correctly", () => {
      const profile: AdvProfileDataType = {
         tasks: [],
         messageNotification: "msg",
         admin: false,
         type: "ad",
         value: 23,
      }
      const newState = userReducer(initialState, userActions.setAdvProfile(profile))
      expect(newState.advProfile).toEqual(profile)
   })
   test("setBlogProfile works correctly", () => {
      const profile: BlogProfileDataType = {
         isOffer: false,
         newTask: null,
         admin: true,
         holdDown: 32,
         holdUp: 3,
         valueUp: 23,
         valueDown: 233,
         type: "blog",
         fans: "3",
         heart: "3",
         rating: 3,
         rate: 1,
         name: "sfs",
         medianViews: "2",
         login: "@23zsdfz",
         image: "jsdf",
         messageNotification: "msg",
         usersForMoney: 23,
      }
      const newState = userReducer(initialState, userActions.setBlogProfile(profile))
      expect(newState.blogProfile).toEqual(profile)
   })
   test("setBlogDoneTasks works correctly", () => {
      const tasks: BlogTasksType = [
         {
            id: "23",
            info: "sdfg",
            link: "link",
            messageNotification: "sdf",
            rate: 43,
            title: "23"
         }
      ]
      const newState = userReducer(initialState, userActions.setBlogDoneTasks(tasks))
      expect(newState.blogDoneTasks).toEqual(tasks)
   })
   test("changeAdvTask works correctly", () => {
      const task: AdvTaskType = {
         id: "1",
         state: "play",
         views: "23434",
         reposts: "3",
         likes: "23",
         info: "sdtrf",
         clips: 3,
         title: "rre",
         value: 23,
         max: "142",
         min: "3",
         messageNotification: "msg"
      }
      const tasks: Array<AdvTaskType> = [
         {
            id: "1",
            state: "pause",
            views: "sa",
            reposts: "323",
            likes: "2233",
            info: "sd23f",
            clips: 23,
            title: "re",
            value: 2323,
            max: "19232",
            min: "332",
            messageNotification: "mssfdfg"
         },
         {
            id: "2",
            state: "pause",
            views: "srfga",
            reposts: "32323",
            likes: "2233",
            info: "sd3223f",
            clips: 23,
            title: "re",
            value: 2323,
            max: "1922332",
            min: "3322",
            messageNotification: "msxcsfdfg"
         },
      ]
      initialState = {
         ...initialState, advProfile: {
            tasks: [...tasks],
            messageNotification: "mssdg",
            admin: false,
            type: "ad",
            value: 23,
         }
      }
      const newState = userReducer(initialState, userActions.changeAdvTask(task))
      expect(newState.advProfile?.tasks.filter(t => t.id === task.id)[0]).toEqual(task)
   })
   test("clear works correctly", () => {
      const newState = userReducer(initialState, userActions.clear())
      expect(newState.advProfile).toBeNull()
      expect(newState.blogProfile).toBeNull()
      expect(newState.refData).toBeNull()
      expect(newState.isAdvTaskCreated).toBeFalsy()
      expect(newState.task).toBeNull()
      expect(newState.stats).toBeNull()
      expect(newState.blogNewTasks).toBeNull()
      expect(newState.blogDoneTasks).toBeNull()
   })
})