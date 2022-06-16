import React, {useMemo} from "react";
import moment from "moment";
import {formatDateToWeekMonthDayTuple} from "../../../../utils/util/dateTool";
import {AvailableDate} from "../../findDoctor/components/weekDayHeader/weekDayHeader";

interface IProps {
    startDate: Date
    onPrevious: () => void
    onNext: () => void
}

export default function WeekDayHeader(props: IProps) {
    const {startDate, onPrevious, onNext} = props

    const data: Array<AvailableDate> = useMemo(() => {
        const list: Array<AvailableDate> = []
        for (let i = 0; i < 4; i ++) {
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
    }, [startDate, 4])

    const $day = (date: AvailableDate, idx: number) => {
        return (
            <div key={idx} className={"w-full flex flex-col items-center justify-center"}>
                <p className={"text-sm text-primary-focus font-medium text-center"}>{date.weekDay}</p>
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
            <div className={"flex flex-1 grid grid-cols-4"}>
                {data.map((availableDate, idx) => {
                    return $day(availableDate, idx)
                })}
            </div>
        )
    }

    return (
        <div className={"w-full flex flex-row items-center"}>
            {$previous}
            {$weekDays()}
            {$next}
        </div>
    )
}
