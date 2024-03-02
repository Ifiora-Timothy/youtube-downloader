"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { clsx } from "clsx";
import {
  Link,
  Loader2,
  Search as SearchIcon,
  TextSearch,
  X,
} from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Control, useForm } from "react-hook-form";
import { z } from "zod";
import { trpc } from "../_trpc/client";
import { DataContext, SearchResults } from "../providers/data";
import TextComponent from "./TextComponent";
type Props = {};
const urlSchema=z.object({
 text: z.string().startsWith("https://", { message: "Must provide a secure URL" })
})
const textSchema=z.object({
  text:z.string().min(3, { message: "string should contain more than three letters" })

})
const formSchema = z.union([urlSchema, textSchema]);
type vid = {
  author: string;
  title: string;
  lengthInSecs: number;
  uploadDate: string;
  thumbnail: {
    url: string;
    width: number;
    height: number;
  };
};

export interface IsingleVid {
  videos: vid;
}

export interface ImultipleVid {
  videos: Array<vid>;
}

export interface Iplaylist {
  author: string;
  listTitle: string;
  totalLengthInSecs: number;
  uploadDate: string;
  thumbnail: {
    url: string;
    width: number;
    height: number;
  };
  videos: Array<vid>;
}
export type vidType = IsingleVid | ImultipleVid | Iplaylist;
const Search = (props: Props) => {
  const [isSearch, setIsSearch] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [text, setUrl] = useState<string>("");

  const context = useContext(DataContext);
  const {setData,mode,setMode,data} = context;
  console.log(data);

  const query = trpc[mode].useQuery(
    { text},
    { enabled: false, refetchOnWindowFocus: false }
  );

  if (query.isSuccess && query.data.vidInfo) {
    setData(query.data.vidInfo);
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: async (data, context, options) => {
      return zodResolver(formSchema)(data, context, options);
    },
    defaultValues: { text: "" },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    query.refetch();
  }
  useEffect(() => {
    console.log(query.fetchStatus, query.status);
  }, [query.fetchStatus, query.status]);

  return (
    <div className="w- flex mt-4 flex-col items-center  relative">
      <div className="justify-end   mx-auto items-stretch  flex">
        <div
          //  style={{ boxShadow: "-3px 1px 33px 7px rgba(165,57,227,0.2)" }}
          className={clsx(
            "flex  text-black focus-visible:ring-1  h-fit w-fit   mr-2 rounded-md p-0 m-0"
          )}
        >
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-x-4 bg-none space-y-0 items-center flex gap-1"
            >
              <div
                style={{ boxShadow: "-3px 1px 33px 7px rgba(165,57,227,0.2)" }}
                className="relative w-[290px] rounded-md  shadow-sm bg-white"
              >
                <Button
                  className="bg-transparent absolute inset-y-0  left-0 top-1/2 transform -translate-y-1/2 flex items-center pl-3"
                  disabled
                  variant="ghost"
                >
                  {mode==="getSearchInfo" ? (
                    <TextSearch className="text-purple-900 " />
                  ) : (
                    <Link className=" text-purple-900" />
                  )}
                </Button>
                <FormField
                  control={form.control}
                  name="text"
                  render={({ field }) => (
                    <FormItem className="block w-full rounded-md border-0  py-[1px] pl-7 pr-7 ring-1 ring-inset ring-gray-300 focus-within:ring-1 focus-within:ring-inset focus-within:ring-purple-600   ">
                      <FormControl>
                        <Input
                          className="focus-visible:ring-0 text-gray-900  shadow-none w-full  placeholder:text-gray-400 outline-none font-normal font-['Segoe UI Emoji'] sm:text-sm sm:leading-6    border-none  "
                          type="text"
                          placeholder={
                            mode==="getSearchInfo"
                              ? "type in the keyword..."
                              : "https://example.com/playlist..."
                          }
                          {...field}
                          onChange={(e) => {
                            setUrl(e.target.value);
                            field.onChange(e);
                          }}
                        />
                      </FormControl>
                      <FormMessage
                        className="absolute w-max left-1/2 transform -translate-x-1/2"
                        id="text"
                      />
                    </FormItem>
                  )}
                />

                <Button
                  className="bg-transparent hover:bg-transparent text-destructive absolute inset-y-0  right-0 top-1/2 transform -translate-y-1/2 flex items-center pr-3 pl-0"
                  variant="destructive"
                  type="reset"
                  onClick={() => form.reset()}
                >
                  <X />
                </Button>
              </div>

              <div
                style={{ boxShadow: "-3px 1px 33px 7px rgba(165,57,227,0.2)" }}
                className="rounded"
              >
                <Select value={mode}
                  onValueChange={(e:"getVideoInfo"|"getSearchInfo") => {setMode(e)}}>
                  <SelectTrigger className="w-[80px] ring-1 border-none focus:ring-purple-600  ring-gray-300 bg-white">
                    <SelectValue placeholder="URL"></SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="getVideoInfo">URL</SelectItem>
                    <SelectItem value="getSearchInfo">NAME</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <SubmitButton
                isSubmitting={query.isFetching}
                control={form.control}
              />
            </form>
          </Form>
        </div>
      </div>
      {mode==="getSearchInfo" ? <TextComponent searchResults={data as SearchResults} /> : null}
    </div>
  );
};

export default Search;

function SubmitButton({
  control,
  isSubmitting,
}: {
  control: Control<{ text: string }, any, { text: string }>;
  isSubmitting: boolean;
}) {
  return (
    <Button
      type="submit"
      aria-disabled={isSubmitting}
      style={{ boxShadow: "-3px 1px 33px 7px rgba(165,57,227,0.2)" }}
      className=" ml-2 ring-1 ring-inset ring-gray-300 purpleGradient hover:bg-purple-600  "
    >
      {isSubmitting ? (
        <Loader2 className="h-5 w-5 animate-spin text-gray-50 " />
      ) : (
        <>
          Search <SearchIcon className="text-sm h-[17px]" />
        </>
      )}
    </Button>
  );
}
