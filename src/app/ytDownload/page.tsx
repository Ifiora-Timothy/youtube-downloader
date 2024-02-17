import React from 'react'
import Downloads from '../components/Downloads'
import EmptyDownload from '../components/EmptyDownload'
import Search from '../components/Search'
type Props = {}

const YtDownload = (props: Props) => {
    return (

        <div className="w-[1280px]  h-[720px] px-16 pb-[186px] bg-purple-900 justify-center flex items-start">
            <div className="w-[1152px] mt-7 h-[534px] p-8 justify-center items-center flex">
                <div className="w-[1088px] p-6 bg-purple-700 rounded-lg flex-col justify-center items-center gap-[57px] flex">
                    <div className="self-stretch flex-col justify-center items-center gap-2 flex">
                        <div className="justify-center items-center gap-2.5 flex">
                            <div className=" text-white text-lg font-semibold font-['Roboto'] leading-7">Enter Video or Playlist URL:</div>
                        </div>
                       <Search/>
                    </div>
                   <EmptyDownload/>
                </div>
            </div>
        </div>

    )
}

export default YtDownload