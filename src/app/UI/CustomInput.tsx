import React, { JSX, ReactNode, SetStateAction } from 'react'


type icontype = ReactNode

type Props = {
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
    name: string,
    type: string,
    placeholder: string,
    isDouble: boolean,
    Icon: () => JSX.Element,
    RightIcon?: () => JSX.Element
}
interface IPassword extends Props {
    isPasswordVisible: boolean,
    setIsPasswordVisible: (value: SetStateAction<boolean>) => void,
    IconOpen: () => JSX.Element,
    IconClose: () => JSX.Element,
}
interface IEmail extends Props {

}
type inputProps = IPassword | IEmail

const CustomInput = (props: inputProps) => {

    const { onChange, name, type, isDouble, Icon, placeholder } = props

    const { isPasswordVisible, setIsPasswordVisible, IconOpen, IconClose } = props as IPassword

    return (
        <div className="w-[272px] focus-within:ring-1 focus-within:ring-inset focus-within:ring-purple-500   h-[34px] px-2.5 py-[5px] left-[2px] bg-white rounded-[21px] shadow shadow-blue-400  drop-shadow-lg justify-start items-center  inline-flex">
            <div className="justify-start w-full items-center gap-1.5 flex">
                <div className="w-6 h-6 relative" >
                    <Icon />
                </div>
                <input aria-label={name} name={name} onChange={onChange} autoComplete={type==="password"?"off":"on"} aria-autocomplete={type==="password"?"none":"both"}  type={type === "password" ? isPasswordVisible ? 'text' : 'password' : type}
                    className="pl-px w-full pr-[10px]  font-medium font-['Inter'] bg-white bg-opacity-0 outline-none focus:ring-0 placeholder:text-stone-400 text-xs border-none" placeholder={placeholder} />
            </div>
            {isDouble ? <div onClick={() => { setIsPasswordVisible((prev) => !prev) }} className="w-6 h-6 relative">
                {isPasswordVisible ? <IconClose /> : <IconOpen />}
            </div> : null}

        </div>
    )
}

export default CustomInput