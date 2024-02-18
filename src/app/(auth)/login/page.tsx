import { CheckSquare2, CircleUserRound, EyeOff, LockKeyhole, MailOpen } from "lucide-react"


type Props = {}

const page = (props: Props) => {
  return (
    <div className="w-full h-[90vh]  bg-purple-600 justify-center pt-20  flex">
    <div className="w-[371px] h-[300px]  flex flex-col items-center gap-2 pt-10 bg-white rounded-[19px] shadow">
        <div className=" bg-red-900 bg-opacity-0 mt-1 justify-center items-center inline-flex">
            <div className="text-neutral-900 text-xl font-bold font-['Inter']">Log In</div>
        </div>
        <div className="w-[276px] flex flex-col gap-4 mt-3">
           
            <div className="w-[276px] h-[35px] pl-[11px] pr-[136px] pt-1.5 pb-[5px] left-0 bg-white rounded-[21px]  shadow shadow-blue-400  drop-shadow-lg justify-start items-center inline-flex">
                <div className="self-stretch justify-start items-center gap-1 inline-flex">
                    <div className="w-6 h-6 relative">
                        <MailOpen />
                    </div>
                    <input type="email" className="pl-px w-full pr-[10px]  font-medium font-['Inter'] pt-[3px] bg-white bg-opacity-0 outline-none placeholder:text-stone-400 text-xs border-none" placeholder="Email" />
                </div>
            </div>
            <div className="w-[272px] h-[34px] px-2.5 py-[5px] left-[2px] bg-white rounded-[21px] shadow shadow-blue-400  drop-shadow-lg justify-start items-center  inline-flex">
                <div className="justify-start w-full items-center gap-1.5 flex">
                    <div className="w-6 h-6 relative" >
                        <LockKeyhole />
                    </div>
                    <input type="password" className="pl-px w-full pr-[10px]  font-medium font-['Inter'] pt-[3px] bg-white bg-opacity-0 outline-none placeholder:text-stone-400 text-xs border-none" placeholder="Password" />
                </div>
                <div className="w-6 h-6 relative">
                    <EyeOff />
                </div>
            </div>
        </div>
        <div className="pl-6 mt-10 pr-[21px] py-2 bg-gradient-to-b from-purple-700 to-purple-700 rounded-[53px]  shadow shadow-blue-400  drop-shadow-lg justify-center items-center inline-flex">
            <div className="text-white text-[10px] font-bold font-['Inter']">LOG IN</div>
        </div>
        <div className="pl-[27px] pr-[13px]   justify-end items-center inline-flex">
            <div className="text-right"><span className="text-black text-xs font-light font-['Inter'] ">Don't have an account? </span><span className="text-black text-xs font-semibold font-['Inter'] leading-[13.71px]">Sign Up</span></div>
        </div>
    </div>
</div>
  )
}

export default page