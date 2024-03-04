import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useContext } from "react";
import { vidFormat } from "../contextProviders/data";
import { ProgressContext } from "../contextProviders/progressContext";
import { downloadVideo } from "../lib/yt/ytdlUtils";

type Props = vidFormat & { quality: string };

const DownloadBtn = ({ customFormats, videoDetails: item, quality }: Props) => {

const {startTracking}= useContext(ProgressContext)

  const format = customFormats.find((item) => item.qualityLabel === quality)!;
  const downloadVid = async () => {
    if (format) {
      console.log("reached", {
        url: item.video_url,
        title: item.title,
        id: item.videoId,
        options: {
          quality: format.itag,
        },
      });

      const resPromise =  downloadVideo({
        url: item.video_url,
        title: item.title,
        id: item.videoId,
        options: {
          quality: format.itag,
        },
      });
      startTracking(item.videoId)
      const res= await resPromise
      console.log(res);

      // toast.promise(res, {
      //   loading: "downloading video",
      //   success: (data: { message: "success"; downloadPath: string }) => {
      //     return ` success, saved as ${data.downloadPath}`;
      //   },
      //   error: (err) => {
      //     return err.message;
      //   },
      // });
    }
  };
  return (
    <Button
      onClick={async () => {
        await downloadVid();
      }}
      className="bg-purple-600  h-full"
    >
      <Download />
    </Button>
  );
};

export default DownloadBtn;
