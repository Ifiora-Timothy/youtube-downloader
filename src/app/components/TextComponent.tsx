import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import Emoji from "react-emoji-render";
import SearchCard from "../UI/SearchCard";
import { SearchResults } from "../providers/data";

type Props = {
  searchResults:SearchResults;
};

const TextComponent = ({ searchResults={items:[],query:"",results:0} }: Props) => {

  console.log(searchResults,"searchResults");
  return (
    <div className="rounded ease-in transition-all p-3 ml-auto top-10 w-[470px] absolute z-10 ">
      <div className=" gap-2 overflow-y-auto  flex items-center justify-center flex-col s">
        {(searchResults?.items&&searchResults?.items.length) > 0 ? (
           <SearchCard searchResults={searchResults}/> 
         
        ) : (
          <Card className="bg-slate-50 w-[400px]">
            <CardHeader className=" pb-0">
              <CardTitle className="purpleText ">OOPS!</CardTitle>
            </CardHeader>
            <CardContent className="">
              <Emoji
                className=" text-xs "
                text="...type in the search box to start searching 🧐"
              />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TextComponent;
