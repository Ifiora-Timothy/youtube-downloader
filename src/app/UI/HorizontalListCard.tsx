import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import ytdl from "@distube/ytdl-core";
import { Download } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { downloadVideo } from "../lib/yt/ytdlUtils";

export type format = {
  approxDurationMs: string;
  averageBitrate: number;
  bitrate: number;
  contentLength: string;
  qualityLabel: string;
  url: string;
  itag: number;
};
type Props = {
  data: ytdl.MoreVideoDetails;
  formats: format[];
};

const HorizontalListCard = ({ data: item, formats }: Props) => {
  console.log(item, "horizontal list card");
  const [quality, setQuality] = useState<string>(formats[0].qualityLabel);
  const format = formats.find((item) => item.qualityLabel === quality)!;
  const url = format.url;

  console.log(url, "url");

  const downloadVid = async () => {
    console.log("ready to download video");
    
    if (format) {
      const res = await downloadVideo(item.video_url,item.title, { quality: format.itag });
      console.log(res, "res");
      
      if (res instanceof Error) {
        toast.error(res.message);
      }
      if (res?.message) {
        toast.success("video downloaded successfully");
      }
    }
  };

const getVideoSize=(quality:string)=>{
    //get the format with the quality
const currFormat = formats.find((item) => item.qualityLabel === quality);
   
    const size=parseInt(currFormat?.contentLength||"0")
    //check if the size is up to 1mb if yes return the size in mb else return the size in kb
    var sizeInMb=size/(1024*1024)
    if(sizeInMb>1){
        return `${sizeInMb.toFixed(0)}MB`}
    else{
        return `${(size/1024).toFixed(0)}KB`
    
    }
}


  return (
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
                <span className="font-semibold ">Size:</span> {getVideoSize(quality)}
              </div>
              <div className="ml-2 text-black flex items-center text-xs font-normal font-['Segoe UI Emoji'] leading-tight ">
                <span className="font-semibold mr-1">Quality:</span>
                <Select onValueChange={(e) => setQuality(e)}>
                  <SelectTrigger className="w-fit px-[7px] py-[2px] h-6 bg-accent">
                    <SelectValue placeholder={formats[0].qualityLabel} />
                  </SelectTrigger>
                  <SelectContent>
                    {formats.map((item, index) => (
                      <SelectItem key={index} value={item.qualityLabel}>
                        {item.qualityLabel}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <Button onClick={downloadVid} className="bg-purple-600  h-full">
            <Download />
          </Button>
        </div>
        <Progress
          indicatorColor="bg-purple-600"
          value={33}
          className="w-[459px]   bg-gray-700 "
        />
      </CardContent>
    </Card>
  );
};

export default HorizontalListCard;
