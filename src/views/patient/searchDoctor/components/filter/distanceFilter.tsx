import React, {useState} from "react";
import Button from "../../../../../components/buttons/button";
import {ButtonStatus, Variant} from "../../../../../components/buttons/enum";

interface IProps {
    distance: number,
    onApply: (distance: number) => void
}

const dataSource: Array<{ title: string, distance: number }> = [
    {title: "0.5 mil", distance: 5},
    {title: "1 mil", distance: 10},
    {title: "5 mil", distance: 20},
    {title: "10 mil", distance: 50},
    {title: "25 mil", distance: 100},
    {title: "50 mil", distance: 400},
]

export default function DistanceFilter(props: IProps) {
    const {onApply} = props
    const [show, setShow] = useState<boolean>(false)
    const [distance, setDistance] = useState<number>(props.distance)

    const $toggleButton = (
        <button onClick={(e) => {
            e.stopPropagation()
            setShow(!show)
        }} type={"button"}
        className={`z-10 relative px-4 py-2 font-semibold rounded-full flex flex-row items-center border text-sm leading-tight hover:bg-base-250 hover:border-primary-focus ${show || distance !== 1000 ? "border-primary-focus bg-base-250 text-primary-focus" : "text-gray-400 border-base-300 bg-white"}`}>
            Distance
        </button>
    )

    const $bg = show ? (
        <div onClick={() => {
            setShow(false)
            setDistance(props.distance)
        }} className={"fixed inset-0 h-full w-full z-20"}/>
    ) : null

    const onClear = () => {
        setDistance(1000)
    }

    const $footer = (
        <div className={"w-full flex flex-row items-center justify-end border-t px-4 py-2"}>
            <Button variant={Variant.float} onClick={() => {
                onClear()
                setDistance(1000)
            }}>Clear</Button>
            <Button status={ButtonStatus.primary} onClick={() => {
                setShow(false)
                onApply && onApply(distance)
            }}>Apply</Button>
        </div>
    )

    const $list = show ? (
        <div
            className="absolute left-0 border border-base-300 mt-1 w-48 bg-white shadow-2xl z-20 transition duration-150 ease-in-out">
            <div className={"w-full overflow-y-scroll max-h-96 py-4"}>
                <ul className={"w-full"}>
                    {dataSource.map((_item, idx) => {
                        const isSelected = distance === _item.distance
                        return <li onClick={(e) => {
                            e.stopPropagation()
                            setDistance(_item.distance)
                        }} className={"px-4 w-full hover:bg-base-250 cursor-pointer"} key={idx}>
                            <div className={" flex flex-row space-x-2 py-2 items-center"}>
                                <input type={"radio"} checked={isSelected}
                                    className={"form-radio rounded-full w-4 h-4 rounded-none flex-none transition duration-150"}/>
                                <p className={"text-base text-primary-focus leading-tight"}>{_item.title}</p>
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
