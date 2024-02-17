import React from 'react'
import HorizontalListCard from '../UI/HorizontalListCard'
import VerticalListCard from '../UI/VerticalListCard'

type Props = {}

const Downloads = (props: Props) => {
  return (
    <div className="self-stretch justify-center h-max items-start gap-6 flex">
    <div className="w-[677px] self-stretch pb-[34px] flex-col justify-start items-start gap-4 flex">
        <div className="self-stretch h-7 pr-[512px] justify-start items-center flex">
            <div className=" text-white text-xl font-bold font-['Roboto'] leading-7">Videos in Playlist:</div>
        </div>
        <div className="self-stretch py-[3px] flex-col justify-start items-start gap-[18px] flex">
            {[1, 2].map((item, index) => (<HorizontalListCard key={index}/>))}

        </div>
    </div>
    <VerticalListCard/>
</div>
  )
}

export default Downloads