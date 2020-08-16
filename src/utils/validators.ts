export const validateRequiredField = (value: string) => {
   return value.length === 0 ? "Это поле не может быть пустым" : undefined
}