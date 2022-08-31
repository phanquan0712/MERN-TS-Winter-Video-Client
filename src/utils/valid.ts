import { IUserRegister } from "./Typescript";

export const ValidRegister = ({ name, account, password, cf_password }: IUserRegister) => {
   if (!name) {
      return 'Please add your full name!'
   }
   else if (name.length > 30) {
      return 'Full name must be less than 20 characters!'
   }

   if (!account) {
      return 'Please add your user name!'
   }
   // check password
   if (password.length < 6) {
      return 'Password must be at least 6 characters!'
   }
   else if(password !== cf_password) {
      return 'Password and confirm password must be the same!'
   }
}


export function vailidPhoneNumber(phone: string) {
   const re = /^[+]/g;
   return re.test(phone);
}