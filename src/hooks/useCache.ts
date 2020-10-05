export const useCache = (dataName: CashedDataNames) => {
   switch (dataName) {
      case "userData":
         const userDataCache = localStorage.getItem("userData")
         if (userDataCache) return JSON.parse(userDataCache)
         break
      case "advProfile":
         const advProfileCache = localStorage.getItem("advProfile")
         if (advProfileCache) return JSON.parse(advProfileCache)
         break
      case "blogDoneTasks":
         const blogDoneTasksCache = localStorage.getItem("blogDoneTasks")
         if (blogDoneTasksCache) return JSON.parse(blogDoneTasksCache)
         break
      default:
         return undefined
   }
}

export type CashedDataNames = "userData" | "blogDoneTasks" | "advProfile"