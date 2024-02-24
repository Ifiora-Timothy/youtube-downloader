"use client"
import emptyDownloads from '@/app/assets/images/emptyDownloads.png'
import Image from 'next/image'
import Lottie from "lottie-react"
import oops from "@/app/lottie/oops.json"
import { Suspense } from 'react'
type Props = {}

const EmptyDownload = (props: Props) => {

    return (
        <div className="h-[300px] px-4 justify-center flex-col  items-center flex">
         
           <Suspense fallback={<Image height='300' width='400' className='rounded-lg bg-zinc-300' src={emptyDownloads} alt='empty downloads placeholder' />
          }>
                  <div className="grow shrink basis-0 h-[270px] w-[340px] pr-3 justify-start items-center flex">
                <Lottie animationData={oops} loop={false}/>
            </div>
          </Suspense>
          
          <div className=" h-[228px] w-fit   relative justify-start flex">
                <div className=" flex items-baseline purpleText text-6xl font-bold font-['Roboto']">OOPS! 
                <div className="  text-sm font-normal font-['Segoe UI Emoji'] "> Please start typing to search ...</div></div>
              
             </div>
           
        </div>
    )
}

export default EmptyDownload