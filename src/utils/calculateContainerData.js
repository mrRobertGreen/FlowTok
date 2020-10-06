import battery_0 from "../media/batteryIcons/0.svg"
import battery_1 from "../media/batteryIcons/10.svg"
import battery_2 from "../media/batteryIcons/20.svg"
import battery_3 from "../media/batteryIcons/30.svg"
import battery_4 from "../media/batteryIcons/40.svg"
import battery_5 from "../media/batteryIcons/50.svg"
import battery_6 from "../media/batteryIcons/60.svg"
import battery_7 from "../media/batteryIcons/70.svg"
import battery_8 from "../media/batteryIcons/80.svg"
import battery_9 from "../media/batteryIcons/90.svg"
import battery_10 from "../media/batteryIcons/100.svg"



export const calculateContainerData = (cost, amount ) => {
   let quantity = amount / cost
   let whole = parseInt(quantity)
   let percent = quantity.toString().split(".")
   percent[0] = "0"
   percent = parseFloat(percent.join("."))
   percent = parseFloat(__toFixedNoRounding(percent * 100, 3))
   let realAmount = whole * cost
   realAmount += percent * cost / 100
   return {
      whole: whole,
      percent: percent
   }
}

const __toFixedNoRounding = (number, n) => {
   const reg = new RegExp("^-?\\d+(?:\\.\\d{0," + n + "})?", "g")
   const a = number.toString().match(reg)[0];
   const dot = a.indexOf(".");
   if (dot === -1) { // integer, insert decimal dot and pad up zeros
      return a + "." + "0".repeat(n);
   }
   const b = n - (a.length - dot) + 1;
   return b > 0 ? (a + "0".repeat(b)) : a;
}

export const getPercentIcon = (percent) => {
   switch (percent) {
      case percent === 0: return battery_0
      case percent < 10: return battery_1
      case percent < 20: return battery_2
      case percent < 30: return battery_3
      case percent < 40: return battery_4
      case percent < 50: return battery_5
      case percent < 60: return battery_6
      case percent < 70: return battery_7
      case percent < 80: return battery_8
      case percent < 90: return battery_9
      case percent < 100: return battery_10
      default: return
   }
}