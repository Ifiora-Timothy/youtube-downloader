"use client"
import { trpc } from "@/app/_trpc/client";
import clsx from "clsx";
import { CheckSquare2, CircleUserRound, Eye, EyeOff, LockKeyhole, MailOpen } from "lucide-react";
import { useState } from "react";
import CustomInput from "../UI/CustomInput";

export interface FormData {
    username: string;
    email: string;
    password: string;
    credentials: boolean
}

interface Error {
    username?: string;
    email?: string;
    password?: string;
}

const Signup = () => {
    const [form, setForm] = useState<FormData>({ username: "", email: "", password: "", credentials: false });
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

    const mutation = trpc.authSignup.useMutation()

    //handle input change
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const target = e.target;
        const value =
            target.name === "credentials"
                ? (target as HTMLInputElement).checked
                : target.value;
        const name = target.name;

        setForm({
            ...form,
            [name]: value,
        });
    };

    /* Makes sure pet info is filled for pet name, owner name, species, and image url*/
    const formValidate = () => {
        let err: Error = {};
        if (!form.username) err.username = "username is required";
        if (!form.email) err.email = "email is required";
        if (!form.password) err.password = "password is required";
        return err;
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const errs = formValidate();

        if (Object.keys(errs).length === 0) {
            mutation.mutate(form)
        }
    };



    //TODO: check in realtime if the username or email already exist using server actions befro the suer is actually signed up



    return (
        <>
            <form className="flex mt-2 flex-col items-center" onSubmit={handleSubmit}>
                <div className="w-[276px] flex flex-col text-gray-900 gap-4 mt-2  ">
                    <CustomInput placeholder="username" name="username" Icon={() => <CircleUserRound />} type="text" isDouble={false} onChange={handleChange} />
                    <CustomInput placeholder="email@example.com" Icon={() => <MailOpen />} name="email" type="email" isDouble={false} onChange={handleChange} />
                    <CustomInput placeholder="Password" name="password" IconOpen={() => <Eye className="cursor-pointer " />} IconClose={() => <EyeOff className="cursor-pointer " />} Icon={() => <LockKeyhole />} type="password" isDouble={true} setIsPasswordVisible={setIsPasswordVisible} onChange={handleChange} isPasswordVisible={isPasswordVisible} />
                </div>
                <div className="p-0.5 mt-2 items-center gap-px inline-flex">
                    <div className="w-[17px] h-[17px] relative">
                        <input onChange={handleChange} type="checkbox" className="hidden" name="credentials" id="credentials" hidden />
                        <label htmlFor="credentials">
                            <CheckSquare2 className={clsx("text  w-[17px] h-[17px] text-black text-xs", {
                                " bg-purple-900 text-white": form.credentials
                            })} />
                        </label>
                    </div>
                    <div className="pl-[3px] pr-px pt-1 pb-[3px] ">
                        <div className="text-right flex"><span className=" text-[9px] text-zinc-700 font-light font-['Inter'] leading-[9.14px]">i read and agree to the </span><span className="text-blue-700 ml-[1px] underline text-[9px] font-light font-['Inter'] leading-[9.14px]"> terms and Conditions</span></div>
                    </div>
                </div>
                <div className=" mt-[20px] w-[140px]  py-2 bg-gradient-to-b from-purple-700 to-purple-700 rounded-[53px]  shadow shadow-blue-400  drop-shadow-lg justify-center items-center flex">
                    <button disabled={mutation.isPending} type="submit" className="text-white block text-[10px] font-bold font-['Inter']">CREATE ACCOUNT</button>
                </div>
            </form>
            {mutation.isError && <div className="text-red-500 text-xs font-semibold font-['Inter']">{mutation.error.message}</div>}
            {mutation.isSuccess && <div className="text-green-500 text-xs font-semibold font-['Inter']">Account created successfully</div>}
        </>
    )
}

export default Signup