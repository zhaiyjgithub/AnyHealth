import React, {useMemo, useState} from "react";
import {useViewPort} from "../../../../../utils/hooks/useViewPort";
import moment from "moment";
import {formatDateToWeekMonthDayTuple} from "../../../../../utils/util/dateTool";
import {TimeSlot} from "../../../findDoctor/components/doctor/timeslots/timeslots";
import {TimeSlotPerDay} from "../../../findDoctor/model/doctor";

interface IProps {
    total: number,
    startDate: Date,
    timeSlotsPerDay: Array<TimeSlotPerDay>
}

interface AvailableDate {
    date: Date,
    weekDay: string,
    month: string,
    day: number
}

export default function AvailableDateView(props: IProps) {
    const [showMore, setShowMore] = useState<boolean>(false)
    const {timeSlotsPerDay = []} = props
    const { startDate } = props
    const { width } = useViewPort()

    const dateLength = useMemo(() => {
        if (width <= 1280) {
            return 3
        } else if (width <= 1536) {
            return 4
        }
        return 5
    }, [width])

    const data: Array<AvailableDate> = useMemo(() => {
        const list: Array<AvailableDate> = []
        for (let i = 0; i < dateLength; i ++) {
            const m = moment(startDate).add(i, "days")
            const targetDate: Date = new Date(m.year(), m.month(), m.date(), 0, 0, 0, 0)
            const [weekDay, month, day] = formatDateToWeekMonthDayTuple(targetDate)
            list.push({
                date: targetDate,
                weekDay: weekDay,
                month: month,
                day: day,
            })
        }
        return list
    }, [startDate, dateLength])

    const $title = (
        <p className={"text-base text-primary-focus font-semibold"}>Select an available time</p>
    )

    const $day = (date: AvailableDate, idx: number) => {
        return (
            <div key={idx} className={"w-full flex flex-col items-center justify-center"}>
                <p className={"text-base text-primary-focus font-medium text-center"}>{date.weekDay}</p>
                <p className={"text-base text-primary-focus font-bold text-center"}>{`${date.month} ${date.day}`}</p>
            </div>
        )
    }

    const $previous = (
        <button type={"button"} className={"h-8 w-8 flex items-center justify-center rounded-full hover:bg-base-300"}>
            <svg data-test="icon-arrow-left" className="w-4 h-4"
                viewBox="0 0 26 40">
                <polygon fill="#00234B" points="20.3,40 25.7,34.5 11.2,20 25.7,5.5 20.3,0 0.3,20"></polygon>
            </svg>
        </button>
    )

    const $next = (
        <button type={"button"} className={"h-8 w-8 flex items-center justify-center rounded-full hover:bg-base-300 transform rotate-180"}>
            <svg data-test="icon-arrow-left" className="w-4 h-4"
                viewBox="0 0 26 40">
                <polygon fill="#00234B" points="20.3,40 25.7,34.5 11.2,20 25.7,5.5 20.3,0 0.3,20"></polygon>
            </svg>
        </button>
    )

    const $weekDays = () => {
        return (
            <div className={`flex flex-1 grid grid-cols-${dateLength}`}>
                {data.map((availableDate, idx) => {
                    return $day(availableDate, idx)
                })}
            </div>
        )
    }

    const $moreItem = (
        <button type={"button"} className={"w-full py-2 border bg-white hover:bg-primary-focus text-primary-focus hover:text-focus leading-snug text-sm font-meduim"} onClick={() => {
            setShowMore(!showMore)
        }} >
            More
        </button>
    )

    const $timeSlot = (timeSlot: TimeSlot, idx: number) => {
        return (
            <button type={"button"} className={"w-full py-2 border bg-white hover:bg-primary-focus text-primary-focus hover:text-focus leading-snug text-sm font-meduim"} key={idx} onClick={() => {
                //
            }} >
                {timeSlot.dateTime}
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

    const $timeSlotsInCalendar = (
        <div className={`w-full grid grid-cols-${dateLength} gap-x-2 px-8`}>
            {timeSlotsPerDay.slice(0, dateLength).map(({timeSlots, date}, idx) => {
                const maxlength = timeSlots.length >= 5 ? 5 : timeSlots.length
                const dataSource = showMore ? timeSlots : timeSlots.slice(0, maxlength)
                return $timeSlotsPeerDay(dataSource, date, idx)
            })}
        </div>
    )

    const $weekDayList = (
        <div className={"w-full flex flex-row items-center"}>
            {$previous}
            {$weekDays()}
            {$next}
        </div>
    )

    const $card = (
        <div className={"w-full border bg-white p-2 flex flex-col space-y-2"}>
            {$weekDayList}
            {$timeSlotsInCalendar}
        </div>
    )
    
    return (
        <div className={"w-full flex flex-col justify-center"}>
            {$title}
            {$card}
        </div>
    )
}