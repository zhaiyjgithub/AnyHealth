import React from "react";

export enum FormSize {
    normal,
    large,
    small
}

interface IProps {
    size?: FormSize,
    title: string,
    placeholder?: string,
    value: string,
    onChangeText?: (text: string) => void,
    errMsg?: string,
    type?: string,
    addedStyle?: string,
    disabled?: boolean,
    max?: string,
    min?: string
}

export default function FormInput (props: IProps) {
    const {title, onChangeText, errMsg} = props

    return (
        <div>
            <p className={"block text-base font-normal text-primary-focus"}>{title}</p>
            <input {...props} onChange={(e) => {
                onChangeText && onChangeText(e.target.value)
            }} className={"mt-1 w-full px-2 py-3 text-base font-medium font-mulish text-primary-focus border border-gray-300 transition ease-in-out "}
            />
            {errMsg && errMsg.length ? <p className={"text-sm italic text-red-500 font-semibold mt-1"}>{errMsg}</p> : null}
        </div>)
}
