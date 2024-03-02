"use client"
import ytdl from "@distube/ytdl-core"
import { useContext } from "react"
import { DataContext } from "../providers/data"
import SingleDownloads from "./SingleDownloads"

type Props = {}

const DownloadContaner = (props: Props) => {


  const {data,mode} = useContext(DataContext)

if(data){
  console.log(data);
  if(mode==="getVideoInfo"){
      if(Array.isArray(data)){
return <SingleDownloads data={data as Array<{videoDetails:ytdl.MoreVideoDetails,customFormats:Array<any>}>}/>}
return <SingleDownloads data={[data]as Array<{videoDetails:ytdl.MoreVideoDetails,customFormats:Array<any>}>}/>
  }

}

//TODO: return a component that shows that there are no downloads
//return <EmptyDownload/>
return <div>search to download</div>
}

export default DownloadContaner