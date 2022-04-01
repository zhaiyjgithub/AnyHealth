import React from "react";

interface IProps {
    title: string,
    checked: boolean,
    onChange: () => void
}

export default function FormRadio(props:IProps) {
    const {title, checked, onChange} = props
    return (
        <label className="cursor-pointer space-x-2 flex flex-row items-center w-full ">
            <input onClick={() => {
                onChange && onChange()
            }} type="radio" checked={checked} className="form-radio w-4 h-4 active:border" />
            <p className="text-sm">{title}</p>
        </label>
    )
}