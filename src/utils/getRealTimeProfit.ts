export const getRealTimeProfit = (allSum: number, everySecSum: number) => {
   const secs = getSecondsToday()
   return (allSum - everySecSum * (DAY_SECONDS - secs)).toFixed(2)
}

export const _getRealTimeProfit = (allSum: number, everySecSum: number) => {
   const secs = getSecondsToday()
   return (allSum - everySecSum * (DAY_SECONDS - secs)).toFixed(2)
}

export const DAY_SECONDS = 86400

export function getSecondsToday() {
   let date = new Date();
   return date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds();
}