import Login from "@/app/components/Login";
import getUserSession from "@/app/server/getUserSession";
import Link from "next/link"


const page = async() => {
 
    const currUserSession=  await getUserSession()
console.log(currUserSession,"from pages")


    return (
        <div className="w-full  h-[90vh] bg-purple-600 justify-center pt-20  flex">
            <div className="w-[371px] h-[300px]  flex flex-col items-center gap-2 pt-10 bg-white rounded-[19px] shadow">
                <div className=" bg-red-900 bg-opacity-0 mt-1 justify-center items-center inline-flex">
                    <div className="text-neutral-900 text-xl font-bold font-['Inter']">Log In</div>
                </div>
                <Login />
                <div className="pl-[27px] pr-[13px]   justify-end items-center inline-flex">
                    <div className="text-right"><span className="text-black text-xs font-light font-['Inter'] ">Don't have an account? </span><Link href='/signup' className="underline text-blue-800  text-xs font-semibold font-['Inter'] leading-[13.71px]">Sign Up</Link></div>
                </div>
            </div>
        </div>
    )
}

export default page