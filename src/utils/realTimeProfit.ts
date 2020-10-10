export const DAY_SECONDS = 86400

export function getSecondsToday() {
   let date = new Date();
   return date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds();
}

export const round = function(number: number, digits: number) {
   return +number.toFixed(digits);
}

export const getRealTimeProfit = (everySecMoney: number) => {
   return round((everySecMoney * getSecondsToday()), 3)
}

export const getEverySecMoney = (restDayMoney: number) => {
   return round((restDayMoney / (DAY_SECONDS - getSecondsToday())), 3)
}

export const getAllTimeMoney = (restDayMoney: number, realTimeProfit: number, allTimeMoneyOld: number) => {
   return round(allTimeMoneyOld + (realTimeProfit - restDayMoney), 2)
}

export const getOffShoreMoney = () => {

}