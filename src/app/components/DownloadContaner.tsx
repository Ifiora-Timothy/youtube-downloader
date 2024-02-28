"use client"
import { useContext } from "react"
import { DataContext } from "../providers/data"
import SingleDownloads from "./SingleDownloads"

type Props = {}

const DownloadContaner = (props: Props) => {


  const {data} = useContext(DataContext)

if(data){
  console.log(data);
  
  if(Array.isArray(data)){
return <SingleDownloads data={data}/>}
return <SingleDownloads data={[data]}/>
}

//TODO: return a component that shows that there are no downloads
//return <EmptyDownload/>
return <div>search to download</div>
}

export default DownloadContaner