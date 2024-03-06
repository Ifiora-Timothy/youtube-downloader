import { Progress } from '@/components/ui/progress';
import clsx from 'clsx';
import { useContext } from 'react';
import { ProgressContext } from '../contextProviders/progressContext';

type Props = {
    videoId:string
}
    // Add this at the top of your file
    interface ProgressResponse {
        progress: number;
      }
const ProgressUi = ({videoId}: Props) => {
    const {progressMap}= useContext(ProgressContext)   
    //look up the progress for the specific video
     const progress=progressMap.get(videoId)|| 0;
    console.log(progressMap);
    

  return (
    <Progress
    indicatorColor={clsx({
      "bg-green-600":progress>=100,
      "bg-purple-600":progress<100
    })}
    value={progress}
    className="w-[459px]   bg-gray-700 "
  />
  )
}

export default ProgressUi