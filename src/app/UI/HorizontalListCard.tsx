import Image from 'next/image'
import DownloadIcon from '@/app/assets/images/download.svg'
import SmallImage from '@/app/assets/images/smallImage.png'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import { Progress } from '@/components/ui/progress'
type Props = {}

const HorizontalListCard = (props: Props) => {
    return (
        <Card className='pt-6  '>
            <CardContent className="w-[496px]  rounded flex-col justify-center items-start gap-3 flex">
                <div className="h-[60px]  flex ">
                    <Image alt='video image' height='60' width='100' className='rounded' src={SmallImage} />
                    <div className=" h-[43px]  flex-col justify-start items-start ml-2 mr-4 flex">
                        <div className="h-[25px] pt-px justify-end items-center flex">
                            <div className="w-[278px]"><span className="text-black text-base font-semibold font-['Roboto'] leading-normal">Video Title : </span><span className="text-black text-sm font-normal font-['Roboto'] leading-normal">the story my mama told me</span></div>
                        </div>
                        <div className="justify-end items-center mt-1 flex">
                            <div className=" text-black text-xs font-normal font-['Segoe UI Emoji'] leading-tight"><span className='font-semibold '>Size:</span> 50MB</div>
                        </div>
                    </div>
                    <Button className="bg-purple-600  h-full">
                        <Download/>
                    </Button>
                </div>
                <Progress indicatorColor='bg-purple-600' value={33} className="w-[459px]   bg-gray-700 "/>
                   
            </CardContent>

        </Card>
    )
}

export default HorizontalListCard