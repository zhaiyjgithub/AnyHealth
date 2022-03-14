import React from "react";
import {ButtonStatus, Variant} from "./enum";

interface IProps {
    variant?: Variant,
    status?: ButtonStatus,
    onClick: () => void,
    children: any,
}

export default function Button(props: IProps) {
    const {variant = Variant.basic, status = ButtonStatus.primary, onClick, children} = props

    const getBasicButtonClass = (): string => {
        let classNameForBasic = ""
        switch (status) {
        case ButtonStatus.primary:
            classNameForBasic = "bg-primary border-primary"
            break
        case ButtonStatus.secondary:
            classNameForBasic = "bg-secondary border-secondary";
            break
        case ButtonStatus.light:
            classNameForBasic = "bg-gray-300 border-gray-300"
            break
        case ButtonStatus.link:
            classNameForBasic = "bg-transparent border-transparent"
            break
        default:

        }
        return classNameForBasic
    }

    const $basicButton = (
        <button onClick={onClick} type={"button"} className={`cursor-pointer inline-block px-6 py-2 text-primary-focus font-semibold text-sm leading-tight border hover:border-focus hover:text-focus hover:bg-primary-focus focus:outline-none focus:ring-0 transition duration-150 ease-in-out ${getBasicButtonClass()}`}>
            {children}
        </button>
    )
    
    const $outlineButton = (
        <button onClick={onClick} type={"button"} className={"cursor-pointer inline-block px-6 py-2 text-primary-focus font-semibold text-sm leading-tight hover:text-focus bg-white border border-primary-focus hover:border-primary-focus hover:bg-focus focus:outline-none focus:ring-0 transition duration-150 ease-in-out}"} >
            {children}
        </button>
    )

    const $floatButton = (
        <button onClick={onClick} type={"button"} className={"cursor-pointer inline-block px-6 py-2 text-gray-400 font-semibold text-sm leading-tight hover:text-gray-600 duration-150 ease-in-out "} >
            {children}
        </button>
    )

    const $floatIconButton = (
        <button onClick={onClick} type={"button"} className={"cursor-progress inline-block p-2 font-semibold text-sm leading-tight duration-150 ease-in-out "} >
            {children}
        </button>
    )
    
    let $button = $basicButton
    switch (variant) {
    case Variant.outline:
        $button = $outlineButton
        break
    case Variant.float:
        $button = $floatButton
        break
    case Variant.floatIcon:
        $button = $floatIconButton
        break
    default:
        
    }
    
    return $button
}