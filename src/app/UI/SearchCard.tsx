import Image from 'next/image'
import DownloadIcon from '@/app/assets/images/download.svg'
import SmallImage from '@/app/assets/images/smallImage.png'
import { Search as SearchIcon } from 'lucide-react'

type Props = {}

const SearchCard = (props: Props) => {
  return (
    <div className="w-[300px] h-[50px] px-3 rounded flex-col justify-center items-start gap-3 flex">
    <div className=" h-10 items-center justify-between flex ">
        <Image alt='video image' height='40' width='50' className='rounded' src={SmallImage} />
        <div className=" h-[43px]  flex-col justify-start items-start ml-2 mr-4 flex">
            <div className="h-[25px] pt-px justify-end items-center flex">
                <div className="">
                    <div className="text-white truncate w-[200px]  overflow-y-hidden overflow-ellipsis text-sm font-normal font-['Roboto'] leading-normal">the Lorem ipsum dolor sit. story my mama told me</div></div>
            </div>
            <div className="justify-end items-center mt-1 flex">
                <div className=" text-white text-xs font-normal font-['Segoe UI Emoji'] leading-tight">Size: 50MB</div>
            </div>
        </div>
        <div className=" h-8 mr-0 w-8 my-auto bg-transparent rounded justify-center items-center flex">
            <SearchIcon className='text-xl cursor-pointer font-black hover:text-zinc-400 text-white '/>
        </div>
    </div>
</div>
  )
}

export default SearchCard