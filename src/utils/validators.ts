import {WithdrawTypes} from "../pages/Withdraw_m/Withdraw_m";

export const validateRequiredField = (value: string) => {
   return value.length === 0 ? "Это поле не может быть пустым" : undefined
}
export const createMinSumValidator = (minSum: number) => {
   return (value: string) => {
      return +value < minSum ? `Сумма не может быть меньше ${minSum} руб`  : undefined
   }
}
export const createMinMaxSumValidator = (minSum: number, maxSum: number) => {
   return (value: string) => {
      if (value === "") return
      if (+value < minSum) return `Сумма не может быть меньше ${minSum} руб`
      if (+value > maxSum) return `Сумма не может быть больше ${maxSum} руб`
      return
   }
}

export const createWithdrawAmountValidator = (type: WithdrawTypes) => {
   return (value: string) => {
      switch (type) {
         case "qiwi":
            if (+value < 1) {
               return "Минимальная сумма вывода - 1 руб"
            } else if (+value > 250000) {
               return "Максимальная сумма вывода - 250 000 руб"
            }
            return
         case "yandex":
            if (+value < 10) {
               return "Минимальная сумма вывода - 10 руб"
            } else if (+value > 15000) {
               return "Максимальная сумма вывода - 15 000 руб"
            }
            return
         case "webmoney":
         case "webmoneyWmr":
            if (+value < 1) {
               return "Минимальная сумма вывода - 1 руб"
            } else if (+value > 14700) {
               return "Максимальная сумма вывода - 14 700 руб"
            }
            return
         case "card":
            if (+value < 50) {
               return "Минимальная сумма вывода - 50 руб"
            } else if (+value > 100000) {
               return "Максимальная сумма вывода - 100 000 руб"
            }
            return
         case "mc":
            if (+value < 1) {
               return "Минимальная сумма вывода - 1 руб"
            } else if (+value > 15000) {
               return "Максимальная сумма вывода - 15 000 руб"
            }
            return
         default:
            return
      }
   }
}