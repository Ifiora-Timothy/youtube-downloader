import React from 'react'
import SmallImage from '@/app/assets/images/smallImage.png'
import SearchIcon from '@/app/assets/images/search.svg'
import DownloadIcon from '@/app/assets/images/download.svg'
import DownloadBg from '@/app/assets/images/downloadBg.png'
import Image from 'next/image'
import HorizontalListCard from '../UI/HorizontalListCard'
import VerticalListCard from '../UI/VerticalListCard'
type Props = {}

const YtDownload = (props: Props) => {
    return (

        <div className="w-[1280px]  h-[720px] px-16 pb-[186px] bg-purple-900 justify-center flex items-start">
            <div className="w-[1152px] mt-7 h-[534px] p-8 justify-center items-center inline-flex">
                <div className="w-[1088px] p-6 bg-purple-700 rounded-lg flex-col justify-center items-center gap-[57px] inline-flex">
                    <div className="self-stretch flex-col justify-center items-center gap-2 inline-flex">
                        <div className="justify-center items-center gap-2.5 inline-flex">
                            <div className=" text-white text-lg font-semibold font-['Roboto'] leading-7">Enter Video or Playlist URL:</div>
                        </div>
                        <div className="justify-end items-start inline-flex">
                            <div className="self-stretch px-[92px] py-[7px] bg-purple-600 rounded-tl rounded-bl justify-center items-center gap-5 inline-flex">
                                <div className="text-zinc-400 text-base font-normal font-['Segoe UI Emoji'] leading-normal">https://example.com/playlist</div>
                            </div>
                            <div className="self-stretch px-[15px] py-[11px] bg-purple-500 rounded-tr rounded-br justify-start items-start gap-2.5 inline-flex">
                                <div className=" relative h-[20px] w-[20px]">
                                    <Image height='20' width='20' alt='search icon' src={SearchIcon} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="self-stretch justify-center h-max items-start gap-6 inline-flex">
                        <div className="w-[677px] self-stretch pb-[34px] flex-col justify-start items-start gap-4 inline-flex">
                            <div className="self-stretch h-7 pr-[512px] justify-start items-center inline-flex">
                                <div className=" text-white text-xl font-bold font-['Roboto'] leading-7">Videos in Playlist:</div>
                            </div>
                            <div className="self-stretch py-[3px] flex-col justify-start items-start gap-[18px] inline-flex">
                                {[1, 2].map((item, index) => (<HorizontalListCard key={index}/>))}

                            </div>
                        </div>
                        <VerticalListCard/>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default YtDownload