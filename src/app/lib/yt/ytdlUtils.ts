"use server";
import progressEmitter, { PlaylistProgressEmitter } from "@/app/lib/utils/progressEmitter";
import ytdl from "@distube/ytdl-core";
import ytpl from "@distube/ytpl";
import ytsr from "@distube/ytsr";
import { log, time } from "console";
import fs from "fs";
import os from "os";
import { Readable, pipeline } from "stream";
import { Transform, Writable } from "stream-json/streamers/StreamArray"; // Import the missing module
import { promisify } from "util";
//get the youtube video info

const removeEmojifromString = (str: string) => {
  if (!str) return "";
  return str.replace(
    /[\uD800-\uDBFF][\uDC00-\uDFFF]|[\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDCFF]|\uD83E[\uDD00-\uDDFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]/g,
    ""
  );
};
export type multipledownload = {
  url: string;
  videoId: string;
  title: string;
  options?: ytdl.downloadOptions;
  playlistPath?: string;
  playlistId?:string
};
//fxn to download a video
type downloadProps = {
  id: string;
  url: string;
  title: string;
  options?: ytdl.downloadOptions;
  playlistPath?: string;
};
const activeDownloads = new Set();
const activePlaylist = new Set();

export const downloadVideo = async ({
  id,
  url,
  title,
  options,
  playlistPath,
}: downloadProps) => {
  // Store the video in the downloads folder in the home directory
  const homeDir = os.homedir();
  const newTitle = removeEmojifromString(title);
  const newPlaylistPath = playlistPath
    ? removeEmojifromString(playlistPath)
    : null;
  log("hello");
  let downloadDir;
  if (newPlaylistPath) {
    var downloadPath = `${homeDir}/Downloads/${newPlaylistPath.replace(
      /\//g,
      "-"
    )}`;
    downloadDir = `${downloadPath}/${newTitle.replace(/\//g, "-")}.mp4`;

    if (!fs.existsSync(downloadPath)) {
      fs.mkdirSync(downloadPath);
      console.log(downloadPath, " created successfully");
    }
  } else {
    downloadDir = `${homeDir}/Downloads/${newTitle.replace(/\//g, "-")}.mp4`;

    console.log(downloadDir);
  }

  try {
    const writableStream = fs.createWriteStream(downloadDir);

    //add the video id to the activedownloads set
    activeDownloads.add(id);
    //download the video
    const toDownload = ytdl(url, options);

    //emit an initial progres of zero
    progressEmitter.emit(id, 0);

    const pipelineAsync = promisify(pipeline);

    toDownload.on("progress", (chunkLength, downloaded, total) => {
      const percent = (downloaded / total) * 100;

      //emit the download progress
      progressEmitter.emit(id,percent);
    });

    writableStream.on("finish", () => {
      activeDownloads.delete(id);
    });
    //pipe the readablestream to the writable stream
    pipelineAsync(toDownload, writableStream);

    //revalidatePath("/ytDownload");

    return {
      message: "success",
      downloadPath: `/Downloads/${newPlaylistPath ?? newTitle + ".mp4"}`,
    };
  } catch (err: any) {
    if (err instanceof Error)
      return new Error(`could not get the basic info ${err.message}`);
    return new Error("something went wrong");
  }
};
export const sdownloadMultipleVideos = async (data: multipledownload[]) => {
  time("streaming download time");
  try {
   if(data[0].playlistId){activePlaylist.add(data[0].playlistId)}
    const readableStream = Readable.from(data, { objectMode: true });
    const pipelineAsync = promisify(pipeline);
    const batchTransformStream = new Transform({
      objectMode: true,
      highWaterMark: 10,
      transform(chunk, encoding, callback) {
        this.push(chunk);
        callback();
      },
    });

    const asyncTransform = new Transform({
      objectMode: true,
      async transform(chunk, encoding, callback) {
        console.log("transforming data");
        // console.log(chunk, "chunk");

        const { url, title, options, playlistPath, videoId } = chunk;
   
        const transformedChunk = await downloadVideo({
          url: url,
          title: title,
          options: options,
          id: videoId,
          playlistPath: playlistPath,
        });

        console.log("success");

        callback(null, { ...chunk, ...transformedChunk });
      },
    });

    const transformedData: any[] = [];
    const writableStream = new Writable({
      objectMode: true,
      write(chunk, encoding, callback) {
        console.log("received data");

        transformedData.push(chunk);
        callback();
      },
    });

    try {

      await pipelineAsync(
        readableStream,
        batchTransformStream,
        asyncTransform,
        writableStream
      );

      const totalChunks = data.length;
      let completedChunks = 0;


        const onProgress = (chunk: any) => {
          completedChunks++;
          const progress = (completedChunks / totalChunks) * 100;
          console.log(`Progress: ${progress.toFixed(2)}%`);
  
          // Check if chunk.progress is defined before accessing its percentage property
          if (chunk.progress && chunk.progress.percentage) {
            const individualProgress = (chunk.progress.percentage * progress) / 100;
            console.log(`Individual Progress: ${individualProgress.toFixed(2)}%`);
          }
        };
  

      // Call the onProgress function for each chunk processed
      transformedData.forEach(onProgress);

     
      console.log("piprline completed successfully");
      //console.log(transformedData);

      return {
        message: "Playlist downloaded successfully",
        path: transformedData[0].downloadPath,
      };
    } catch (err) {
      console.error("pipeline failed", err);
      throw new Error("pipeline failed");
    }

    // const res = JSON.parse(JSON.stringify(transformedData));
    //console.log(res);

    // return res;
  } catch (err: any) {
    if (err instanceof Error)
      throw new Error(`could not get the basic info ${err.message}`);
    throw new Error("something went wrong");
  }
};

// this does the same thing with the above but we are making use of the above
export const downloadMultipleVideos = async (data: multipledownload[]) => {
  console.time("normal download time");
  const batchSize = 10; // Set the batch size according to your needs
  const totalBatches = Math.ceil(data.length / batchSize);
  const newItems: unknown[] = [];
  try {
    for (let i = 0; i < totalBatches; i++) {
      const batch = data.slice(i * batchSize, (i + 1) * batchSize);
      const promiseItems = batch.map(async (item) => {
        const newItem = downloadVideo({
          url: item.url,
          title: item.title,
          id: item.videoId,
          options: item.options,
        });

        return newItem;
      });

      const batchResults = await Promise.all(promiseItems);
      newItems.push(...batchResults);
    }

    console.timeEnd("normal download time");

    return newItems;
  } catch (err) {
    console.timeEnd("normal download time");
    return err;
  }
};

export const getDownloadProgress = (
  videoId: string
): Promise<number> | null => {
  // console.log(
  //   "reached progress",
  //   videoId,
  //   activeDownloads,
  //   activeDownloads.has(videoId)
  // );

  if (!activeDownloads.has(videoId)) {
    console.log("'empt");
PlaylistProgressEmitter.emit(activePlaylist.keys().next().value,(1/(activeDownloads.size+1)))

    return null;
  }
 // log(videoId, "progress here");
  return new Promise((resolve) => {
    const listener = (progress: number) => {
      resolve(progress);
      progressEmitter.off(videoId, listener);
    };
    progressEmitter.once(videoId, listener);
  });
};

export const getPlaylistProgress = (
  playlistId: string
): Promise<number> | null => {

  if (!activePlaylist.has(playlistId)) {
    console.log("'empt");


    return null;
  }
log(playlistId, "progress here");
  return new Promise((resolve) => {
    const listener = (progress: number) => {
      resolve(progress);
      PlaylistProgressEmitter.off(playlistId, listener);
    };
    PlaylistProgressEmitter.once(playlistId, listener);
  });
};

export type vidRequired = {
  author: {
    name: string;
    channel_url: string;
  };
  title: string;
  videoId: string;
  video_url: string;
  thumbnails: {
    url: string;
    height: number;
    width: number;
  }[];
  publishDate: string;
  type: "single";
};

export const getVideoInfo = async (url: string) => {
  try {
    const info = await ytdl.getBasicInfo(url);
    const { videoDetails, formats } = info;
    //filter the videodetails to the type of vidRequired
    const newVideoDetails: vidRequired = {
      author: {
        name: videoDetails.author.name,
        channel_url: videoDetails.author.channel_url,
      },
      title: videoDetails.title,
      videoId: videoDetails.videoId,
      video_url: videoDetails.video_url,
      thumbnails: videoDetails.thumbnails,
      publishDate: videoDetails.publishDate,
      type: "single",
    };

    const uniqueQuality = formats.reduce<{ [key: string]: any }>(
      (acc, curr) => {
        if (curr.qualityLabel && curr.bitrate) {
          if (!acc[curr.qualityLabel]) {
            acc[curr.qualityLabel] = curr;
          } else {
            if (acc[curr.qualityLabel].bitrate < curr.bitrate) {
              acc[curr.qualityLabel] = curr;
            }
          }
        }
        return acc;
      },
      {}
    );
    const customFormats = Object.values(uniqueQuality).map(
      ({
        averageBitrate,
        itag,
        qualityLabel,
        contentLength,
        bitrate,
        url,
        approxDurationMs,
      }) => ({
        averageBitrate,
        qualityLabel,
        itag,
        contentLength,
        bitrate,
        url,
        approxDurationMs,
      })
    );

    const customVideoDetails = JSON.parse(
      JSON.stringify({ videoDetails: newVideoDetails, customFormats })
    );

    return customVideoDetails;
  } catch (err: any) {
    console.log(err, "error in get video info");

    if (err instanceof Error)
      return new Error(`could not get the basic info ${err.message}`);
    return new Error("something went wrong");
  }
};

export const getSearchInfo = async (url: string) => {
  console.log(url, "url in get video info");
  const searchResults = await ytsr(url, { safeSearch: true, limit: 4 });

  //a promise is stil beinig returned
  const promiseItems = searchResults.items.map(async (element, index) => {
    const newItem = await getVideoInfo(element.url);
    return newItem;
  });

  //to get the values in their nrormal format
  const newItems = await Promise.all(promiseItems);
  const newSearchResults = { ...searchResults, items: newItems };

  try {
    return JSON.parse(JSON.stringify(newSearchResults));
  } catch (err: any) {
    if (err instanceof Error)
      return new Error(`could not get the basic info ${err.message}`);
    return new Error("something went wrong");
  }
};
export const getPlaylistInfo = async (url: string) => {
  console.log(url, "url in get playlist info");

  try {
    const info = await ytpl(url);
    const videos = info.items;
    //   console.log(videos);

    const readableStream = Readable.from(videos, { objectMode: true });
    const pipelineAsync = promisify(pipeline);
    //transform the data

    const batchTransformStream = new Transform({
      objectMode: true,
      highWaterMark: 10,
      transform(chunk, encoding, callback) {
        this.push(chunk);
        callback();
      },
    });

    const asyncTransform = new Transform({
      objectMode: true,
      async transform(chunk, encoding, callback) {
        console.log("transforming data");

        const { url } = chunk;
        const transformedChunk: any = await new Promise((resolve, reject) =>
          resolve(getVideoInfo(url))
        );

        callback(null, { ...chunk, ...transformedChunk });
      },
    });

    const transformedData: any[] = [];
    const writableStream = new Writable({
      objectMode: true,
      write(chunk, encoding, callback) {
        console.log("received data");

        transformedData.push(chunk);
        callback();
      },
    });

    try {
      await pipelineAsync(
        readableStream,
        batchTransformStream,
        asyncTransform,
        writableStream
      );
      console.log("piprline completed successfully");
    } catch (err) {
      console.error("pipeline failed", err);
      return new Error("pipeline failed");
    }

    const playlistDetails = JSON.parse(
      JSON.stringify({ ...info, items: transformedData, type: "playlist" })
    );
    return playlistDetails;
  } catch (err: any) {
    if (err instanceof Error)
      return new Error(`could not get the basic info ${err.message}`);
    return new Error("something went wrong");
  }
};
