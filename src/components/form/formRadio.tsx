import React from "react";

interface IProps {
    title: string,
    checked: boolean,
    onChange: () => void
}

export default function FormRadio(props:IProps) {
    const {title, checked, onChange} = props
    return (
        <label className="cursor-pointer space-x-2 flex flex-row items-center ">
            <input onChange={() => {
                onChange && onChange()
            }} type="radio" name="opt" checked={checked} className="form-radio radio-primary w-5 h-5" value="" />
            <span className="label-text">{title}</span>
        </label>
    )
}