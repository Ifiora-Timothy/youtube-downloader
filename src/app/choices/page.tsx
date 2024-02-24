import Link from 'next/link'
import React from 'react'

type Props = {}

const Choices
 = (props: Props) => {
  return (
<div className="w-full h-[100vh]  bg-purple-900 justify-center pt-24 flex">
<div className="w-[448px] h-[416px] p-8 bg-purple-800 rounded-lg shadow flex-col justify-center items-start gap-4 flex">
    <div className="self-stretch h-8 pl-[37px] pr-[38px] justify-center items-center flex">
        <div className="w-[309px] text-center text-white text-2xl font-bold font-['Roboto'] leading-loose">What would you like to do?</div>
    </div>
    <div className="self-stretch grow shrink basis-0 flex-col justify-center items-start gap-4 flex">
        <div className="self-stretch hover:bg-purple-900 grow shrink basis-0 p-3 bg-purple-700 rounded justify-center items-center flex">
            <Link href='/ytDownload' className="grow shrink basis-0 h-6 justify-center items-center flex">
                <div className=" text-center text-white text-base font-normal font-['Segoe UI Emoji'] leading-normal">Download a video or playlist</div>
            </Link>
            <div className="w-4 h-4 relative flex-col justify-start items-start flex" />
        </div>
        <div className="self-stretch grow shrink basis-0 p-3  hover:bg-purple-900 bg-purple-700 rounded justify-center items-center flex">
            <div className="h-6 justify-center items-center flex">
                <div className=" text-center text-white text-base font-normal font-['Segoe UI Emoji'] leading-normal">Convert MP3 to MP4</div>
            </div>
            <div className="relative flex-col justify-start items-start flex" />
        </div>
        <div className="self-stretch grow shrink basis-0 p-3  hover:bg-purple-900 bg-purple-700 rounded justify-center items-center flex">
            <div className="h-6 justify-center items-center flex">
                <div className="text-center text-white text-base font-normal font-['Segoe UI Emoji'] leading-normal">Convert image to video</div>
            </div>
            <div className="relative flex-col justify-start items-start flex" />
        </div>
        <div className="self-stretch grow shrink basis-0 p-3 bg-purple-700 rounded justify-center items-center flex">
            <div className="grow shrink basis-0 h-6 justify-center items-center flex">
                <div className=" text-center text-white text-base font-normal font-['Segoe UI Emoji'] leading-normal">Convert files to different formats</div>
            </div>
            <div className="relative flex-col justify-start items-start flex" />
        </div>
        <div className="self-stretch grow shrink basis-0 p-3 bg-purple-700 rounded justify-center items-center flex">
            <div className="justify-center items-center flex">
                <div className="text-center text-white text-base font-normal font-['Segoe UI Emoji'] leading-normal">Trim or split a video</div>
            </div>
            <div className="relative flex-col justify-start items-start flex" />
        </div>
    </div>
</div>
</div>
  )
}

export default Choices
