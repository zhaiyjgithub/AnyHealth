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
}

export default function FormInput (props: IProps) {
    const {title, placeholder,
        onChangeText, type = "text", disabled = false} = props

    return (
        <div>
            <label className={"inline-block mb-1 text-base-content font-medium"}>{title}</label>
            <input placeholder={placeholder} disabled={disabled} type={type} onChange={(e) => {
                onChangeText && onChangeText(e.target.value)
            }} className={"w-full block px-3 py-1.5 text-base font-medium text-base-content bg-white border border-slate-300 transition ease-in-out focus:border-transparent focus:outline-none focus:ring-2 focus:ring-focus active:ring-2 active:ring-focus"}/>
        </div>)
}