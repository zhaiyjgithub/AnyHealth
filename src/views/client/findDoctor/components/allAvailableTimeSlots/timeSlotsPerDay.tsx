import React from "react";
import Button from "../../../../../components/buttons/button";
import {Variant} from "../../../../../components/buttons/enum";
import {TimeSlotPerDay} from "../../model/doctor";
import {TimeSlot} from "../doctor/timeslots/timeslots";
import {formatDateToWeekMonthDayTuple} from "../../../../../utils/util/dateTool";

interface IProps {
    doctorName: string,
    timeSlotsPerDay: Array<TimeSlotPerDay>,
    onPrevious: () => void,
    onNext: () => void,
}

export default function TimeSlotsPerDay(props: IProps) {
    const { doctorName, timeSlotsPerDay, onPrevious, onNext } = props
    
    const isCurrentDate = (new Date(timeSlotsPerDay[0].date)).getDate() === (new Date()).getDate()
    const $calendarNaviButton = (
        <div className={"flex flex-row items-center space-x-4"}>
            <Button variant={Variant.floatIcon} onClick={() => {
                !isCurrentDate && onPrevious && onPrevious()
            }} >
                <i className={`${isCurrentDate ? "text-gray-300" : ""} text-xl fas fa-chevron-left `}></i>
            </Button>
            <Button variant={Variant.floatIcon} onClick={() => {
                onNext && onNext()
            }} >
                <i className="text-xl fas fa-chevron-right"></i>
            </Button>
        </div>
    )

    const formatDateTitle = (date: Date) => {
        const [, month, day] = formatDateToWeekMonthDayTuple(date)
        return `${month} ${day}`
    }

    const getCalendarTitle = () => {
        if (!timeSlotsPerDay.length) {
            return ""
        }
        const startDate = formatDateTitle(new Date(timeSlotsPerDay[0].date))
        const endDate = formatDateTitle(new Date(timeSlotsPerDay[timeSlotsPerDay.length - 1].date))
        return `${startDate} - ${endDate}`
    }
    const $calendarTitle = (
        <div className={"w-full"}>
            <div className={"flex flex-row items-center space-x-4"}>
                <p className={"text-2xl font-bold text-primary-focus"}>{getCalendarTitle()}</p>
                {$calendarNaviButton}
            </div>
            <p className={"text-gray-400 text-sm"}>{`Choose a time with ${doctorName} that works for you`}</p>
        </div>
    )

    const $timeSlot = (timeSlot: TimeSlot, idx: number) => {
        return (
            <button type={"button"} className={"w-full py-2 px-2 bg-primary hover:bg-primary-focus text-primary-focus hover:text-focus leading-snug text-sm font-meduim"} key={idx} onClick={() => {
                //
            }} >
                {timeSlot.dateTime}
            </button>
        )
    }

    const $timeSlotsPerDayItem = (timeSlotsPerDay: TimeSlotPerDay, idx: number) => {
        const { date, timeSlots} = timeSlotsPerDay
        const title = formatDateTitle(new Date(date))
        return (
            <div key={idx} className={"w-full pr-4"}>
                <p className={"text-base font-semibold"}>{title}</p>
                <div className={"grid grid-cols-5 gap-2"}>
                    {timeSlots.map((timeslot, idx) => {
                        return $timeSlot(timeslot, idx)
                    })}
                </div>
            </div>
        )
    }
    
    const $timeSlotsList = (
        <div className={"w-full h-96 bg-red overflow-y-auto mt-2 flex flex-col space-y-4"}>
            {timeSlotsPerDay.map((_item, idx) => {
                return $timeSlotsPerDayItem(_item, idx)
            })}
        </div>
    )

    return (
        <div className={"w-full mt-8 px-8"}>
            {$calendarTitle}
            {$timeSlotsList}
        </div>
    )
}