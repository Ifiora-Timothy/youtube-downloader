import { Progress } from '@/components/ui/progress';
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
    const {progress}= useContext(ProgressContext)

console.log(progress,"progress");

     
  return (
    <Progress
    indicatorColor="bg-purple-600"
    value={progress}
    className="w-[459px]   bg-gray-700 "
  />
  )
}

export default ProgressUi