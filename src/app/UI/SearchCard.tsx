import Image from 'next/image'
import DownloadIcon from '@/app/assets/images/download.svg'
import SmallImage from '@/app/assets/images/smallImage.png'
import { BadgePlus, BadgePlusIcon, Search as SearchIcon } from 'lucide-react'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
type Props = {}

const SearchCard = (props: Props) => {
    return (
        <Card className="w-[400px] px-3 rounded flex-col justify-center items-start gap-3 flex">
            <CardHeader className='pb-0 '>
                <CardTitle>Search Results...</CardTitle>
            </CardHeader>
            <CardContent>
                <Card className='rounded-sm '>
                    <CardContent  className=" items-center p-3 justify-between flex ">
                        <Image alt='video image' height='70' width='60' className='rounded' src={SmallImage} />

                        <div className=" flex-col justify-start items-start ml-2 mr-4 flex">
                            <div className="pt-px justify-end items-center flex">
                                <div className="">
                                    <div className="text-black truncate w-[200px]  overflow-y-hidden overflow-ellipsis text-sm font-normal font-['Roboto'] leading-tight">the Lorem ipsum dolor sit. story my mama told me</div></div>
                            </div>
                            <div className="justify-end items-center flex">
                                <div className=" text-black text-[10px] font-normal font-['Segoe UI Emoji']">Size: 50MB</div>
                            </div>
                        </div>
                        <div className=" h-8 mr-0 w-8 my-auto bg-transparent rounded justify-center items-center flex">
                            <BadgePlusIcon />
                        </div>
                    </CardContent>

                </Card>
            </CardContent>
            <CardFooter className='text-xs '>
                <p>End of results...</p>
            </CardFooter>
        </Card>
    )
}

export default SearchCard