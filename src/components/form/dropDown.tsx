import React, {useState} from "react";

export interface DropDownItem {
    name: string,
    id: number | string
}

interface IProps {
    placeholder?: string,
    value: DropDownItem | null,
    data: Array<DropDownItem>,
    onSelected: (value: DropDownItem) => void
}

export default function DropDown(props: IProps) {
    const {placeholder, value, data, onSelected} = props
    const [show, setShow] = useState<boolean>(false)
    
    const title = value ? value.name : placeholder
    const $toggleButton = (
        <button onClick={() => {
            setShow(!show)
        }} type={"button"} className={"z-20 relative space-x-4 inline-block flex flex-row items-center px-6 py-2 text-primary-focus font-semibold text-sm leading-tight border border-focus hover:border-focus hover:text-focus hover:bg-primary-focus focus:outline-none focus:ring-0 transition duration-150 ease-in-out"}>
            <p>{title}</p>
            <svg className="h-5 w-5 text-primary-focus hover:text-focus" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                fill="currentColor">
                <path fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"/>
            </svg>
        </button>
    )

    const $bg = show ? (
        <div onClick={() => {
            setShow(false)
        }} className={"fixed inset-0 h-full w-full z-10"} />
    ) : null

    const $item = (item: DropDownItem, idx: number) => {
        return (
            <li>
                <button key={idx} type={"button"} onClick={() => {
                    onSelected && onSelected(item)
                    setShow(false)
                }} className="w-full text-left px-4 py-2 text-sm capitalize text-primary-focus hover:bg-focus hover:text-focus">
                    {item.name}
                </button>
            </li>

        )
    }

    const $list = show ? (
        <ul className="absolute border border-base-300 mt-1 min-w-full py-2 bg-white rounded-md shadow-xl z-20 transition duration-150 ease-in-out">
            {data.map((_item, idx) => {
                return $item(_item, idx)
            })}
        </ul>
    ) : null

    return (
        <div className={"relative bg-white max-w-max"}>
            {$bg}
            {$toggleButton}
            {$list}
        </div>
    )
}