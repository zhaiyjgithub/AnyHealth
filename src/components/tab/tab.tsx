import React from "react";

interface IProps {
    selected: string,
    data: Array<string>,
    onChange: (title: string) => void,
}

export default function Tab(props: IProps) {
    const {data, selected, onChange} = props
    return (
        <ul className={"flex flex-row items-center"}>
            {data.map((title, idx) => {
                const isSelected = selected === title 
                return (
                    <li key={idx}>
                        <button type={"button"} onClick={() => {
                            onChange && onChange(title)
                        }} className={`inline-block font-semibold text-sm py-4 px-8 border-b-4 border-transparent hover:bg-gray-200 ${isSelected ? "text-primary-focus border-primary-focus" : "text-gray-400"}`}>
                            {title}
                        </button>
                    </li>
                )
            })}
        </ul>
    )
}