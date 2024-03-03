import { Button } from '@/components/ui/button'
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from '@/components/ui/progress'
import Image from 'next/image'

export type verticalCard={
    id:string;
    url:string;
    title:string;
    last_updated: string;
    author_name?:string;
    author_img?:string;
    thumbnail:string;
    total_items:number
    }

type Props = verticalCard

const VerticalListCard = ({id,url,title,last_updated,author_img,author_name,thumbnail,total_items}: Props) => {
    console.log(author_name);
    
    return (
        <Card className='w-[310px] '>
            <CardContent className=" gap-2 pt-6 relative p-[20px] rounded flex-col  items-center flex">
                <Image className='rounded-sm ' alt='image placeolder' width='200' height='200' src={thumbnail} />
                <div className="w-[315px] h-7 justify-center items-center flex">
                    <div className=" text-center text-black text-2xl font-bold font-['Roboto'] ">{title}</div>
                </div>
                <div className='flex-col text-zinc-700 text-[13px] items-center flex'>
                    <div className="w-[315px] h-5  justify-center items-center flex">
                        <div className="text-cente   font-normal font-['Segoe UI Emoji'] ">{author_name||"Anonymous"}</div>
                    </div>
                    <div className="h-5 justify-center items-center flex">
                        <div className="text-center  font-normal font-['Segoe UI Emoji'] ">Total Time: 3h 45m</div>
                    </div>
                    <div className="w-[315px] h-5 justify-center items-center flex">
                        <div className="text-center  font-normal font-['Segoe UI Emoji'] ">Size: 1GB</div>
                    </div>
                </div>

                <Button className="bg-orange-600 mt-2 text-center px-4 py-2 ">
                    Download All
                </Button>
                <Progress indicatorColor='bg-orange-500' value={33} className="w-[280px] mt-1   bg-gray-700 "/>
            </CardContent>

        </Card>
    )
}

export default VerticalListCard