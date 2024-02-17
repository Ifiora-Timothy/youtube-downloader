import emptyDownloads from '@/app/assets/images/emptyDownloads.png'
import Image from 'next/image'
type Props = {}

const EmptyDownload = (props: Props) => {
    return (
        <div className="w-[896px] h-[300px] px-4 justify-center items-center gap-10 flex">
            <div className="w-[412px] h-[228px] relative flex-col justify-start items-start flex">
                <div className="pr-[179px] pb-0.5 justify-start items-center flex">
                    <div className="w-[233px] text-white text-3xl font-bold font-['Roboto'] leading-9">Let's Get Started</div>
                </div>
                <div className="justify-center items-center flex">
                    <div className="w-[400px] text-zinc-200 mt-3 text-base font-normal font-['Segoe UI Emoji'] "> please Input a URL of the video or click on the switch button if you want to search the video by name.</div>
                </div>
            </div>
            <div className="grow shrink basis-0 h-[300px] pr-3 justify-start items-center flex">
                <Image height='300' width='400' className='rounded-lg' src={emptyDownloads} alt='empty downloads placeholder' />
            </div>
        </div>
    )
}

export default EmptyDownload