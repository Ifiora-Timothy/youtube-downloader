import VerticalListCard from '../UI/VerticalListCard'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import List from './List'
type Props = {}

const Downloads = (props: Props) => {
  return (
    <Card className='bg-transparent shadow-none border-none '>
      <CardHeader>
        <CardTitle className="text-purple-800 ">Download Details...</CardTitle>
      </CardHeader>
      <CardContent className="self-stretch justify-center h-max items-start gap-6 flex">
        <List type='playlist'/>
        <VerticalListCard />
      </CardContent>

    </Card>
  )
}

export default Downloads