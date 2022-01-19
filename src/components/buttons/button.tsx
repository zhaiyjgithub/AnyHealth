import React from "react";
import {ButtonStatus} from "./enum";

interface IProps {
    title: string,
    status: ButtonStatus,
    onClick: () => void,
}

export default function Button(props: IProps) {
    const {title, status, onClick} = props
    const $primary = (
        <button onClick={onClick} type={"button"} className={"inline-block px-6 py-2 bg-primary text-primary font-semibold text-xs leading-tight uppercase hover:text-focus hover:bg-primary-focus focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out"}>{title}</button>
    )
    
    if (status === ButtonStatus.primary) {
        return $primary
    }
    return $primary
}