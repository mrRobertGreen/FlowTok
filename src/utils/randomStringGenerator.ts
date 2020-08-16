const randomStringGenerator = ():string => {
   let alphabet = 'qwertyuiopasdfghjklzxcvbnm1234567890',
      word = '';
   for (let i = 0; i < 10; i++) {
      word += alphabet[Math.round(Math.random() * (alphabet.length - 1))];
   }
   return word
};

export  default randomStringGenerator