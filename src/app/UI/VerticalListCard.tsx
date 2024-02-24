import Image from 'next/image'
import DownloadIcon from '@/app/assets/images/download.svg'
import DownloadBg from '@/app/assets/images/downloadBg.png'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
type Props = {}

const VerticalListCard = (props: Props) => {
    return (
        <Card className='w-[310px] '>
            <CardContent className=" gap-2 pt-6 relative p-[20px] rounded flex-col  items-center flex">
                <Image className='rounded-sm ' alt='image placeolder' width='200' height='200' src={DownloadBg} />
                <div className="w-[315px] h-7 justify-center items-center flex">
                    <div className=" text-center text-black text-2xl font-bold font-['Roboto'] ">Playlist Name</div>
                </div>
                <div className='flex-col text-zinc-700 text-[13px] items-center flex'>
                    <div className="w-[315px] h-5  justify-center items-center flex">
                        <div className="text-cente   font-normal font-['Segoe UI Emoji'] ">Author: John Doe</div>
                    </div>
                    <div className="h-5 justify-center items-center flex">
                        <div className="text-center  font-normal font-['Segoe UI Emoji'] ">Total Time: 3h 45m</div>
                    </div>
                    <div className="w-[315px] h-5 justify-center items-center flex">
                        <div className="text-center  font-normal font-['Segoe UI Emoji'] ">Size: 1GB</div>
                    </div>
                </div>

                <Button className="bg-purple-600 p-3 h-[50px] ">
                    <Download className='w-8 '/>
                </Button>
                <Progress indicatorColor='bg-purple-600' value={33} className="w-[280px] mt-1   bg-gray-700 "/>
            </CardContent>

        </Card>
    )
}

export default VerticalListCard