import Search from '../components/Search'
import SingleDownloads from '../components/SingleDownloads'
type Props = {}

const YtDownload = (props: Props) => {
    return (

        <div className="w-screen  px-16 pb-[186px] bg-purple-900 justify-center flex items-start">
            <div className="w-[1152px] mt-7  p-8 justify-center items-center flex">
                <div className="w-[1088px] p-6 foregroundGradient rounded-lg flex-col justify-center items-center  flex">
                    <div className="self-stretch flex-col justify-center items-center gap-2 flex">
                        <div className="justify-center items-center gap-1  flex-col flex">
                           <div className="purpleText w-[70%] mt-4 text-[44px] leading-tight text-center font-semibold font-['Roboto']">Download High-Quality Videos From Youtube</div>
                            <div className='purpleText mb-3  rounded-full p-2 text-center  font-light  w-[470px]  text-xs '>
                                  switch between searching using the video  <span className='underline decoration-orange-600 underline-offset-2 '>name</span> and <span className='underline decoration-orange-600 underline-offset-2 '>URL</span> using the dropdown
                            </div>
                        </div>
                        <Search />
                    </div>
                    <SingleDownloads />
                </div>
            </div>
        </div>

    )
}

export default YtDownload