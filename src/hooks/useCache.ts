export const useCache = (dataName: CashedDataNames) => {
   switch (dataName) {
      case "userData":
         const userDataCache = localStorage.getItem("userData")
         if (userDataCache) return JSON.parse(userDataCache)
         break
      case "containers":
         const containersCache = localStorage.getItem("containers")
         if (containersCache) return JSON.parse(containersCache)
         break
      default:
         return undefined
   }
}

export type CashedDataNames = "userData" | "containers"