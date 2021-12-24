import React from "react";

interface IProps {
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
    const {title,placeholder,
        value, errMsg, onChangeText, type, addedStyle = '', disabled = false} = props

    return (
        <div className="form-control">
            <label className="label">
                <span className="label-text">{title}</span>
            </label>
            <input disabled={disabled} onChange={(e) => {
                onChangeText && onChangeText(e.target.value)
            }} type={type} placeholder={placeholder} className={`input input-primary input-bordered ${addedStyle}`} {...props} />
        </div>)
}