export const useCache = (dataName: CashedDataNames) => {
   switch (dataName) {
      case "blogProfile":
         const blogProfileCache = localStorage.getItem("blogProfile")
         if (blogProfileCache) return JSON.parse(blogProfileCache)
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

export type CashedDataNames = "blogProfile" | "blogDoneTasks" | "advProfile"