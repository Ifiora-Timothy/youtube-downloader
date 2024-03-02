"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import HorizontalListCard from "../UI/HorizontalListCard"
import { multipledownload, sdownloadMultipleVideos } from "../lib/yt/ytdlUtils"
import { vidFormat } from "../providers/data"

type Props = {
    type:"playlist"|"list",
    data:Array<vidFormat>
}

const List = ({type,data}: Props) => {

  const downloadData:multipledownload[] = data.map(({videoDetails,format}) => ({url: videoDetails.video_url,title: videoDetails.title,options:  {
    quality: format,
  }}))
const DownloadMultiple = async () => {

//for normal download
//const resNorm = await downloadMultipleVideos(downloadData)


//for stream download
const resStream = await sdownloadMultipleVideos(downloadData)

}



  return (
    <Card className="w-[677px] pb-2 bg-transparent  ">
    <CardHeader className="pb-2 ">
      <CardTitle className="text-purple-800 flex item justify-between"><span>Videos in {type}:</span><Button onClick={async()=>await DownloadMultiple()} className="bg-orange-500 text-white ">Download All</Button></CardTitle>
    </CardHeader>
    <CardContent className='max-h-[500px] overflow-y-auto'>
      <div className="self-stretch   flex-col justify-start items-center gap-[18px] flex">
        {data.map((item, index) => (<HorizontalListCard customFormats={item.customFormats} videoDetails={item.videoDetails} key={index} />))}
      </div>

      <div className='mt-2 '>End of results...</div>
    </CardContent>

  </Card>
  )
}

export default List