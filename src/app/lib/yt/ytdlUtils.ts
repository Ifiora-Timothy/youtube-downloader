import ytdl from '@distube/ytdl-core'
import fs from 'fs'
//get the youtube video info
export const getVideoInfo = async (url: string) => {

    try {
       await ytdl.getInfo(url).then(info => {
            console.log(info)
            return info
        })
    }
    catch (err: any) {
        console.log(err.message)
        if (err instanceof Error) return new Error(`could not get the basic info ${err.message}`);
        return new Error("something went wrong")
    }
}

//fxn to download a video
export const downloadVideo =async (url: string) => {
    try {
        ytdl(url).pipe(fs.createWriteStream("video.mp4"))
        return({message:"success"})
    }
    catch (err: any) {
        console.log(err.message)
        if (err instanceof Error) return new Error(`could not get the basic info ${err.message}`);
        return new Error("something went wrong")
    }
}