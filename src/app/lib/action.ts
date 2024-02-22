"use server"

import { auth, signIn } from "../../../auth";

export  const  loginFn=async(e:FormData)=>{
    const res = await signIn('CredentialsProvider', {email:e.get("email"),password:e.get("password"),redirect:false,callbackUrl:'http://localhost:3000/choices'});
    console.log(res,'doneee')
 const session = await auth()
    console.log(session)
}