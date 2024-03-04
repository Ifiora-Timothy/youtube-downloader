"use client";
import {
  PropsWithChildren,
  createContext,
  useState
} from "react";
import { getDownloadProgress } from "../lib/yt/ytdlUtils";
export type mode = "getVideoInfo" | "getSearchInfo";


export const ProgressContext = createContext<{ 
  startTracking: (id: string) => Promise<void>;
  progress: number

}>({ startTracking:async(id)=>{},progress:0});

export function ProgressProvider({ children }: PropsWithChildren) {
  const [progress,setProgress]=useState<number>(0)
  const [videoId,setVideoId]=useState<string|null>(null)
  interface ProgressResponse {
    progress: number;
  }
  const startTracking= async (id:string)=>{
    console.log("reached tracking");
    
    setVideoId(id);
    while (true) {
      console.log("whilinf");
      
      const response = await getDownloadProgress(id);
      setProgress(100)
      console.log("here 4",response);
      
      if(response===null){
          break;
      }
      const { progress } = response as ProgressResponse
      setProgress(progress);

      if (progress >= 100) {
        setProgress(progress);
        console.log("100..... reached");
        
        break;
      }
    }

  }



  return (
    <ProgressContext.Provider value={{ progress,startTracking}}>
      {children}
    </ProgressContext.Provider>
  );
}
