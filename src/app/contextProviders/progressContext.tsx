"use client";
import { PropsWithChildren, createContext, useState } from "react";
import { getDownloadProgress, getPlaylistProgress } from "../lib/yt/ytdlUtils";
export type mode = "getVideoInfo" | "getSearchInfo";
const test = new Map();

export const ProgressContext = createContext({
  startTracking: async (id: string, type: "single" | "playlist") => {},
  progressMap: new Map<string, number>(),
  playlistProgress: 0
});

export function ProgressProvider({ children }: PropsWithChildren) {
  //  {yrrr:"fff",dsd}
  const [progressMap, setProgressMap] = useState(new Map<string, number>());
  const [playlistProgress, setPlaylistProgress] = useState(0);
 
  const startTracking = async (id: string,type:"single"|"playlist") => {
    console.log("started");

    if(type==="single"){
      while (true) {
        console.log("in a loop", id);
        const response = await getDownloadProgress(id);
        const progress = response as number
  
        if (response === null) {
          setProgressMap((prevMap) => {
            // Create a new Map for immutability
            const newMap = new Map(prevMap);
            newMap.set(id, 100);
            return newMap;
          });
          setProgressMap((prevMap) => {
            // Create a new Map for immutability
            const newMap = new Map(prevMap);
            newMap.set(id, 100);
            return newMap;
          });
          
          break;
        }
        setProgressMap((prevMap) => {
          // Create a new Map for immutability
          const newMap = new Map(prevMap);
          newMap.set(id, progress);
          return newMap;
        });
  
        if (progress >= 100) {
          break;
        }
      }
    }
    if(type==="playlist"){
      while (true) {
        console.log("in a loop", id);
        const response = await getPlaylistProgress(id);
        const progress = response as number
  
        if (response === null) {
          console.log("res is null");
          
          setPlaylistProgress(100);
          break;
        }
        console.log(progress,"gree");
        
        setPlaylistProgress(progress);
  
        if (progress >= 100) {
          break;
        }
      }
    }
   
  };

  return (
    <ProgressContext.Provider value={{ progressMap, startTracking,playlistProgress }}>
      {children}
    </ProgressContext.Provider>
  );
}
