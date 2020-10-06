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