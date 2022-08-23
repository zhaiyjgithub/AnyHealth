import React, {useMemo, useState} from "react";
import {useViewPort} from "../../../../../utils/hooks/useViewPort";
import moment from "moment";
import {formatDateToWeekMonthDayTuple} from "../../../../../utils/util/dateTool";
import {TimeSlot} from "../../../searchDoctor/components/doctor/timeslots/timeslots";
import {TimeSlotPerDay} from "../../../searchDoctor/model/doctor";

interface IProps {
    total: number,
    startDate: Date,
    timeSlotsPerDay: Array<TimeSlotPerDay>,
    selectedTimeSlot: TimeSlot | null,
    onSelect: (timeSlot: TimeSlot) => void
    onPrevious: () => void
    onNext: () => void
}

interface AvailableDate {
    date: Date,
    weekDay: string,
    month: string,
    day: number
}

export default function TimeSlotsView(props: IProps) {
    const [showMore, setShowMore] = useState<boolean>(false)
    const {timeSlotsPerDay = []} = props
    const { startDate, selectedTimeSlot, onSelect, onNext, onPrevious } = props
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

    const isToday = moment().isSame(moment(startDate), "day")
    const $previous = (
        <button onClick={() => {
            !isToday && onPrevious && onPrevious()
        }} type={"button"} className={`${isToday ? "disabled" : "hover:bg-base-300"} h-8 w-8 flex items-center justify-center rounded-full`}>
            <i className={`fas fa-chevron-left ${isToday ? "text-gray-400" : ""}`}></i>
        </button>
    )

    const $next = (
        <button onClick={() => {
            onNext && onNext()
        }} type={"button"} className={"h-8 w-8 flex items-center justify-center rounded-full hover:bg-base-300"}>
            <i className="fas fa-chevron-right"></i>
        </button>
    )

    const $weekDays = () => {
        return (
            <div className={"flex-1 grid grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"}>
                {data.map((availableDate, idx) => {
                    return $day(availableDate, idx)
                })}
            </div>
        )
    }

    const $moreItem = (
        <button type={"button"} className={"w-full py-2 border bg-white hover:bg-primary-focus text-primary-focus hover:text-focus leading-snug text-sm font-medium"} onClick={() => {
            setShowMore(!showMore)
        }} >
            More
        </button>
    )

    const $overOneDayTag = (
        <p className={"bg-pink-500 p-px rounded-full text-white absolute text-xs -right-1.5 -bottom-1.5"}>+1</p>
    )

    const $timeSlot = (timeSlot: TimeSlot, idx: number) => {
        const isSelected = timeSlot.dateTime === selectedTimeSlot?.dateTime && timeSlot.date === selectedTimeSlot?.date
        return (
            <button type={"button"} className={`relative w-full py-2 border ${isSelected ? "bg-primary-focus text-focus" : "bg-white hover:bg-primary-focus text-primary-focus hover:text-focus"} font-medium leading-snug text-sm`} key={idx} onClick={() => {
                onSelect && onSelect(timeSlot)
            }} >
                {timeSlot.dateTime}
                {timeSlot.isOverOneDay ? $overOneDayTag : null}
            </button>
        )
    }

    const $timeSlotsPeerDay = (data: Array<TimeSlot>, idx: number) => {
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
        <div className={"w-full grid grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-2 overflow-hidden px-8"}>
            {timeSlotsPerDay.slice(0, dateLength).map(({timeSlots}, idx) => {
                const maxlength = timeSlots.length >= 5 ? 5 : timeSlots.length
                const dataSource = showMore ? timeSlots : timeSlots.slice(0, maxlength)
                return $timeSlotsPeerDay(dataSource, idx)
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
