"use server"
import ytdl from '@distube/ytdl-core';
import fs from 'fs';
//get the youtube video info

const removeEmojifromString = (str: string) => {
    if(!str) return "";
    return str.replace(/[\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDCFF]|\uD83E[\uDD00-\uDDFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]/g, '');


}

export const getVideoInfo = async (url: string) => {
console.log(url,"url in get video info");

    try {
    const info= await ytdl.getBasicInfo(url)
  //  console.log(info);
    const { videoDetails,formats }  = info
    const uniqueQuality = formats.reduce<{[key:string]:any}>((acc,curr)=>{
        if(curr.qualityLabel&&curr.bitrate){
            if(!acc[curr.qualityLabel]){
                acc[curr.qualityLabel]=curr
            }else{
                if(acc[curr.qualityLabel].bitrate<curr.bitrate){
                    acc[curr.qualityLabel]=curr
                }
            }
        }
        return acc
    },{})
    const customFormats=   Object.values(uniqueQuality).map(({ averageBitrate,itag,qualityLabel,contentLength,bitrate,url,approxDurationMs }) => ({ averageBitrate,qualityLabel,itag,contentLength,bitrate,url,approxDurationMs }));

const customVideoDetails=JSON.parse(JSON.stringify({videoDetails,customFormats}))    


return customVideoDetails


    }
    catch (err: any) {
        if (err instanceof Error) return new Error(`could not get the basic info ${err.message}`);
        return new Error("something went wrong")
    }
}

//fxn to download a video
export const downloadVideo =async (url: string,title:string,options?:ytdl.downloadOptions) => {
console.log(url,"url in download video");

    //store the vidoe in the downloads folder in the home directory
    const homeDir = require('os').homedir();
    const newTitle=removeEmojifromString(title)
    const downloadDir = `${homeDir}/Downloads/${newTitle}.mp4`
console.log(downloadDir,"download dir");


    try {
        const writableStream = fs.createWriteStream(downloadDir)

     const downloaded=   ytdl(url,options).pipe(writableStream)
if(downloaded.writableFinished){
    console.log("successfully downloaded the video")
    return({message:"success"})

}
        writableStream.on('finish',()=>{
            console.log("successfully downloaded the video")
            return({message:"success"})
        })
        writableStream.on('pipe',(src)=>{
            console.log(src,"piped")
        })
        writableStream.on('error',(err)=>{
            return new Error(`could not write to the file ${err.message}`)
        })  
    }
    catch (err: any) {
        if (err instanceof Error) return new Error(`could not get the basic info ${err.message}`);
        return new Error("something went wrong")
    }
}