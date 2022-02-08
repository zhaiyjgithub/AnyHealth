import React, {useState} from "react";

export enum AvailableDateRange {
    nextAvailable,
    next5Days,
    next2Weeks
}

const data: Array<{value: AvailableDateRange, name: string, icon: any}> = [
    {value: AvailableDateRange.nextAvailable, name: "Next available", icon: <i className="far fa-clock text-lg flex-none"></i>},
    {value: AvailableDateRange.next5Days, name: "5 days", icon: <i className="far fa-calendar-minus text-lg flex-none"></i>},
    {value: AvailableDateRange.next2Weeks, name: "2 weeks", icon: <i className="far fa-calendar-alt text-lg flex-none"></i>},
]

interface IProps {
    dateRange: AvailableDateRange,
    onSelect: (range: AvailableDateRange) => void
}

export default function DateRangeDropdown(props: IProps) {
    const {dateRange = AvailableDateRange.nextAvailable, onSelect} = props
    const [show, setShow] = useState<boolean>(false)

    const rangeItem = data.find((_item) => _item.value === dateRange)
    const $toggleButton = (
        <button onClick={(e) => {
            e.stopPropagation()
            setShow(!show)
        }} type={"button"} className={"z-10 relative px-4 py-2 font-medium rounded-full flex flex-row items-center border text-primary-focus text-sm leading-snug hover:bg-base-250 hover:border-primary-focus border-base-300 bg-white space-x-2"}>
            <i className="flex-none far fa-calendar"></i>
            <span>{rangeItem?.name}</span>
        </button>
    )

    const $bg = show ? (
        <div onClick={() => {
            setShow(false)
        }} className={"fixed inset-0 h-full w-full z-20"} />
    ) : null

    const $list = show ? (
        <div className="absolute right-0 divide-y overflow-y-auto border border-base-300 mt-1 w-max py-2 px-4 bg-white rounded-md shadow-2xl z-20 transition duration-150 ease-in-out">
            {data.map(({value, name, icon}, idx) => {
                const isSelected = value === dateRange
                return (
                    <button onClick={() => {
                        onSelect && onSelect(value)
                    }} key={idx} type={"button"} className={`w-full rounded px-4 py-2 flex flex-row items-center justify-between space-x-4 text-sm leading-snug ${isSelected ? "text-blue-400" : "hover:text-primary-focus hover:bg-blue-100"}`}>
                        <div className={"flex flex-row items-center space-x-4"}>
                            {icon}
                            <p>{name}</p>
                        </div>
                        <span className={`${isSelected ? "visible" : "invisible"}`}>
                            <i className="fas fa-check"></i>
                        </span>
                    </button>
                )
            })}
        </div>
    ) : null

    return (
        <div className={"relative w-max"}>
            {$toggleButton}
            {$bg}
            {$list}
        </div>
    )
}