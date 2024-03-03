"use client";
import { useContext } from "react";
import { DataContext, vidFormat } from "../providers/data";
import Downloads from "./Downloads";
import SingleDownloads from "./SingleDownloads";

type Props = {};

const DownloadContaner = (props: Props) => {
  const { data, mode } = useContext(DataContext);

  if (data) {
    console.log(data);
    if (mode === "getVideoInfo") {

      if (Array.isArray(data as Array<vidFormat>)) {
        // it is a video
        return <SingleDownloads data={data as Array<vidFormat>}/>;
      }
      else{
        // it can either be a video or a playlist
             if("type" in data ){
              //it is a pplaylist
              return <Downloads data={data}/>
      }
      //if it reaches here it is a single video
      return <SingleDownloads data={[data] as Array<vidFormat>}/>; 
      }

    }
  }

  //TODO: return a component that shows that there are no downloads
  //return <EmptyDownload/>
  return <div>search to download</div>;
};

export default DownloadContaner;
