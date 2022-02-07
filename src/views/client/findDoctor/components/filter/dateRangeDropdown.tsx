import React, {useState} from "react";

export enum availableDateRange {
    nextAvailable,
    next5Days,
    next2Weeks
}

export default function DateRangeDropdown() {
    const [show, setShow] = useState<boolean>(false)

    const $toggleButton = (
        <button onClick={(e) => {
            e.stopPropagation()
            setShow(!show)
        }} type={"button"} className={"z-10 relative px-4 py-2 font-medium rounded-full flex flex-row items-center border text-primary-focus text-base leading-tight hover:bg-base-250 hover:border-primary-focus border-base-300 bg-white space-x-2"}>
            <i className="flex-none far fa-calendar"></i>
            <span>{"Login"}</span>
        </button>
    )

    const $bg = show ? (
        <div onClick={() => {
            setShow(false)
        }} className={"fixed inset-0 h-full w-full z-20"} />
    ) : null

    const $list = show ? (
        <div className="absolute right-0 overflow-y-auto border border-base-300 mt-1 min-w-full py-2 px-4 bg-white rounded-md shadow-2xl z-20 transition duration-150 ease-in-out">
            <div className={"border-b border-base-300"}>
                <button type={"button"} className={"px-4 py-2 flex flex-row w-max items-center space-x-2 text-sm rounded hover:text-primary-focus hover:bg-blue-100"}>
                    <i className="far fa-calendar-minus text-lg flex-none"></i>
                    <p>{"Next available"}</p>
                </button>
            </div>

            <div className={"border-b border-base-300"}>
                <button type={"button"} className={"px-4 py-2 flex flex-row w-max items-center space-x-2 text-sm rounded hover:text-primary-focus hover:bg-blue-100"}>
                    <i className="far fa-calendar-minus text-lg flex-none"></i>
                    <p>{"Next available"}</p>
                </button>
            </div>

            <div className={"border-b border-base-300"}>
                <button type={"button"} className={"px-4 py-2 flex flex-row w-max items-center space-x-2 text-sm rounded hover:text-primary-focus hover:bg-blue-100"}>
                    <i className="far fa-calendar-minus text-lg flex-none"></i>
                    <p>{"Next available"}</p>
                </button>
            </div>
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