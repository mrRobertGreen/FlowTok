export const tikTokUrlParser = (string: string) => {
   const httpReg = /tiktok.com\//
   const dogReg = /@/
   if (string.match(httpReg)) {
      return string
   } else if (!string.match(httpReg) && string.match(dogReg)) {
      return "https://www.tiktok.com/" + string
   } else if ((!string.match(httpReg) && !string.match(dogReg))) {
      return "https://www.tiktok.com/@" + string
   }
   return ""
}