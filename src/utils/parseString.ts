export const parseStringTikTok = (string: string) => {
   const regexp: RegExp = /tiktok/
   return !!string.match(regexp)
}
