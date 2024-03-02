"use client";
import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useState,
} from "react";
import { vidRequired } from "../lib/yt/ytdlUtils";
export type mode = "getVideoInfo" | "getSearchInfo";

export type vidFormat={ videoDetails: vidRequired; customFormats: Array<any>;format?:number };

export type SearchResults={
    items:Array<vidFormat>,
    query:string,
    results:number
}

export const DataContext = createContext<{
  mode: mode;
  setMode: Dispatch<SetStateAction<mode>>;
  data:
    |vidFormat
    | vidFormat[]
    | null
    | SearchResults;
  setData: Dispatch<
    SetStateAction<
      |vidFormat
      | vidFormat[]
      | null
      | SearchResults
    >
  >; 
}>({ data: null, setData: () => {}, mode: "getVideoInfo", setMode: () => {}});

export function DataProvider({ children }: PropsWithChildren) {
  const [data, setData] = useState<
    | vidFormat
    | vidFormat[]
    | null
    | SearchResults
  >(null);
  const [mode, setMode] = useState<mode>("getVideoInfo");

console.log(mode);

  return (
    <DataContext.Provider value={{ data, setData, mode, setMode}}>
      {children}
    </DataContext.Provider>
  );
}
