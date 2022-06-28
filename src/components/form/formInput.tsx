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
        onChangeText, type = "text", disabled = false, value} = props

    return (
        <div>
            <label className={'block text-base font-medium text-base-content'}>{title}</label>
            <input value={value} placeholder={placeholder} disabled={disabled} type={type} onChange={(e) => {
                onChangeText && onChangeText(e.target.value)
            }} className={"mt-1 w-full px-2 py-3 text-sm font-medium text-primary-focus border border-gray-300 transition ease-in-out "}
            />
        </div>)
}
