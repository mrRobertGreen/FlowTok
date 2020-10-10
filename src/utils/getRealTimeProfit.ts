export const DAY_SECONDS = 86400

export function getSecondsToday() {
   let date = new Date();
   return date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds();
}