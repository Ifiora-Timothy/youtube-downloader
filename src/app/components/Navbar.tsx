import React from 'react'

type Props = {}

const Navbar = (props: Props) => {
    return (
        <nav className="w-full h-[68px] pl-14 pr-[55px] py-4  bg-purple-800  justify-center items-center inline-flex">
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
        </nav>
    )
}

export default Navbar