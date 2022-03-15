import React from "react";

export default function SectionHeader() {
    const $button = (title: string, idx: number) => {
        return (
            <button key={idx} type={"button"} className={"cursor-pointer text-xl py-4 text-primary-focus border-b-4 border-transparent hover:border-primary-focus "}>{title}</button>
        )
    }
    const data = [
        "About",
        "Insurances",
        "Locations",
        "Reviews",
        "FAQs",
    ]
    return (
        <div className={"w-full flex flex-row items-center space-x-8 border-t border-b"}>
            {data.map((title, idx) => {
                return $button(title, idx)
            })}
        </div>
    )
}