import React, {useMemo, useState} from "react";
import {TimeSlotPerDay} from "../../../model/doctor";
import {useViewPort} from "../../../../../../utils/hooks/useViewPort";

export interface TimeSlot {
    date: string,
    dateTime: string,
    offset: number,
    availableSlotsNumber: number,
    isOverOneDay: boolean,
}

interface IProps {
    timeSlotsPerDay: Array<TimeSlotPerDay>,
    onClick: (timeSlot: TimeSlot) => void
}

export default function Timeslots(props: IProps) {
    const [showMore, setShowMore] = useState<boolean>(false)
    const {timeSlotsPerDay = [], onClick} = props
    const { width } = useViewPort()
    const dateLength = useMemo(() => {
        if (width <= 1280) {
            return 3
        } else if (width <= 1536) {
            return 4
        }
        return 5
    }, [width])

    const $moreItem = (
        <button type={"button"} className={"w-full py-2 bg-primary hover:bg-primary-focus text-primary-focus hover:text-focus leading-snug text-sm font-meduim"} onClick={() => {
            setShowMore(!showMore)
        }} >
                More
        </button>
    )

    const $overOneDayTag = (
        <p className={"bg-pink-500 p-px rounded-full text-white absolute text-xs -right-1.5 -bottom-1.5"}>+1</p>
    )

    const $timeSlot = (timeSlot: TimeSlot, idx: number) => {
        return (
            <button type={"button"} className={"w-full relative py-2 bg-primary hover:bg-primary-focus text-primary-focus hover:text-focus leading-snug text-sm font-meduim"} key={idx} onClick={() => {
                onClick && onClick(timeSlot)
            }} >
                {timeSlot.dateTime}
                {timeSlot.isOverOneDay ? $overOneDayTag : null}
            </button>
        )
    }

    const $timeSlotsPeerDay = (data: Array<TimeSlot>, date: string, idx: number) => {
        return (
            <div key={idx} className={"flex flex-col space-y-2 pb-4"}>
                {
                    data.map((timeSlot, idx,) => {
                        return !showMore && idx === data.length - 1 ? $moreItem : $timeSlot(timeSlot, idx)
                    })
                }
            </div>
        )
    }
    return (
        <div className={`w-5/12 pl-8 pr-12 grid grid-cols-${dateLength} gap-x-2 overflow-hidden`}>
            {timeSlotsPerDay.slice(0, dateLength).map(({timeSlots, date}, idx) => {
                const maxlength = timeSlots.length >= 5 ? 5 : timeSlots.length
                const dataSource = showMore ? timeSlots : timeSlots.slice(0, maxlength)
                return $timeSlotsPeerDay(dataSource, date, idx)
            })}
        </div>
    )
}
