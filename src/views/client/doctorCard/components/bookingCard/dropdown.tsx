import React, {useState} from "react";

export enum DropdownType {
    default,
    block
}

export interface DropDownItem {
    name: string,
    id: any
}

interface IProps {
    title: string,
    data: Array<DropDownItem>,
    selected: DropDownItem | null,
    onChange: (item: DropDownItem) => void,
}

export default function Dropdown(props: IProps) {
    const { title, data} = props
    const [show, setShow] = useState<boolean>(false)

    const $toggleButton = (
        <button onClick={(e) => {
            e.stopPropagation()
            setShow(!show)
        }} type={"button"} className={"w-full z-10 mt-1 relative px-2 py-2.5 bg-white flex flex-row items-center justify-between border text-primary-focus font-semibold text-sm leading-tight"}>
            <p className={'font-medium text-base font-primary-focus'}>Choose an insurance</p>
            <svg className={"h-5 w-5 text-primary-focus hover:text-focus"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
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
        }} className={"fixed inset-0 h-full w-full z-20"} />
    ) : null

    const $item = ({name}: DropDownItem, idx: number) => {
        return (
            <div key={idx} className={"w-full py-2 hover:bg-pink-100 flex flex-row items-center"}>
                <p className={"text-sm px-2 font-medium text-primary-focus text-left"}>{name}</p>
            </div>
        )
    }

    const $insuranceList = data.map((item, idx) => {
        return $item(item, idx)
    })

    const $list = show ? (
        <div className="absolute right-0 overflow-y-auto border mt-1 min-w-full bg-white shadow-2xl z-20 transition duration-150 ease-in-out max-h-96">
            {$insuranceList}
        </div>
    ) : null

    const $title = (
        <p className={"text-base font-medium text-primary-focus"}>{title}</p>
    )
    return (
        <div className={"relative w-full"}>
            {$title}
            {$toggleButton}
            {$bg}
            {$list}
        </div>
    )
}