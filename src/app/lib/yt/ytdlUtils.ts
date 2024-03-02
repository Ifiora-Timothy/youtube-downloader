"use server";
import ytdl from "@distube/ytdl-core";
import ytsr from "@distube/ytsr";
import { log, time, timeEnd } from "console";
import fs from "fs";
import { revalidatePath } from "next/cache";
import os from "os";
import { Readable, pipeline } from "stream";
import { Parser } from "stream-json";
import { streamArray } from "stream-json/streamers/StreamArray"; // Import the missing module
import { promisify } from "util";
//get the youtube video info

const removeEmojifromString = (str: string) => {
  if (!str) return "";
  return str.replace(
    /[\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDCFF]|\uD83E[\uDD00-\uDDFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]/g,
    ""
  );
};
export type multipledownload = {
  url: string;
  title: string;
  options?: ytdl.downloadOptions;
};
//fxn to download a video
export const downloadVideo = async (
  url: string,
  title: string,
  options?: ytdl.downloadOptions
): Promise<unknown> => {
  console.log(url, "url in download video");

  // Store the video in the downloads folder in the home directory
  const homeDir = os.homedir();
  const newTitle = removeEmojifromString(title);
  const downloadDir = `${homeDir}/Downloads/${newTitle}.mp4`;
  console.log(downloadDir, "download dir");

  try {
    console.time("download time");

    const writableStream = fs.createWriteStream(downloadDir);

    const toDownload = ytdl(url, options);

    const pipelineAsync = promisify(pipeline);

    await pipelineAsync(toDownload, writableStream);
   
    console.timeEnd("download time");
    revalidatePath("/ytDownload");

    return {
      message: "success",
      downloadPath: `/Downloads/${newTitle}.mp4`,
    };
  } catch (err: any) {
    if (err instanceof Error)
      return new Error(`could not get the basic info ${err.message}`);
    return new Error("something went wrong");
  }
};
export const sdownloadMultipleVideos = async (data: multipledownload[]) => {
  time("streaming download time");
  console.log(data, "data in download multiple videos");
  const JsonData = JSON.stringify(data);

  const readableStream = Readable.from(JsonData);
  log(readableStream, "readable stream");
  const pipeline = readableStream.pipe(new Parser()).pipe(streamArray());
  log("pipeline");
  try {
    console.log("ready in stream");

    const promiseItems: Promise<unknown>[] = [];

    pipeline.on("data", async (data) => {
      log("reached");
      console.log(data, "data in streaming download");

      const newItem =  downloadVideo(
        data.value.url,
        data.value.title,
        data.value.options
      );
      log(newItem, "new item in streaming download");
      promiseItems.push(newItem);
    });

    pipeline.on("end", async () => {
      await Promise.all(promiseItems);
      timeEnd("streaming download time");
      console.log(promiseItems, "new items in download multiple videos");
    });

    pipeline.on("error", (err) => {
      console.log(err, "error in streaming download");
      timeEnd("streaming download time");
    });

    return promiseItems;
  } catch (err) {
    console.log("error in streaming download");

    timeEnd("streaming download time");
    return err;
  }
};

// this does the same thing with the above but we are making use of the above
export const downloadMultipleVideos = async (data: multipledownload[]) => {
  console.time("normal download time");
  console.log(data, "data in download multiple videos");
  const batchSize = 10; // Set the batch size according to your needs
  const totalBatches = Math.ceil(data.length / batchSize);
  const newItems: unknown[] = [];
  try {
    for (let i = 0; i < totalBatches; i++) {
      const batch = data.slice(i * batchSize, (i + 1) * batchSize);
      const promiseItems = batch.map(async (item) => {
        const newItem =  downloadVideo(item.url, item.title, item.options);

        return newItem;
      });

      const batchResults = await Promise.all(promiseItems);
      newItems.push(...batchResults);
    }

    console.timeEnd("normal download time");

    console.log(newItems, "new items in downloads multiple videos");
    return newItems;
  } catch (err) {
    console.timeEnd("normal download time");
    return err;
  }
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
};

export const getVideoInfo = async (url: string) => {
  console.log(url, "url in get video info");

  try {
    const info = await ytdl.getBasicInfo(url);
    //  console.log(info);
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
  console.log(newSearchResults, "search results");

  try {
    return JSON.parse(JSON.stringify(newSearchResults));
  } catch (err: any) {
    if (err instanceof Error)
      return new Error(`could not get the basic info ${err.message}`);
    return new Error("something went wrong");
  }
};
