import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import List from "./List"

type Props = {}

const SingleDownloads = (props: Props) => {
  return (
    <Card className='bg-transparent shadow-none border-none '>
    <CardHeader className="pb-2 ">
      <CardTitle  className="text-purple-800 ">Download Details...</CardTitle>
    </CardHeader>
    <CardContent className="self-stretch justify-center h-max items-start gap-6 flex">
      <List type='list'/>
    </CardContent>

  </Card>
  )
}

export default SingleDownloads