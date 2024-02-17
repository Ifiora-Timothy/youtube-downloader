import Image from 'next/image'
import React from 'react'
import DownloadIcon from '@/app/assets/images/download.svg'
import SmallImage from '@/app/assets/images/smallImage.png'
type Props = {}

const HorizontalListCard = (props: Props) => {
  return (
    <div className="w-[496px] h-[106px] p-3 bg-purple-800 rounded flex-col justify-center items-start gap-3 inline-flex">
                                        <div className="h-[60px]  flex ">
                                            <Image alt='video image' height='60' width='100' className='rounded' src={SmallImage} />
                                            <div className=" h-[43px]  flex-col justify-start items-start ml-2 mr-4 inline-flex">
                                                <div className="h-[25px] pt-px justify-end items-center inline-flex">
                                                    <div className="w-[278px]"><span className="text-white text-base font-semibold font-['Roboto'] leading-normal">Video Title : </span><span className="text-white text-sm font-normal font-['Roboto'] leading-normal">the story my mama told me</span></div>
                                                </div>
                                                <div className="justify-end items-center mt-1 inline-flex">
                                                    <div className=" text-white text-xs font-normal font-['Segoe UI Emoji'] leading-tight">Size: 50MB</div>
                                                </div>
                                            </div>
                                            <div className=" pl-3.5 pr-[15px] pt-4 pb-[13px] h-10 w-10 my-auto bg-purple-600 rounded justify-center items-center inline-flex">
                                                <Image height='14' width='14' alt='search icon' src={DownloadIcon} />
                                            </div>
                                        </div>
                                        <div className="w-[459px] h-2.5 pr-[321px] bg-gray-700 rounded-full justify-start items-center inline-flex">
                                            <div className="w-[138px] h-2.5 relative bg-purple-400 rounded-full" />
                                        </div>
                                    </div>
  )
}

export default HorizontalListCard