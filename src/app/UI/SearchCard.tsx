"use client";

import { BadgeMinus, BadgePlusIcon, Download } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import clsx from "clsx";

import { useContext, useState } from "react";
import { compareObjects, includesObj } from "../lib/utils/Functions";
import { DataContext, SearchResults, vidFormat } from "../providers/data";
type Props = {
  searchResults: SearchResults;
};

var status = "remaining";
const SearchCard = ({ searchResults }: Props) => {
  const { setData, setMode } = useContext(DataContext);
  const [selectedItems, setSelectedItems] = useState<Array<vidFormat>>([]);
  const numArray = [0];
  //foreach items in the selected items array add the new selected item index +1 to the numArray
  selectedItems.forEach((item, index) => {
    numArray.push(index + 1);
  });

  const addItem = (e: vidFormat) => {
    //prevent adding the same item twice
    //if the item is already in the selected items array remove it
    const vidDetails = e.videoDetails;
    if (includesObj({ array: selectedItems, object: vidDetails })) {
      console.log("here1");

      setSelectedItems(
        selectedItems.filter(
          (item) => !compareObjects(item.videoDetails, vidDetails)
        )
      );
      return;
    }
    console.log("here2");
    console.log([vidDetails, selectedItems]);

    setSelectedItems([...selectedItems, e]);
  };
console.log(searchResults)
  const handleSingleDownload = (data: vidFormat) => {
    setData(data);
    setMode("getVideoInfo");
  };
  return (
    <Card className="w-[440px] px-3 rounded flex-col justify-center items-start gap-3 flex">
      <CardHeader className="pb-0 w-full ">
        <CardTitle className="w-full flex justify-between ">
          Search Results for {searchResults.query}...
          <div className="underline py-2 px-4 underline-offset-2 shadow-inner w-10 overflow-hidden  shadow-purple-500  ">
            <div
              style={{
                transform: `translateX(-${selectedItems.length * 26}px)`,
                transition: "transform 1s ease",
              }}
              className={`flex  gap-4 `}
            >
              {numArray.map((item, index) => (
                <span key={index} className="current">
                  {item}
                </span>
              ))}{" "}
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-col flex scrollbar-thumb-rounded scrollbar-thumb-orange-600  scrollbar-track-rounded scrollbar-track-purple-300 scrollbar-thin gap-2 hover:scrollbar-thumb-orange-800 overflow-y-auto max-h-[300px]">
        {searchResults?.items.map(({ videoDetails, customFormats }, index) => (
          <Card
            className={clsx("rounded-sm ", {
              "bg-gray-100": includesObj({
                array: selectedItems,
                object: videoDetails,
              }),
            })}
            key={index}
          >
            <CardContent className=" items-center p-3 justify-between flex ">
              <Image
                alt="video image"
                height="70"
                width="60"
                className="rounded"
                src={videoDetails.thumbnails[2].url}
              />

              <div className=" flex-col justify-start items-start ml-2 mr-4 flex">
                <div className="pt-px justify-end items-center flex">
                  <div className="">
                    <div className="text-black truncate w-[200px]  overflow-y-hidden overflow-ellipsis text-sm font-normal font-['Roboto'] leading-tight">
                      {videoDetails.title}
                    </div>
                  </div>
                </div>
                <div className="justify-end items-center flex">
                  <div className=" text-black text-[10px] font-normal font-['Segoe UI Emoji']">
                    Size: 50MB
                    {/* TODO:remove this size attribute and put the date uploaded and possibly the time */}
                  </div>
                </div>
              </div>
              <Button
                onClick={() => addItem({ videoDetails, customFormats })}
                variant="ghost"
                className=" h-8 p-0 mr-1 w-8 text-opacity-70 hover:text-opacity-100 my-auto bg-transparent rounded hover:bg-transparent hover:text-gray-900 text-gray-700 justify-center items-center flex"
              >
                {includesObj({ array: selectedItems, object: videoDetails }) ? (
                  <BadgeMinus />
                ) : (
                  <BadgePlusIcon />
                )}
              </Button>
              <Button
                variant="ghost"
                className=" h-8 p-0  mr-0 w-8 my-auto bg-transparent rounded justify-center hover:bg-transparent items-center flex"
              >
                <Download
                  onClick={() =>
                    handleSingleDownload({ videoDetails, customFormats })
                  }
                />
              </Button>
            </CardContent>
          </Card>
        ))}
      </CardContent>
      <CardFooter className="text-xs w-full justify-between">
        {/* check if there are still reselts if yes show load more else show end of results */}
        {status === "remaining" ? (
          <Button
            className="bg-transparent hover:bg-transparent shadow-none border-none text-gray-900 text-opacity-70 hover:text-opacity-100 underline p-0 hover:bg-none"
            variant="default"
          >
            Load more...
          </Button>
        ) : (
          <p>End of results...</p>
        )}{" "}
        <Button
          onClick={() => {
            setData(selectedItems);
            setMode("getVideoInfo");
          }}
          className=" ml-2 ring-1 ring-inset ring-gray-300 purpleGradient hover:bg-purple-600  "
        >
          Download all selected <Download className="text-sm h-[17px]" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SearchCard;
