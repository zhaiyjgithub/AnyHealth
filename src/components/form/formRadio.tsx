import React from "react";

interface IProps {
    title: string,
    checked: boolean,
    onChange: () => void
}

export default function FormRadio(props:IProps) {
    const {title, checked, onChange} = props
    return (
        <div className="form-control">
            <label className="cursor-pointer label">
                <input onChange={() => {
                    onChange && onChange()
                }} type="radio" name="opt" checked={checked} className="radio radio-primary" value="" />
                <span className="label-text ml-2">{title}</span>
            </label>
        </div>
    )
}