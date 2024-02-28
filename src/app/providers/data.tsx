"use client"
import ytdl from "@distube/ytdl-core";
import { Dispatch, PropsWithChildren, SetStateAction, createContext, useState } from "react";

 export const DataContext = createContext<{ data: {videoDetails:ytdl.MoreVideoDetails,customFormats:Array<any>} | null; setData: Dispatch<SetStateAction<{videoDetails:ytdl.MoreVideoDetails,customFormats:Array<any>} | null>>;}>({data:null,setData:()=>{}})

 export function DataProvider({children}:PropsWithChildren){
    const [data,setData]= useState<{videoDetails:ytdl.MoreVideoDetails,customFormats:Array<any>}|null>(null)

    return (
        <DataContext.Provider value={{data,setData}}>
            {children}
        </DataContext.Provider>
    )


 }