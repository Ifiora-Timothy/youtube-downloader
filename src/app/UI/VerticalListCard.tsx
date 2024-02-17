import Image from 'next/image'
import DownloadIcon from '@/app/assets/images/download.svg'
import DownloadBg from '@/app/assets/images/downloadBg.png'
type Props = {}

const VerticalListCard = (props: Props) => {
  return (
    <div className="w-[310px] gap-2 relative bg-purple-800 p-[20px] rounded flex-col  items-center flex">

    <Image alt='image placeolder' width='200' height='200' src={DownloadBg} />
    <div className="w-[315px] h-7 justify-center items-center flex">
        <div className=" text-center text-white text-2xl font-bold font-['Roboto'] ">Playlist Name</div>
    </div>
    <div className='flex-col text-zinc-200 text-[13px] items-center flex'>
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

    <div className="  pt-4 pb-[13px] h-10 w-10 my-auto bg-purple-600 rounded justify-center items-center flex">
        <Image height='14' width='14' alt='search icon' src={DownloadIcon} />
    </div>
    <div className="w-[290px] mt-2 h-2.5 pr-[252px] bg-gray-700 rounded-full justify-start items-center flex">
        <div className="w-[63px] h-2.5 relative bg-purple-400 rounded-full" />
    </div>
</div>
  )
}

export default VerticalListCard