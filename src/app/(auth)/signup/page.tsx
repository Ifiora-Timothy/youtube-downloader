import { CheckSquare2, CircleUserRound, EyeOff, LockKeyhole, MailOpen } from "lucide-react"

type Props = {}

const Signup = (props: Props) => {
    return (
        <div className="w-full h-[90vh]  bg-purple-600 justify-center pt-20  flex">
            <div className="w-[371px] h-[387px] relative flex flex-col items-center gap-4 pt-10 bg-white rounded-[19px] shadow">
                <div className="pl-[23px] pr-[22px] py-px bg-red-900 bg-opacity-0 justify-center items-center inline-flex">
                    <div className="text-neutral-900 text-xl font-bold font-['Inter']">Sign Up</div>
                </div>
                <div className="w-[276px] flex flex-col gap-4 mt-2  ">
                    <div className="w-[276px] h-[35px] pl-2.5 pr-[136px] pt-1.5 pb-[5px] left-0  bg-white rounded-[21px]  shadow shadow-blue-400  drop-shadow-lg justify-start items-center inline-flex">
                        <div className="self-stretch justify-start items-center gap-[5px] inline-flex">
                            <div className="w-6 h-6 relative">
                                <CircleUserRound />
                            </div>
                            <input type="text" className="pl-px w-full pr-[10px]  font-medium font-['Inter'] pt-[3px] bg-white bg-opacity-0 outline-none placeholder:text-stone-400 text-xs border-none" placeholder="Name" />
                        </div>
                    </div>
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
                <div className="p-0.5 mt-2 items-center gap-px inline-flex">
                    <div className="w-[17px] h-[17px] relative">
                        <CheckSquare2 className="text w-[17px] h-[17px]  text-xs" />
                    </div>
                    <div className="pl-[3px] pr-px pt-1 pb-[3px] ">
                        <div className="text-right flex"><span className="text-black text-[8px] font-light font-['Inter'] leading-[9.14px]">i read and agree to the</span><span className="text-purple-700 text-[8px] font-light font-['Inter'] leading-[9.14px]"> T</span><span className="text-neutral-700 text-[8px] font-light font-['Inter'] leading-[9.14px]">erms and Conditions</span></div>
                    </div>
                </div>
                <div className="pl-6 mt-[-10px]  pr-[21px] py-2 bg-gradient-to-b from-purple-700 to-purple-700 rounded-[53px]  shadow shadow-blue-400  drop-shadow-lg justify-center items-center inline-flex">
                    <div className="text-white text-[10px] font-bold font-['Inter']">CREATE ACCOUNT</div>
                </div>
                <div className="pl-[27px] pr-[13px] py-1  justify-end items-center inline-flex">
                    <div className="text-right"><span className="text-black text-xs font-light font-['Inter'] leading-[13.71px]">Already have an account? </span><span className="text-black text-xs font-semibold font-['Inter'] leading-[13.71px]">Sign In</span></div>
                </div>
            </div>
        </div>
    )
}

export default Signup