import VerticalListCard, { verticalCard } from '../UI/VerticalListCard'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { playList } from '../contextProviders/data'
import List from './List'
type Props = {
  data:playList
}

const Downloads = ({data}: Props) => {

const {id,url,title,last_updated,author,items,total_items,thumbnail}= data

const verticalCard:verticalCard={id,url,title,items,last_updated,author_img:author?.avatar,author_name:author?.name,thumbnail:thumbnail?.url||items[0].videoDetails.thumbnails[2].url,total_items}

  return (
    <Card className='bg-transparent shadow-none border-none '>
      <CardHeader>
        <CardTitle className="text-purple-800 ">Download Details...</CardTitle>
      </CardHeader>
      <CardContent className="self-stretch justify-center h-max items-start gap-6 flex">
        <List data={data.items} type='playlist'/>
        <VerticalListCard {...verticalCard}/>
      </CardContent>

    </Card>
  )
}

export default Downloads