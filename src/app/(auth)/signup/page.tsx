import Signup from "@/app/components/Signup"
import Link from "next/link"


const page = () => {
  
    return (
        <div className="w-full h-[90vh]  bg-purple-600 justify-center pt-20  flex">
            <div className="w-[371px] h-[387px] relative flex flex-col items-center gap-4 pt-10 bg-white rounded-[19px] shadow">
                <div className="pl-[23px] pr-[22px] py-px bg-red-900 bg-opacity-0 justify-center items-center inline-flex">
                    <div className="text-neutral-900 text-xl font-bold font-['Inter']">Sign Up</div>
                </div>
                <Signup />
                <div className="pl-[27px] pr-[13px] py-1  justify-end items-center inline-flex">
                    <div className="text-right"><span className="text-black text-xs font-light font-['Inter'] leading-[13.71px]">Already have an account? </span><Link href='/login' className="underline text-blue-800 text-xs font-semibold font-['Inter'] leading-[13.71px]">Log In</Link></div>
                </div>
                </div>
        </div>
    )
}

export default page