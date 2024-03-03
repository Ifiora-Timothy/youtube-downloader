import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { vidFormat } from "../providers/data"
import List from "./List"

type Props = {
  data:Array<vidFormat
  >
}

const SingleDownloads = ({data}: Props) => {
  return (
    <Card className='bg-transparent shadow-none border-none '>
    <CardHeader className="pb-2 ">
      <CardTitle  className="text-purple-800 ">Download Details...</CardTitle>
    </CardHeader>
    <CardContent className="self-stretch justify-center h-max items-start gap-6 flex">
      <List data={data} type='list'/>
    </CardContent>

  </Card>
  )
}

export default SingleDownloads