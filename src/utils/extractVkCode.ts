export const extractVkCode = (str: string) => {
   const regexp = /code=(.*)/
   const code = str.match(regexp)

   if (code) {
      return code[1]
   }
   return null
}