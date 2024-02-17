
"use client"
import Image from "next/image"
import Emoji from "react-emoji-render"
import HorizontalListCard from "../UI/HorizontalListCard"
import SearchIcon from "@/app/assets/images/search.svg"
import SearchCard from "../UI/SearchCard"
import { useRef, useState } from "react"
import SwitchIcon from "../assets/images/switch"
import { clsx } from "clsx"
type Props = {}

const Search = (props: Props) => {

    const [isSearch, setIsSearch] = useState(false)
    const [searchResults,setSearchResults]=useState([])
    const inputRef = useRef<HTMLInputElement>(null);
    console.log(searchResults) 
    
    return (
        <div className="w-full flex flex-col items-center  relative">
            <div className="justify-end w-[357px] mx-auto items-center flex">
                <div title="toggle between searching with url and with name" onClick={() => {
                    setIsSearch((prev) => !prev);
                    if (inputRef.current) {
                        inputRef.current.focus()
                    }

                }} className=
                    {clsx("self-stretch cursor-pointer px-[15px] py-[11px]  bg-purple-500 rounded-tl rounded-bl justify-start items-start gap-2.5 flex", {
                        "bg-purple-500 hover:bg-purple-400": !isSearch,
                        "bg-orange-600 hover:bg-orange-400": isSearch

                    })}
                >
                    <div className=" relative h-[20px] w-[20px]">
                        <SwitchIcon className='h-5 w-5  text-orange-600' />
                    </div>
                </div>
                <input ref={inputRef} type="text" placeholder="https://example.com/playlist" className=" text-zinc-100 outline-none font-normal font-['Segoe UI Emoji'] leading-normal border-none placeholder-zinc-400 text-base self-stretch px-[20px] py-[7px] bg-purple-600" />
                <div className="self-stretch cursor-pointer px-[15px] py-[11px]  hover:bg-purple-400 bg-purple-500 rounded-tr rounded-br justify-start items-start gap-2.5 flex">
                    <div className=" relative h-[20px] w-[20px]">
                        <Image height='20' className="" width='20' alt='search icon' src={SearchIcon} />
                    </div>
                </div>
            </div>
            {
                isSearch ?
                    <div className="rounded ease-in transition-all scrollbar-track-purple-300 scrollbar-thin scrollbar-thumb-rounded scrollbar-track-rounded scrollbar-thumb-orange-600 hover:scrollbar-thumb-orange-800  overflow-y-auto max-h-[300px]  p-3 ml-auto bg-slate-900 bg-opacity-90 top-10 w-[370px] absolute z-10 ">
                        <div className=" gap-2   flex items-center justify-center flex-col s">
                           {
                            searchResults.length>0?
                            <SearchCard/>
                            :
                            <div className="px-4 text-white text-opacity-55 text-xs ">
                                <Emoji text="...type in the search box to start searching 🧐"/>
                            </div>
                           }
                        </div>
                    </div>
                    : null
            }

        </div>

    )
}

export default Search