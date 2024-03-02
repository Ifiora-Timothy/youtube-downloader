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
import { Download } from "lucide-react";
import Image from "next/image";
import { useContext, useState } from "react";
//import io from "socket.io-client";
import { toast } from "sonner";
import { downloadVideo } from "../lib/yt/ytdlUtils";
import { DataContext, vidFormat } from "../providers/data";

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
  console.log(item, "horizontal list card");
  const [quality, setQuality] = useState<string>(customFormats[0].qualityLabel);
  const [progress, setProgress] = useState<number>(0);

  const format = customFormats.find((item) => item.qualityLabel === quality)!;

  const downloadVid = async () => {
    console.log("ready to download video");

    if (format) {
      const res: Promise<any> = downloadVideo(item.video_url, item.title, {
        quality: format.itag,
      });
      toast.promise(res, {
        loading: "downloading video",
        success: (data: { message: "success"; downloadPath: string }) => {
          return ` success, saved as ${data.downloadPath}`;
        },
        error: (err) => {
          return err.message;
        },
      });
    }
  };

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
                <Select onValueChange={handlevalueChange}>
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
          <Button
            onClick={async () => {
              await downloadVid();
            }}
            className="bg-purple-600  h-full"
          >
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
