export const parseStringTikTok = (string: string) => {
   const regexp: RegExp = /tiktok/
   return !!string.match(regexp)
}

export const cleanPhoneNumber = (phone: string) => {
   return phone.replace(/[^+\d]/g, '')
}
