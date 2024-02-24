"use client"
import { AlertCircle, ArrowRightIcon, Eye, EyeOff, Loader2, LockKeyhole, MailOpen } from "lucide-react";
import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { trpc } from "../_trpc/client";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";

export interface login {
    email: string;
    password: string;
}


const Login = () => {
    const [errorMessage, dispatch] = useFormState(Authenticate, undefined);
    const [form, setForm] = useState<login>({ email: "", password: "" });
    const [isPasswordVisible,setIsPasswordVisible]= useState(false)

    const searchParams = useSearchParams()
    const router = useRouter()
    const origin = searchParams.get('origin')

    const mutation = trpc.authLogin.useMutation({
        onSuccess: async (e) => {
            toast.success("Logged in successfully")
            router.refresh()
            console.log("logged in successfully")

            if (origin) router.push(`/${origin}`);
            router.push('/choices')
        },
        onError: async (err) => {

            if (err.data?.code === "UNAUTHORIZED") {
                toast.error(err.message)
            }
        }
    })

    //handle input change
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const target = e.target;
        const value = target.value;
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
        prevState: {email: string | undefined; password: string | undefined}| undefined,
        formData: FormData,
    ) {
        /* Makes sure pet info is filled for pet name, owner name, species, and image url*/
        const formValidate = () => {
            let err: Error = {};

            if (!formData.get("email")) err.email = "email is required";
            if (!formData.get("password")) err.password = "password is required";
            return err;
        };


        const errs = formValidate();
        if (Object.keys(errs).length === 0) {

            const email = formData.get("email") as string
            const password = formData.get("password") as string

            mutation.mutate({ email, password })
        }
        else {
            return {email:errs?.email,password:errs?.password}
        }

    }
    //TODO: check in realtime if the username or email already exist using server actions befro the suer is actually signed up

    return (
        <form className="flex items-center flex-col" action={dispatch}>
            <div className="w-[276px]  text-gray-900 flex items-center justify-center flex-col gap-4 mt-3">
                <div className="w-[276px]  h-[35px] px-[11px]  pt-1.5 pb-[5px] left-0 bg-white rounded-[21px]  shadow shadow-blue-400  drop-shadow-lg justify-start items-center inline-flex">
                    <div className="self-stretch w-full justify-start items-center gap-1 inline-flex">
                        <div className="w-6 h-6 relative">
                            <MailOpen />
                        </div>
                        <input agitria-label="email" name="email" onChange={handleChange}  type="email" className="pl-px w-full pr-[10px]  font-medium font-['Inter'] pt-[3px] bg-white bg-opacity-0 outline-none placeholder:text-stone-400 text-xs border-none" placeholder="email@example.com" />
                    </div>
                </div>
                {errorMessage?.email && (
                    <div className="flex items-center -mt-[14px] ml-3">
                        <AlertCircle className="text-xs h-3 w-4  text-opacity-90 text-red-500" />
                        <p className="text-[10px] truncate text-opacity-90  text-red-500">{errorMessage.email}</p>
                    </div>
                )}
                <div className="w-[272px] h-[34px] px-2.5 py-[5px] left-[2px] bg-white rounded-[21px] shadow shadow-blue-400  drop-shadow-lg justify-start items-center  inline-flex">
                    <div className="justify-start w-full items-center gap-1.5 flex">
                        <div className="w-6 h-6 relative" >
                            <LockKeyhole />
                        </div>
                        <input aria-label="Password" name="password" onChange={handleChange} autoComplete="off" aria-autocomplete="none" type={isPasswordVisible?'text':'password'} className="pl-px w-full pr-[10px]  font-medium font-['Inter'] pt-[3px] bg-white bg-opacity-0 outline-none placeholder:text-stone-400 text-xs border-none" placeholder="Password" />
                   
                    </div>
                    <div onClick={()=>{setIsPasswordVisible((prev)=>!prev)}} className="w-6 h-6 relative">
                        {isPasswordVisible?<EyeOff  className="cursor-pointer "/>: <Eye className="cursor-pointer "/>}
                    </div>
                </div>
                {errorMessage?.password && (
                    <div className="flex items-center -mt-[14px] ml-3">
                        <AlertCircle className="text-xs h-3 w-4  text-opacity-90 text-red-500" />
                        <p className="text-[10px] truncate text-opacity-90  text-red-500">{errorMessage.password}</p>
                    </div>
                )}
            </div>
            <div className="pl-6 mt-10 pr-[21px] py-2 bg-gradient-to-b from-purple-700 to-purple-700 rounded-[53px]  shadow shadow-blue-400  drop-shadow-lg justify-center items-center inline-flex">
                <LoginButton />

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