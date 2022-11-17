import React from "react";
import "./index.css"

interface IProps {
    description: string,
    appendStyle?: string,
    children: any
}

export default function ToolTips(props: IProps) {
    const { description, appendStyle, children } = props
    return (
        <div className={"tooltip relative"}>
            <a className={"hover:text-gray-300"}>
                {children}
            </a>
            <div className={`w-64 p-2.5 bg-white rounded border border-gray-300 absolute left-0 invisible tooltip-item ${appendStyle}`}>
                <p className={"text-sm text-primary-focus w-full"}>{description}</p>
            </div>
        </div>
    )
}
