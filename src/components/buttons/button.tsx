import React from "react";
import {ButtonStatus, ButtonType} from "./enum";

interface IProps {
    type?: ButtonType,
    status?: ButtonStatus,
    onClick: () => void,
    children: React.ReactChildren | string,
}

export default function Button(props: IProps) {
    const {type = ButtonType.basic, status = ButtonStatus.primary, onClick, children} = props

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
        <button onClick={onClick} type={"button"} className={`inline-block px-6 py-2 text-primary-focus font-semibold text-sm leading-tight uppercase border hover:border-focus hover:text-focus hover:bg-primary-focus focus:outline-none focus:ring-0 transition duration-150 ease-in-out ${getBasicButtonClass()}`}>
            {children}
        </button>
    )
    
    const $outlineButton = (
        <button onClick={onClick} type={"button"} className={"inline-block px-6 py-2 text-primary-focus font-semibold text-sm leading-tight uppercase hover:text-focus bg-white border border-primary-focus hover:border-primary-focus hover:bg-focus focus:outline-none focus:ring-0 transition duration-150 ease-in-out}"} >
            {children}
        </button>
    )
    
    let $button = $basicButton
    switch (type) {
    case ButtonType.outline:
        $button = $outlineButton
        break
    default:
        
    }
    
    return $button
}