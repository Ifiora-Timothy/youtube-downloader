import Link from 'next/link'
import React from 'react'

type Props = {}

const Navbar = (props: Props) => {
    return (
        <nav className="w-full h-[68px] pl-14 pr-[55px] py-4  bg-purple-800  justify-center items-center flex">
            <div className="grow shrink basis-0 self-stretch pl-4 pr-[17px]  items-center justify-between flex">
                <div className="self-stretch justify-center items-start flex">
                    <div className=" text-white text-2xl font-bold font-['Roboto'] leading-9">Media</div>
                    <div className="grow shrink basis-0 self-stretch justify-center items-center flex">
                        <div className=" text-purple-300 text-2xl font-bold font-['Roboto'] leading-9">Converter</div>
                    </div>
                    <div className="w-[49px] text-white text-2xl font-bold font-['Roboto'] leading-9">Pro</div>
                </div>
                <div className=" h-6 pt-px pb-0.5 justify-center items-start gap-5 flex">
                    <div className="w-[43px] self-stretch justify-center items-center flex">
                        <Link href='/choices' className="w-[43px] text-white text-sm font-normal font-['Segoe UI Emoji'] leading-normal">Choices</Link>
                    </div>
                    <div className="grow shrink basis-0 self-stretch justify-center items-center flex">
                        <Link href='#' className="w-[60px] text-white text-sm font-normal font-['Segoe UI Emoji'] leading-normal">Features</Link>
                    </div>
                    <div className="w-12 self-stretch justify-center items-center flex">
                        <Link href='#' className="w-[49px] text-white text-sm font-normal font-['Segoe UI Emoji'] leading-normal">Pricing</Link>
                    </div>
                    <div className="w-11 self-stretch justify-center items-center flex">
                        <Link href='#' className="w-11 text-white text-sm font-normal font-['Segoe UI Emoji'] leading-normal">About</Link>
                    </div>
                    <div className="w-[55px] self-stretch justify-center items-center flex">
                        <Link href='#' className="w-[55px] text-white text-sm font-normal font-['Segoe UI Emoji'] leading-normal">Contact</Link>
                    </div>
                    <div className=" self-stretch justify-center items-center flex">
                        <Link href='/signup' className=" text-white bg-orange-500 rounded px-4 py-1 text-sm font-normal font-['Segoe UI Emoji'] leading-normal">Sign Up</Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar