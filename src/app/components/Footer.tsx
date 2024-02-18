
type Props = {}

function Footer({}: Props) {
  return (
    <footer className="pl-14 w-svw pr-[55px] py-3  bg-purple-800 justify-center items-center flex">
        <div className="grow shrink basis-0 self-stretch px-4 justify-center items-center flex">
          <div className="grow shrink basis-0 self-stretch pl-[393px] pr-[385px] justify-end items-center flex">
            <div className="text-center text-white text-base font-normal font-['Segoe UI Emoji'] leading-normal">© 2023 MediaConverterPro. All rights reserved.</div>
          </div>
        </div>
      </footer>
  )
}

export default Footer