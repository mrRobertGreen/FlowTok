export const DAY_SECONDS = 86400

export function getSecondsToday() {
   let date = new Date();
   return date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds();
}

export const round = function(number: number, digits: number) {
   return +number.toFixed(digits);
}

export const getRealTimeProfit = (everySecMoney: number) => {
   // кол-во денег за прошедший день в данную секунду
   return round((everySecMoney * getSecondsToday()), 3)
}

export const getEverySecMoney = (stillDayMoney: number) => {
   // количество денег в секунду
   return round((stillDayMoney / (DAY_SECONDS - getSecondsToday())), 3)
}

export const getAllTimeMoney = (nowDayMoney: number, realTimeProfit: number, allTimeMoneyOld: number) => {
   // кол-во денег за все время
   return round(allTimeMoneyOld + (realTimeProfit - nowDayMoney), 2)
}

export  function getPaid() {
   let offSet = (new Date).getTimezoneOffset()
   let startTime = (1602374400000 + offSet * 60000)
   let days = Math.round((Date.now()-startTime)/(1000*60*60*24))
   let nowStart = 356893 + 21453 * days
   let secInDay = 24 * 3600
   let dt = new Date();
   let secFromStart = dt.getSeconds() + (60 * (dt.getMinutes() + (60 * dt.getHours())));
   return nowStart + Math.round(secFromStart / secInDay * 21453)
}

export function getAverage() {

   let offSet = (new Date).getTimezoneOffset()
   let startTime = (1602374400000 + offSet * 60000)// - (24 * 3600000)
   let days = Math.round((Date.now()-startTime)/(1000*60*60*24))
   let nowStart = 1578 + 256 * days
   let nowEnd = nowStart + 256
   let secInDay = 24 * 3600
   let dt = new Date();
   let secFromStart = dt.getSeconds() + (60 * (dt.getMinutes() + (60 * dt.getHours())));
   let moneyNow = Math.round(secFromStart / secInDay * 256)

   let random = (moneyNow - 100) + Math.floor(((moneyNow + 100) - (moneyNow - 100)) * Math.random());
   return random
}