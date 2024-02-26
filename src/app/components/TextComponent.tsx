import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import SearchCard from "../UI/SearchCard"
import Emoji from "react-emoji-render"

type Props = {
    searchResults:Array<string>
}

const TextComponent = ({searchResults}: Props) => {
  return (
    <div className="rounded ease-in transition-all scrollbar-track-purple-300 scrollbar-thin scrollbar-thumb-rounded scrollbar-track-rounded scrollbar-thumb-orange-600 hover:scrollbar-thumb-orange-800  overflow-y-auto max-h-[300px]  p-3 ml-auto   top-10 w-[470px] absolute z-10 ">
                        <div className=" gap-2   flex items-center justify-center flex-col s">
                            {
                                searchResults.length > 0 ?
                                    <SearchCard />
                                    :
                                    <Card className="bg-slate-50 w-[400px]">
                                        <CardHeader className=" pb-0">
                                            <CardTitle className="purpleText ">OOPS!</CardTitle>
                                        </CardHeader>
                                        <CardContent className="">
                                            <Emoji className=" text-xs " text="...type in the search box to start searching 🧐" />
                                        </CardContent>
                                    </Card>
                            }
                        </div>
                    </div>
  )
}

export default TextComponent