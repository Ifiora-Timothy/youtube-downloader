import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { toast } from "sonner";
import { vidFormat } from "../contextProviders/data";
import { multipledownload, sdownloadMultipleVideos } from "../lib/yt/ytdlUtils";

export type verticalCard = {
  id: string;
  url: string;
  title: string;
  items: vidFormat[];
  last_updated: string;
  author_name?: string;
  author_img?: string;
  thumbnail: string;
  total_items: number;
};

type Props = verticalCard;

const VerticalListCard = ({
  id,
  url,
  title,
  last_updated,
  author_img,
  author_name,
  items,
  thumbnail,
  total_items,
}: Props) => {
  const downloadData: multipledownload[] = items.map(
    ({ videoDetails, format }) => ({
      url: videoDetails.video_url,
      title: videoDetails.title,
      videoId:videoDetails.videoId,
      options: {
        quality: format,
      },
      playlistPath: title,
    })
  );
  const handleDownloadAll = async () => {
    //for normal download
    //const resNorm = await downloadMultipleVideos(downloadData)

    //for stream download
    const resStream = sdownloadMultipleVideos(downloadData);
    let response:any
  toast.promise(resStream, {
      loading: "downloading playlist",
      success: (data) => {
        response=data
        return `successfully downloaded to ${data.path}`;
      },
      error: "an error occurres",
    })
    const res=await resStream
 //   console.log(response,"here",res);
    
  };

  return (
    <Card className="w-[310px] ">
      <CardContent className=" gap-2 pt-6 relative p-[20px] rounded flex-col  items-center flex">
        <Image
          className="rounded-sm "
          alt="image placeolder"
          width="200"
          height="200"
          src={thumbnail}
        />
        <div className="w-[315px] h-7 justify-center items-center flex">
          <div className=" text-center text-black text-2xl font-bold font-['Roboto'] ">
            {title}
          </div>
        </div>
        <div className="flex-col text-zinc-700 text-[13px] items-center flex">
          <div className="w-[315px] h-5  justify-center items-center flex">
            <div className="text-cente   font-normal font-['Segoe UI Emoji'] ">
              {author_name || "Anonymous"}
            </div>
          </div>
          <div className="h-5 justify-center items-center flex">
            <div className="text-center  font-normal font-['Segoe UI Emoji'] ">
              Total Time: 3h 45m
            </div>
          </div>
          <div className="w-[315px] h-5 justify-center items-center flex">
            <div className="text-center  font-normal font-['Segoe UI Emoji'] ">
              Size: 1GB
            </div>
          </div>
        </div>

        <Button
          onClick={handleDownloadAll}
          className="bg-orange-600 mt-2 text-center px-4 py-2 "
        >
          Download All
        </Button>
        <Progress
          indicatorColor="bg-orange-500"
          value={33}
          className="w-[280px] mt-1   bg-gray-700 "
        />
      </CardContent>
    </Card>
  );
};

export default VerticalListCard;
