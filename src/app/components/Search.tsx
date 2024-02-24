
"use client"
import Image from "next/image"
import Emoji from "react-emoji-render"
import HorizontalListCard from "../UI/HorizontalListCard"
import SearchCard from "../UI/SearchCard"
import { useRef, useState } from "react"
import SwitchIcon from "../assets/images/switch"
import { clsx } from "clsx"
import { ArrowLeftRight, Link, TextSearch,Search as SearchIcon } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card,CardContent,CardDescription,CardFooter,CardHeader,CardTitle } from "@/components/ui/card"
type Props = {}

const Search = (props: Props) => {

    const [isSearch, setIsSearch] = useState(false)
    const [searchResults, setSearchResults] = useState(['dd'])
   console.log(isSearch);
   
    const outlineRef=useRef<any>()

    return (
        <div className="w- flex mt-4 flex-col items-center  relative">
            <div className="justify-end   mx-auto items-stretch  flex">
                <div  style={{boxShadow:"-3px 1px 33px 7px rgba(165,57,227,0.2)"}}  ref={outlineRef} className={clsx("flex ring-black text-black focus-visible:ring-1  h-fit w-fit shadow-sm  mr-2 rounded-md p-0 m-0 bg-white")}>
                <Button className="bg-transparent pr-0" disabled variant='ghost'>{isSearch ? <TextSearch className='text-black' /> : <Link className=' text-black' />}</Button>
                <Input onBlur={()=>outlineRef.current.classList.remove("ring-1")} onFocus={()=>outlineRef.current.classList.add("ring-1")}  
                className="focus-visible:ring-0 text-zinc-700 shadow-none w-fit outline-none font-normal font-['Segoe UI Emoji']  border-none  "   type="text"
                 placeholder={isSearch ? "type in the keyword..." : "https://example.com/playlist..."} />
              </div>
              <Select onValueChange={(e)=>{if(e==="name")setIsSearch(true);else{setIsSearch(false)}}}>
                    <SelectTrigger   style={{boxShadow:"-3px 1px 33px 7px rgba(165,57,227,0.2)"}}   className="w-[80px] bg-white">
                        <SelectValue placeholder='URL'></SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="url">URL</SelectItem>
                        <SelectItem value="name">NAME</SelectItem>
                    </SelectContent>
                </Select>
                <Button  style={{boxShadow:"-3px 1px 33px 7px rgba(165,57,227,0.2)"}}  variant='default' className=" ml-2 purpleGradient hover:bg-purple-600  ">
                    Search <SearchIcon  className="text-sm h-[17px]"/>
                </Button>
            </div>
            {
                isSearch ?
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
                    : null
            }

        </div>

    )
}

export default Search