import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ytdl from "@distube/ytdl-core"
import HorizontalListCard from "../UI/HorizontalListCard"

type Props = {
    type:"playlist"|"list",
    data:Array<{videoDetails:ytdl.MoreVideoDetails,customFormats:Array<any>}>
}

const List = ({type,data}: Props) => {
  console.log(data,"list");
  
  return (
    <Card className="w-[677px] pb-2 bg-transparent  ">
    <CardHeader className="pb-2 ">
      <CardTitle className="text-purple-800 ">Videos in {type}:</CardTitle>
    </CardHeader>
    <CardContent className='max-h-[500px] overflow-y-auto'>
      <div className="self-stretch   flex-col justify-start items-start gap-[18px] flex">
        {data.map((item, index) => (<HorizontalListCard formats={item.customFormats} data={item.videoDetails} key={index} />))}
      </div>

      <div className='mt-2 '>End of results...</div>
    </CardContent>

  </Card>
  )
}

export default List