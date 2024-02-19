import Image from "next/image";
import MainImage from "@/app/assets/images/largeWhitebg.png";

export default function Home() {
  return (
    <main className="w-full  relative bg-purple-900">
      <section className="w-full  flex items-center mt-[70px] flex-col ">
        <div className="w-full px-[170px] pb-2 left-0 justify-center items-center flex">
          <div className="w-[923px] text-center text-white text-[40px] font-bold font-['Roboto'] leading-[48px]">The Ultimate Media Conversion Platform</div>
        </div>
        <div className="h-14 pl-4 pr-1.5  ">
          <div className="w-[490px] text-center text-zinc-200 text-base font-normal font-['Segoe UI Emoji'] leading-7">Convert, download, and manage your media files all in one place with ease and efficiency.</div>
        </div>
        <div className="w-[146px] h-[45px] px-8 pt-[11px] pb-2.5 mt-7  bg-purple-600 rounded-full justify-center items-center flex">
          <div className="w-[82px] text-center text-white text-sm font-semibold font-['Roboto'] leading-normal">Get Started</div>
        </div>
      </section>
      <section className="w-full mb-10 mt-10">
        <div className="grow shrink basis-0 self-stretch px-4 ">
          <div className=" justify-center  items-center  flex">
            <div className="relative flex-col justify-start items-start flex">
              <div className="pr-[230px] pb-0.5 justify-start items-center flex">
                <div className="w-[310px] text-white text-2xl font-bold font-['Roboto'] leading-9">Your Media, Your Way</div>
              </div>
              <div className="w-[470px] text-sm  justify-start  mb-2 items-center flex">
                <div className=" text-zinc-200 w text-sm font-normal font-['Segoe UI Emoji'] leading-normal">Effortlessly convert videos, playlists, and images to your preferred format with our advanced tools.</div>
              </div>
              <div className="pl-5 text-zinc-300 text-xs font-normal font-['Segoe UI Emoji'] leading-normal flex-col justify-center items-start gap-1 flex">
                <div className="self-stretch grow shrink basis-0 justify-start items-center flex">
                  <div className="">Download videos or entire playlists</div>
                </div>
                <div className="self-stretch grow shrink basis-0 justify-start items-center flex">
                  <div className="">Convert MP3 to MP4 and vice versa</div>
                </div>
                <div className="self-stretch grow shrink basis-0 justify-start items-center flex">
                  <div className="">Transform images into videos</div>
                </div>
                <div className="self-stretch grow shrink basis-0 justify-start items-center flex">
                  <div className="l">Comprehensive file format support</div>
                </div>
                <div className="self-stretch grow shrink basis-0  justify-start items-center flex">
                  <div className="">Trim and split videos with precision</div>
                </div>
              </div>
              <div className="w-[147px] h-[45px] mt-4 px-8 pt-[4px] pb-[4px] bg-purple-600 rounded-full justify-center items-center flex">
                <div className="text-white text-sm font-semibold font-['Roboto'] leading-normal">Learn More</div>
              </div>
            </div>
            <div className="h-[300px] pr-10 justify-start items-center flex">
              <div className="w-[500px] h-[300px] relative rounded-lg shadow flex-col justify-start items-start flex">
                <Image alt="main image" src={MainImage} height="300" width="500" />
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}