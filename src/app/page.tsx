import Image from "next/image";
import MainImage from "@/app/assets/images/largeWhiteBg.png"
export default function Home() {
  return (
    <main className="w-full  relative bg-purple-900">
      <div className="w-full h-[68px] pl-14 pr-[55px] py-4  bg-purple-800 bg-opacity-50 justify-center items-center inline-flex">
        <div className="grow shrink basis-0 self-stretch pl-4 pr-[17px] justify-center items-center gap-[512px] inline-flex">
          <div className="self-stretch justify-center items-start inline-flex">
            <div className=" text-white text-2xl font-bold font-['Roboto'] leading-9">Media</div>
            <div className="grow shrink basis-0 self-stretch justify-center items-center inline-flex">
              <div className=" text-purple-300 text-2xl font-bold font-['Roboto'] leading-9">Converter</div>
            </div>
            <div className="w-[49px] text-white text-2xl font-bold font-['Roboto'] leading-9">Pro</div>
          </div>
          <div className="w-[330px] h-6 pt-px pb-0.5 justify-center items-start gap-5 inline-flex">
            <div className="w-[43px] self-stretch justify-center items-center inline-flex">
              <div className="w-[43px] text-white text-sm font-normal font-['Segoe UI Emoji'] leading-normal">Home</div>
            </div>
            <div className="grow shrink basis-0 self-stretch justify-center items-center inline-flex">
              <div className="w-[60px] text-white text-sm font-normal font-['Segoe UI Emoji'] leading-normal">Features</div>
            </div>
            <div className="w-12 self-stretch justify-center items-center inline-flex">
              <div className="w-[49px] text-white text-sm font-normal font-['Segoe UI Emoji'] leading-normal">Pricing</div>
            </div>
            <div className="w-11 self-stretch justify-center items-center inline-flex">
              <div className="w-11 text-white text-sm font-normal font-['Segoe UI Emoji'] leading-normal">About</div>
            </div>
            <div className="w-[55px] self-stretch justify-center items-center inline-flex">
              <div className="w-[55px] text-white text-sm font-normal font-['Segoe UI Emoji'] leading-normal">Contact</div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-[344px] flex items-center justify-center flex-col gap-3">
        <div className="w-full px-[170px] pb-2 left-0 justify-center items-center flex">
          <div className="w-[923px] text-center text-white text-[40px] font-bold font-['Roboto'] leading-[48px]">The Ultimate Media Conversion Platform</div>
        </div>
        <div className="h-14 pl-4 pr-1.5  justify-center items-center flex">
          <div className="w-[490px] text-center text-zinc-200 text-lg font-normal font-['Segoe UI Emoji'] leading-7">Convert, download, and manage your media files all in one place with ease and efficiency.</div>
        </div>
        <div className="w-[146px] h-[45px] px-8 pt-[11px] pb-2.5  bg-purple-600 rounded-full justify-center items-center flex">
          <div className="w-[82px] text-center text-white text-sm font-semibold font-['Roboto'] leading-normal">Get Started</div>
        </div>
      </div>
      <div className="w-full h-[476px] pl-14  pr-[55px]    flex">
        <div className="grow shrink basis-0 self-stretch px-4 ">
          <div className="grow shrink basis-0 self-stretch justify-center items-center gap-10 inline-flex">
            <div className="w-[540px] h-[316px] relative flex-col justify-start items-start flex">
              <div className="pr-[230px] pb-0.5 justify-start items-center inline-flex">
                <div className="w-[310px] text-white text-2xl font-bold font-['Roboto'] leading-9">Your Media, Your Way</div>
              </div>
              <div className=" justify-start mt-4 mb-3 items-center inline-flex">
                <div className="w-[524px] text-zinc-100 text-sm font-normal font-['Segoe UI Emoji'] leading-normal">Effortlessly convert videos, playlists, and images to your preferred format with our advanced tools.</div>
              </div>
              <div className="w-[540px] pl-5 flex-col justify-center items-start gap-2 inline-flex">
                <div className="self-stretch grow shrink basis-0 justify-start items-center inline-flex">
                  <div className="text-sm text-zinc-200 font-normal font-['Segoe UI Emoji'] leading-normal">Download videos or entire playlists</div>
                </div>
                <div className="self-stretch grow shrink basis-0 justify-start items-center inline-flex">
                  <div className="text-zinc-200 text-sm font-normal font-['Segoe UI Emoji'] leading-normal">Convert MP3 to MP4 and vice versa</div>
                </div>
                <div className="self-stretch grow shrink basis-0 justify-start items-center inline-flex">
                  <div className="text-zinc-200  text-sm font-normal font-['Segoe UI Emoji'] leading-normal">Transform images into videos</div>
                </div>
                <div className="self-stretch grow shrink basis-0 justify-start items-center inline-flex">
                  <div className="text-zinc-200  text-sm font-normal font-['Segoe UI Emoji'] leading-normal">Comprehensive file format support</div>
                </div>
                <div className="self-stretch grow shrink basis-0  justify-start items-center inline-flex">
                  <div className="text-zinc-200  text-sm font-normal font-['Segoe UI Emoji'] leading-normal">Trim and split videos with precision</div>
                </div>
              </div>
              <div className="w-[147px] h-[45px] mt-4 px-8 pt-[4px] pb-[4px] bg-purple-600 rounded-full justify-center items-center inline-flex">
                <div className="text-white text-sm font-semibold font-['Roboto'] leading-normal">Learn More</div>
              </div>
            </div>
            <div className="grow shrink basis-0 h-[300px] pr-10 justify-start items-center inline-flex">
              <div className="w-[500px] h-[300px] relative rounded-lg shadow flex-col justify-start items-start flex">
                <Image alt="main image" src={MainImage} height="300" width="500"/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-[72px] pl-14 pr-[55px] py-6  bg-purple-800 bg-opacity-50 justify-center items-center inline-flex">
        <div className="grow shrink basis-0 self-stretch px-4 justify-center items-center inline-flex">
          <div className="grow shrink basis-0 self-stretch pl-[393px] pr-[385px] justify-end items-center inline-flex">
            <div className="text-center text-white text-base font-normal font-['Segoe UI Emoji'] leading-normal">© 2023 MediaConverterPro. All rights reserved.</div>
          </div>
        </div>
      </div>



    </main>
  );
}
