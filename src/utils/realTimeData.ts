export const DAY_SECONDS = 86400

export function getSecondsToday() {
   let date = new Date();
   return date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds();
}

export const round = function(number: number, digits: number) {
   return +number.toFixed(digits);
}
export const smartRound = function(number: number) {
   // если число больше 6 знаков, то обрезаем его
   // number = Math.abs(number)
   if (String(Math.abs(number)).length > 6) {
      switch (true) {
         case Math.abs(number) >= 10000: return round(number, 1)
         case Math.abs(number) >= 1000: return round(number, 2)
         case Math.abs(number) >= 100: return round(number, 3)
         case Math.abs(number) >= 10: return round(number, 4)
         default: return round(number, 5)
      }
   }
   else return number

}

export const getRealTimeProfit = (everySecMoney: number) => {
   // кол-во денег за прошедший день в данную секунду
   return everySecMoney * getSecondsToday()
}

export const getEverySecMoney = (stillDayMoney: number) => {
   // количество денег в секунду
   return stillDayMoney / (DAY_SECONDS - getSecondsToday())
}

export const getAllTimeMoney = (nowDayMoney: number, realTimeProfit: number, allTimeMoneyOld: number) => {
   // кол-во денег за все время
   return allTimeMoneyOld + (realTimeProfit - nowDayMoney)
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
   return nowStart + random
}