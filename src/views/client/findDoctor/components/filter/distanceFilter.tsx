import React, {useState} from "react";
import Button from "../../../../../components/buttons/button";
import {ButtonStatus, ButtonType} from "../../../../../components/buttons/enum";

interface IProps {
    distance: string,
    onApply: (list: string) => void
}

const dataSource: Array<string> = [
    "0.5 mil",
    "1 mil",
    "5 mils",
    "10 mils",
    "25 mils",
    "50 mils",
]

export default function DistanceFilter(props: IProps) {
    const {onApply} = props
    const [show, setShow] = useState<boolean>(false)
    const [distance, setDistance] = useState<string>(props.distance)
    
    const $toggleButton = (
        <button onClick={(e) => {
            e.stopPropagation()
            setShow(!show)
        }} type={"button"} className={`z-10 relative px-4 py-2 font-medium rounded-full flex flex-row items-center border text-primary-focus text-sm leading-tight hover:bg-base-250 hover:border-primary-focus ${show || distance.length ? "border-primary-focus bg-base-250" : "border-base-300 bg-white"}`}>
    Distance
        </button>
    )

    const $bg = show ? (
        <div onClick={() => {
            setShow(false)
        }} className={"fixed inset-0 h-full w-full z-20"} />
    ) : null

    const onClear = () => {
        setDistance("")
    }

    const $footer = (
        <div className={"w-full flex flex-row items-center justify-end border-t px-4 py-2"}>
            <Button type={ButtonType.float} onClick={() => {
                onClear()
            }} >Clear</Button>
            <Button status={ButtonStatus.primary} onClick={() => {
                onApply && onApply(distance)
                setShow(false)
            }} >Apply</Button>

        </div>
    )

    const $list = show ? (
        <div className="absolute left-0 border border-base-300 mt-1 w-48 bg-white shadow-2xl z-20 transition duration-150 ease-in-out">
            <div className={"w-full overflow-y-scroll max-h-96 py-4"}>
                <ul className={"w-full" }>
                    {dataSource.map((_distance, idx) => {
                        const isSelected = _distance === distance
                        return <li onClick={(e) => {
                            e.stopPropagation()
                            setDistance(_distance)
                        }} className={"px-4 w-full hover:bg-base-250 cursor-pointer"} key={idx}>
                            <div className={" flex flex-row space-x-2 py-2 items-center"}>
                                <input type={"radio"} checked={isSelected} className={"form-radio rounded-full w-4 h-4 rounded-none flex-none transition duration-150"}/>
                                <p className={"text-base text-primary-focus leading-tight"}>{_distance}</p>
                            </div>
                        </li>
                    })}
                </ul>
            </div>
            {$footer}
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