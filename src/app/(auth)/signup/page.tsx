"use client"
import { trpc } from "@/app/_trpc/client";
import { customRedirect } from "@/app/server/customRedirect";
import clsx from "clsx";
import { CheckSquare2, CircleUserRound, EyeOff, LockKeyhole, MailOpen } from "lucide-react"
import Link from "next/link"
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import { mutate } from "swr";

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

type Props = {
    formId: string;
    petForm: FormData;
    forNewPet?: boolean;
};
const Signup = (props: Props) => {
    const [form, setForm] = useState<FormData>({ username: "", email: "", password: "", credentials: false });

    const mutation= trpc.authCallback.useMutation()

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
        <div className="w-full h-[90vh]  bg-purple-600 justify-center pt-20  flex">
            <div className="w-[371px] h-[387px] relative flex flex-col items-center gap-4 pt-10 bg-white rounded-[19px] shadow">
                <div className="pl-[23px] pr-[22px] py-px bg-red-900 bg-opacity-0 justify-center items-center inline-flex">
                    <div className="text-neutral-900 text-xl font-bold font-['Inter']">Sign Up</div>
                </div>
                <form className="flex flex-col items-center" onSubmit={handleSubmit}>


                    <div className="w-[276px] flex flex-col text-gray-900 gap-4 mt-2  ">
                        <div className="w-[276px] h-[35px] px-2.5  pt-1.5 pb-[5px] left-0  bg-white rounded-[21px]  shadow shadow-blue-400  drop-shadow-lg justify-start items-center inline-flex">
                            <div className="self-stretch w-full justify-start items-center gap-[5px] inline-flex">
                                <div className="w-6 h-6 relative">
                                    <CircleUserRound />
                                </div>
                                <input name="username" onChange={handleChange} type="text" className="pl-px w-full pr-[10px]  font-medium font-['Inter'] pt-[3px] bg-white bg-opacity-0 outline-none placeholder:text-stone-400 text-xs border-none" placeholder="Name" />
                            </div>
                        </div>
                        <div className="w-[276px] h-[35px] px-[11px]  pt-1.5 pb-[5px] left-0 bg-white rounded-[21px]  shadow shadow-blue-400  drop-shadow-lg justify-start items-center inline-flex">
                            <div className="self-stretch w-full justify-start items-center gap-1 inline-flex">
                                <div className="w-6 h-6 relative">
                                    <MailOpen />
                                </div>
                                <input name="email" onChange={handleChange} type="email" className="pl-px w-full pr-[10px]  font-medium font-['Inter'] pt-[3px] bg-white bg-opacity-0 outline-none placeholder:text-stone-400 text-xs border-none" placeholder="Email" />
                            </div>
                        </div>
                        <div className="w-[272px] h-[34px] px-2.5 py-[5px] left-[2px] bg-white rounded-[21px] shadow shadow-blue-400  drop-shadow-lg justify-start items-center  inline-flex">
                            <div className="justify-start w-full items-center gap-1.5 flex">
                                <div className="w-6 h-6 relative" >
                                    <LockKeyhole />
                                </div>
                                <input name="password" onChange={handleChange} type="password" className="pl-px w-full pr-[10px]  font-medium font-['Inter'] pt-[3px] bg-white bg-opacity-0 outline-none placeholder:text-stone-400 text-xs border-none" placeholder="Password" />
                            </div>
                            <div className="w-6 h-6 relative">
                                <EyeOff />
                            </div>
                        </div>
                    </div>

                    <div className="p-0.5 mt-2 items-center gap-px inline-flex">
                        <div className="w-[17px] h-[17px] relative">
                            <input onChange={handleChange} type="checkbox" name="credentials" id="credentials" hidden />
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
                    <div className=" mt-[1px] w-[140px]  py-2 bg-gradient-to-b from-purple-700 to-purple-700 rounded-[53px]  shadow shadow-blue-400  drop-shadow-lg justify-center items-center flex">
                        <button disabled={mutation.isPending} type="submit" className="text-white block text-[10px] font-bold font-['Inter']">CREATE ACCOUNT</button>
                    </div>
                </form>
                <div className="pl-[27px] pr-[13px] py-1  justify-end items-center inline-flex">
                    <div className="text-right"><span className="text-black text-xs font-light font-['Inter'] leading-[13.71px]">Already have an account? </span><Link href='/login' className="underline text-blue-800 text-xs font-semibold font-['Inter'] leading-[13.71px]">Log In</Link></div>
                </div>
                {mutation.isError && <div className="text-red-500 text-xs font-semibold font-['Inter']">{mutation.error.message}</div>}
                {mutation.isSuccess && <div className="text-green-500 text-xs font-semibold font-['Inter']">Account created successfully</div>}
            </div>
        </div>
    )
}

export default Signup