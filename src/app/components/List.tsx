import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import HorizontalListCard from "../UI/HorizontalListCard"

type Props = {
    type:"playlist"|"list"
}

const List = (props: Props) => {
  return (
    <Card className="w-[677px] pb-2 bg-transparent  ">
    <CardHeader className="pb-2 ">
      <CardTitle className="text-purple-800 ">Videos in {props.type}:</CardTitle>
    </CardHeader>
    <CardContent className='max-h-[500px] overflow-y-auto'>
      <div className="self-stretch   flex-col justify-start items-start gap-[18px] flex">
        {[1, 2, 3, 4].map((item, index) => (<HorizontalListCard key={index} />))}
      </div>

      <div className='mt-2 '>End of results...</div>
    </CardContent>

  </Card>
  )
}

export default List