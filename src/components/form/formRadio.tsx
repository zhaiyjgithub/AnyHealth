import React from "react";

interface IProps {
    title: string,
    checked: boolean,
    titleClassName?: string
    onChange: () => void
}

export default function FormRadio(props:IProps) {
    const {title, checked, titleClassName, onChange} = props
    return (
        <label className="cursor-pointer space-x-2 p-1 flex flex-row items-center w-full ">
            <input onClick={() => {
                onChange && onChange()
            }} type="radio" checked={checked} className="form-radio w-4 h-4 active:border" />
            <p className={`text-base font-medium ${titleClassName}`}>{title}</p>
        </label>
    )
}
