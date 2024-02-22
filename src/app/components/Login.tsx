"use client"
import { AlertCircle, AlignRightIcon, ArrowRightIcon, EyeOff, Key, Loader2, LockKeyhole, MailOpen } from "lucide-react"
import { trpc } from "../_trpc/client";
import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
//import { Authenticate } from "../lib/action";
import { signIn, signOut } from "../../../auth";
import { TRPCError } from "@trpc/server";
import { loginFn } from "../lib/action";
import { useSession,getSession } from "next-auth/react";
import { auth } from "../../../auth";
import getUserSession from "../server/getUserSession";

export interface login {
    email: string;
    password: string;
}


const Login = () => {
  //  const {data:session,status}= useSession()
    const [errorMessage, dispatch] = useFormState(Authenticate, undefined);
    const [form, setForm] = useState<login>({ email: "", password: "" });



    const mutation= trpc.authLogin.useMutation()
  
    //handle input change
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const target = e.target;
        const value =target.value;
        const name = target.name;
        setForm({
            ...form,
            [name]: value,
        });
    };

    interface Error {
        email?: string;
        password?: string;
    }
    
    async function Authenticate(
      prevState: string | undefined,
      formData: FormData,
    ) {
     /* Makes sure pet info is filled for pet name, owner name, species, and image url*/
     const formValidate = () => {
        let err: Error = {};
    
        if (!formData.get("email")) err.email = "email is required";
        if (!formData.get("password")) err.password = "password is required";
        return err;
    };
    
    
       const errs= formValidate();
    console.log(Object.keys(errs).length)
       if (Object.keys(errs).length === 0) {
    
        const email = formData.get("email") as string
        const password = formData.get("password") as string
    
       mutation.mutate({email,password})
   
       }
      else{
        return `${errs?.email}${errs?.password}`
      }
    
        return "success"
    
    }
    //TODO: check in realtime if the username or email already exist using server actions befro the suer is actually signed up

    return (
        <form 
        //action={loginFn}
         action={dispatch}
         >
            {/* {(status ==="loading")?
            <div>loading...</div>:
            (status ==="unauthenticated")?
            <div>unauthenticated...</div>:
            (status === "authenticated")?
            <div>authenticated</div>:
            <div>unknown status</div>

            } */}
            <div className="w-[276px]  text-gray-900 flex flex-col gap-4 mt-3">
                <div className="w-[276px]  h-[35px] pl-[11px] pr-[136px] pt-1.5 pb-[5px] left-0 bg-white rounded-[21px]  shadow shadow-blue-400  drop-shadow-lg justify-start items-center inline-flex">
                    <div className="self-stretch justify-start items-center gap-1 inline-flex">
                        <div className="w-6 h-6 relative">
                            <MailOpen />
                        </div>
                        <input agitria-label="email" name="email" onChange={handleChange} type="email" className="pl-px w-full pr-[10px]  font-medium font-['Inter'] pt-[3px] bg-white bg-opacity-0 outline-none placeholder:text-stone-400 text-xs border-none" placeholder="email@example.com" />
                    </div>
                </div>
                <div className="w-[272px] h-[34px] px-2.5 py-[5px] left-[2px] bg-white rounded-[21px] shadow shadow-blue-400  drop-shadow-lg justify-start items-center  inline-flex">
                    <div className="justify-start w-full items-center gap-1.5 flex">
                        <div className="w-6 h-6 relative" >
                            <LockKeyhole />
                        </div>
                        <input aria-label="Password" name="password" onChange={handleChange} type="password" className="pl-px w-full pr-[10px]  font-medium font-['Inter'] pt-[3px] bg-white bg-opacity-0 outline-none placeholder:text-stone-400 text-xs border-none" placeholder="Password" />
                    </div>
                    <div className="w-6 h-6 relative">
                        <EyeOff />
                    </div>
                </div>
            </div>
            <div className="pl-6 mt-10 pr-[21px] py-2 bg-gradient-to-b from-purple-700 to-purple-700 rounded-[53px]  shadow shadow-blue-400  drop-shadow-lg justify-center items-center inline-flex">
                <LoginButton />

            </div>
            <div className="flex h-8 items-end space-x-1" aria-live="polite" aria-atomic="true">
                {errorMessage && (
                    <>
                        <AlertCircle className="h-5 w-5 text-red-500" />
                        <p className="text-sm text-red-500">{errorMessage}</p>
                    </>
                )}
            </div>
        </form>
    )
}

export default Login

function LoginButton() {
    const { pending } = useFormStatus();
    return (
        <button type="submit" className="text-white items-center flex  text-[10px] font-bold font-['Inter']" aria-disabled={pending}>
            {pending ? (
                <Loader2 className='h-8 w-8 animate-spin text-zinc-800 ' />
            ) : (
                <>
                    <>Log In</>
                    <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" /></>
            )}
        </button>
    );
}