export const useCache = (dataName: CashedDataNames) => {
   switch (dataName) {
      case "blogProfile":
         const blogProfileCache = localStorage.getItem("blogProfile")
         if (blogProfileCache) return JSON.parse(blogProfileCache)
         break
      case "refData":
         const refDataCache = localStorage.getItem("refData")
         if (refDataCache) return JSON.parse(refDataCache)
         break
      case "blogDoneTasks":
         const blogDoneTasksCache = localStorage.getItem("blogDoneTasks")
         if (blogDoneTasksCache) return JSON.parse(blogDoneTasksCache)
         break
      default:
         return undefined
   }
}

export type CashedDataNames = "blogProfile" | "refData" | "blogDoneTasks"