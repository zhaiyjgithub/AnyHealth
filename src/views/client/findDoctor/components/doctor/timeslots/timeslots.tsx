import React from "react";

export interface TimeSlot {
    dateTime: string
}

interface IProps {
    sections: Array<Array<TimeSlot>>
}

export default function Timeslots(props: IProps) {
    const {sections = []} = props

    const $timeSlot = (timeSlot: TimeSlot, idx: number) => {
        return (
            <button type={"button"} className={"w-full py-2 bg-primary hover:bg-primary-focus text-primary-focus hover:text-focus leading-snug text-sm font-semibold"} key={idx} onClick={() => {
                //
            }} >
                {timeSlot.dateTime}
            </button>
        )
    }

    const $timeSlotsPeerDay = (data: Array<TimeSlot>) => {
        // grid-flow-row auto-rows-max
        return (
            <div className={"grid grid-cols-1 grid-rows-4 gap-y-2"}>
                {
                    data.map((timeSlot, idx,) => {
                        return $timeSlot(timeSlot, idx)
                    })
                }
            </div>
        )
    }
    return (
        <div className={"flex-1 mx-8 pr-4 grid grid-cols-5 gap-x-3 overflow-hidden"}>
            {sections.map((data) => {
                return $timeSlotsPeerDay(data)
            })}
        </div>
    )
}