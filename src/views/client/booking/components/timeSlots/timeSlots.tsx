import React, {useState} from "react";
import {TimeSlotPerDay} from "../../../findDoctor/model/doctor";
import {TimeSlot} from "../../../findDoctor/components/doctor/timeslots/timeslots";

interface IProps {
    timeSlotsPerDay: Array<TimeSlotPerDay>,
    onClick: (timeSlot: TimeSlot) => void
}

export default function Timeslots(props: IProps) {
    const [showMore, setShowMore] = useState<boolean>(false)
    const {timeSlotsPerDay = [], onClick} = props

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
            <div key={idx} className={"flex flex-col space-y-2"}>
                {
                    data.map((timeSlot, idx,) => {
                        return !showMore && idx === data.length - 1 ? $moreItem : $timeSlot(timeSlot, idx)
                    })
                }
            </div>
        )
    }
    return (
        <div className={"w-full grid grid-cols-4 gap-x-2"}>
            {timeSlotsPerDay.slice(0, 4).map(({timeSlots, date}, idx) => {
                const maxlength = timeSlots.length >= 4 ? 4 : timeSlots.length
                const dataSource = showMore ? timeSlots : timeSlots.slice(0, maxlength)
                return $timeSlotsPeerDay(dataSource, date, idx)
            })}
        </div>
    )
}
