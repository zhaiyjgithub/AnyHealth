import React from "react";

interface IProps {
    selected: string,
    data: Array<string>,
    onChange: (title: string) => void,
}

export default function Tab(props: IProps) {
    const {data, selected, onChange} = props
    return (
        <div className={"w-full border-b"}>
            <div className={`max-w-max grid grid-cols-${data.length}`}>
                {data.map((title, idx) => {
                    const isSelected = selected === title
                    return (
                        <button key={idx} type={"button"} onClick={() => {
                            onChange && onChange(title)
                        }} className={`border-b-2 inline-block font-semibold text-sm py-4 px-8 hover:text-primary-focus ${isSelected ? "text-primary-focus border-primary-focus" : "text-gray-400 border-transparent"}`}>
                            {title}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}
