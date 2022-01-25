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
    type?: DropdownType,
    disabled?: boolean,
    placeholder?: string,
    value: any,
    data: Array<DropDownItem>,
    onSelected: (value: any) => void
}

export default function DropDown(props: IProps) {
    const {type, disabled, placeholder, value, data, onSelected} = props
    const [show, setShow] = useState<boolean>(false)

    const selectedItem = data.find((_item) => {
        return _item.id === value
    })
    const title = selectedItem ? selectedItem.name : placeholder
    const $toggleButton = (
        <button disabled={disabled} onClick={(e) => {
            e.stopPropagation()
            setShow(!show)
        }} type={"button"} className={`z-10 relative space-x-2 inline-block flex flex-row items-center px-6 py-2 text-primary-focus font-semibold text-sm leading-tight border border-focus ${disabled ? "bg-gray-300" : "hover:border-focus hover:text-focus hover:bg-primary-focus focus:outline-none focus:ring-0 transition duration-150 ease-in-out"} ${type === DropdownType.block ? "w-full" : ""}`}>
            <p>{title}</p>
            <svg className={`h-5 w-5 text-primary-focus ${disabled ? "" : "hover:text-focus"}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
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

    const $item = ({name, id}: DropDownItem, idx: number) => {
        return (
            <li>
                <button key={idx} type={"button"} onClick={(e) => {
                    e.stopPropagation()
                    onSelected && onSelected(id)
                    setShow(false)
                }} className="w-full text-left px-4 py-2 text-sm font-medium capitalize text-primary-focus hover:bg-focus hover:text-focus">
                    {name}
                </button>
            </li>

        )
    }

    const $list = show ? (
        <ul className="absolute max-h-56 overflow-y-auto bg-white border border-base-300 mt-1 min-w-full py-2 bg-white rounded-md shadow-2xl z-20 transition duration-150 ease-in-out">
            {data.map((_item, idx) => {
                return $item(_item, idx)
            })}
        </ul>
    ) : null

    return (
        <div className={"relative bg-white max-w-max"}>
            {$toggleButton}
            {$bg}
            {$list}
        </div>
    )
}