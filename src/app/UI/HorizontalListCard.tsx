import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { useContext, useState } from "react";
//import io from "socket.io-client";
import { DataContext, vidFormat } from "../contextProviders/data";
import { ProgressProvider } from "../contextProviders/progressContext";
import DownloadBtn from "./DownloadBtn";
import ProgressUi from "./ProgressUi";

export type format = {
  approxDurationMs?: string;
  averageBitrate?: number;
  bitrate: number;
  contentLength: string;
  qualityLabel: string;
  url: string;
  itag: number;
};
type Props = vidFormat;

export const getVideoSize = (quality: string, customFormats: format[]) => {
  //get the format with the quality
  const currFormat = customFormats.find(
    (item) => item.qualityLabel === quality
  );

  const size = parseInt(currFormat?.contentLength || "0");
  //check if the size is up to 1mb if yes return the size in mb else return the size in kb
  var sizeInMb = size / (1024 * 1024);
  if (sizeInMb > 1) {
    return `${sizeInMb.toFixed(0)}MB`;
  } else {
    return `${(size / 1024).toFixed(0)}KB`;
  }
};

const HorizontalListCard = ({ videoDetails: item, customFormats }: Props) => {


  const {setData}=useContext(DataContext)
  const [quality, setQuality] = useState<string>(customFormats[0].qualityLabel);

  const format = customFormats.find((item) => item.qualityLabel === quality)!;

  const handlevalueChange = (value: string) => {
    const videoId=item.video_url
    setQuality(value);
    //since data is an array of vidFormat we need to find the object in the data that has the video_url that matches the video_url of the current video and update the object format to the new format
    const newData=setData((prevData)=>{
      if(Array.isArray(prevData)){
        return prevData!.map((item)=>{
          if(item.videoDetails.video_url===videoId){
            return {...item,format:format.itag}
          }
          return item
        })
      }
      else if(typeof prevData==='object'){
        return {...prevData as vidFormat,format:format.itag}
      }
      return prevData
    })
  };

  return (
    <ProgressProvider>
    <Card className="pt-6  ">
      <CardContent className="w-[496px]  rounded flex-col justify-center items-start gap-3 flex">
        <div className="h-[60px]  flex ">
          <Image
            alt="video image"
            height="60"
            width="100"
            className="rounded"
            src={item?.thumbnails[2].url}
          />
          <div className=" h-full  flex-col justify-between items-start ml-2 mr-4 flex">
            <div className="h-[25px] pt-px justify-end items-center flex">
              <div className="w-[278px] truncate">
                <span className="text-black text-sm font-normal truncate font-['Roboto'] leading-normal">
                  {item?.title}{" "}
                </span>
              </div>
            </div>
            <div className="justify-between w-full items-center mt-1 flex">
              <div className=" text-black text-xs font-normal font-['Segoe UI Emoji'] leading-tight">
                <span className="font-semibold ">Size:</span>{" "}
                {getVideoSize(quality, customFormats)}
              </div>
              <div className="ml-2 text-black flex items-center text-xs font-normal font-['Segoe UI Emoji'] leading-tight ">
                <span className="font-semibold mr-1">Quality:</span>
                <Select value={quality} onValueChange={handlevalueChange}>
                  <SelectTrigger className="w-fit px-[7px] py-[2px] h-6 bg-accent">
                    <SelectValue placeholder={customFormats[0].qualityLabel} />
                  </SelectTrigger>
                  <SelectContent>
                    {customFormats.map((item, index) => (
                      <SelectItem key={index} value={item.qualityLabel}>
                        {item.qualityLabel}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
         <DownloadBtn videoDetails={item} customFormats={customFormats} quality={quality} />
        </div>
      <ProgressUi videoId={item.videoId}/>
      </CardContent>
    </Card>
    </ProgressProvider>
  );
};

export default HorizontalListCard;
