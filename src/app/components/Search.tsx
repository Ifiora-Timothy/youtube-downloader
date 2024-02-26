
"use client"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { zodResolver } from "@hookform/resolvers/zod"
import { clsx } from "clsx"
import { Link, Search as SearchIcon, TextSearch } from "lucide-react"
import { useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { getVideoInfo } from "../lib/yt/ytdlUtils"
import TextComponent from "./TextComponent"
type Props = {}
const formSchema = z.object({
    url: z.string().startsWith("http")
})
const Search = (props: Props) => {

    const [isSearch, setIsSearch] = useState(false)
    const [searchResults, setSearchResults] = useState([])

    const outlineRef = useRef<HTMLParagraphElement>(null)
    const inputRef = useRef<HTMLInputElement | null>(null)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            url: ""
        }
    })
    async function onSubmit(values: z.infer<typeof formSchema>) {
        const vidInfo=await getVideoInfo(values.url)
            console.log(vidInfo);
            
        
    }
    console.log(outlineRef.current?.innerHTML)
    return (
        <div className="w- flex mt-4 flex-col items-center  relative">
            <div className="justify-end   mx-auto items-stretch  flex">
                <div
               //  style={{ boxShadow: "-3px 1px 33px 7px rgba(165,57,227,0.2)" }} 
                 className={clsx("flex  text-black focus-visible:ring-1  h-fit w-fit   mr-2 rounded-md p-0 m-0")}>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-x-4 bg-none space-y-0 items-center flex gap-1">
                           <div style={{ boxShadow: "-3px 1px 33px 7px rgba(165,57,227,0.2)" }} className="relative w-fit rounded-md shadow-sm bg-white">
                           <Button className="bg-transparent absolute inset-y-0  left-0 top-1/2 transform -translate-y-1/2 flex items-center pl-3" disabled variant='ghost'>
                            {isSearch ? <TextSearch className='text-purple-900 ' /> : <Link className=' text-purple-900' />}
                            </Button>
                           <FormField  control={form.control} name="url"
                                render={({ field }) => (
                                    <>
                                    <FormItem className="block w-fit rounded-md border-0   pl-7 pr-20 ring-1 ring-inset ring-gray-300 focus-within:ring-1 focus-within:ring-inset focus-within:ring-purple-600   ">
                                        <FormControl>
                                            <Input
                                                className="focus-visible:ring-0 text-gray-900  shadow-none w-fit  placeholder:text-gray-400 outline-none font-normal font-['Segoe UI Emoji'] sm:text-sm sm:leading-6    border-none  " type="text"
                                                placeholder={isSearch ? "type in the keyword..." : "https://example.com/playlist..."} />
                                        </FormControl>
                                        
                                    </FormItem>
                                    <FormMessage className="absolute w-max left-1/2 transform -translate-x-1/2" id="text" /></>
                                )} />
                           </div>
                           
                          <div style={{ boxShadow: "-3px 1px 33px 7px rgba(165,57,227,0.2)" }} className="rounded">
                             <Select  onValueChange={(e) => { if (e === "name") setIsSearch(true); else { setIsSearch(false) } }}>
                                <SelectTrigger  className="w-[80px] ring-1 border-none focus:ring-purple-600  ring-gray-300 bg-white">
                                    <SelectValue placeholder='URL'></SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="url">URL</SelectItem>
                                    <SelectItem value="name">NAME</SelectItem>
                                </SelectContent>
                            </Select>
                          </div>
                           
                            <Button style={{ boxShadow: "-3px 1px 33px 7px rgba(165,57,227,0.2)" }} variant='default' className=" ml-2 ring-1 ring-inset ring-gray-300 purpleGradient hover:bg-purple-600  ">
                                Search <SearchIcon className="text-sm h-[17px]" />
                            </Button>
                        </form>
                    </Form>
                </div>

            </div>
            {
                isSearch ?
                    <TextComponent searchResults={searchResults} />
                    : null
            }

        </div>

    )
}

export default Search