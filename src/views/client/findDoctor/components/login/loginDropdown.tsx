import React, {useState} from "react";

export enum DropdownType {
    default,
    block
}

export interface DropDownItem {
    name: string,
    id: any
}

export default function LoginDropdown() {
    const [show, setShow] = useState<boolean>(false)

    const $toggleButton = (
        <button onClick={(e) => {
            e.stopPropagation()
            setShow(!show)
        }} type={"button"} className={"z-10 relative space-x-2 flex flex-row items-center border-b border-primary-focus border-dotted hover:border-solid text-primary-focus font-semibold text-sm leading-tight"}>
            <p>Login / Sign up</p>
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

    const $list = show ? (
        <div className="absolute right-0 overflow-y-auto border border-base-300 mt-1 min-w-full py-2 px-4 bg-white rounded-md shadow-2xl z-20 transition duration-150 ease-in-out">
            <div className={"w-max flex flex-row items-center justify-between space-x-4"}>
                <p className={"text-sm font-bold text-base-content w-16"}>{"Patients"}</p>
                <div className={"flex flex-row items-center justify-center py-1"}>
                    <button type={"button"} className={"text-sm text-base-600 font-medium border-primary-focus border-b border-dotted hover:border-solid px-2"}>Login</button>
                    <p className={"mx-1"}>/</p>
                    <button type={"button"} className={"text-sm text-base-600 font-medium border-primary-focus border-b border-dotted hover:border-solid px-2"}>Sign Up</button>
                </div>
            </div>
        
            <div className={" h-0.5 my-2 bg-base-300"}/>

            <div className={"w-max flex flex-row items-center justify-between space-x-4"}>
                <p className={"text-sm font-bold text-base-content w-16"}>{"Doctor"}</p>
                <div className={"flex flex-row items-end justify-between py-1"}>
                    <button type={"button"} className={"text-sm text-base-600 font-medium border-primary-focus border-b border-dotted hover:border-solid px-2"}>Login</button>
                </div>
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