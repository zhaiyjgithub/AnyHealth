import React, {useState} from "react";
import {TimeSlotPerDay} from "../../../model/doctor";

export interface TimeSlot {
    dateTime: string,
    offset: number,
    availableSlotsNumber: number,
}

interface IProps {
    timeSlotsPerDay: Array<TimeSlotPerDay>
}

export default function Timeslots(props: IProps) {
    const [showMore, setShowMore] = useState<boolean>(false)
    const {timeSlotsPerDay = []} = props

    const $moreItem = (
        <button type={"button"} className={"w-full py-2 bg-primary hover:bg-primary-focus text-primary-focus hover:text-focus leading-snug text-sm font-semibold"} onClick={() => {
            setShowMore(!showMore)
        }} >
                More
        </button>
    )

    const $timeSlot = (timeSlot: TimeSlot, idx: number) => {
        return (
            <button type={"button"} className={"w-full py-2 bg-primary hover:bg-primary-focus text-primary-focus hover:text-focus leading-snug text-sm font-semibold"} key={idx} onClick={() => {
                // 
            }} >
                {timeSlot.dateTime}
            </button>
        )
    }

    const $timeSlotsPeerDay = (data: Array<TimeSlot>, date: string, idx: number) => {
        return (
            <div key={idx} className={"grid grid-cols-1 grid-rows-4 gap-y-2"}>
                {
                    data.map((timeSlot, idx,) => {
                        return !showMore && idx === data.length - 1 ? $moreItem : $timeSlot(timeSlot, idx)
                    })
                }
            </div>
        )
    }
    return (
        <div className={"flex-1 mx-8 pr-4 grid grid-cols-5 gap-x-3 overflow-hidden"}>
            {timeSlotsPerDay.map(({timeSlots, date}, idx) => {
                const maxlength = timeSlots.length >= 5 ? 5 : timeSlots.length
                const dataSource = showMore ? timeSlots : timeSlots.slice(0, maxlength)
                return $timeSlotsPeerDay(dataSource, date, idx)
            })}
        </div>
    )
}