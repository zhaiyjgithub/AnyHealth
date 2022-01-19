import React from "react";
import {ButtonStatus} from "./enum";

interface IProps {
    title: string,
    status: ButtonStatus,
    onClick: () => void,
}

export default function Button(props: IProps) {
    const {title, status, onClick} = props
    
    let className = ""
    switch (status) {
    case ButtonStatus.primary:
        className = "bg-primary"
        break
    case ButtonStatus.secondary:
        className = "bg-secondary";
        break
    case ButtonStatus.light:
        className = "bg-gray-300"
        break
    case ButtonStatus.link:
        className = "bg-transparent"
        break
    default:
        
    }
    
    return (
        <button onClick={onClick} type={"button"} className={`inline-block px-6 py-2 text-primary font-semibold text-sm leading-tight uppercase hover:text-focus hover:bg-primary-focus focus:outline-none focus:ring-0 transition duration-150 ease-in-out ${className}`}>{title}</button>
    )
}