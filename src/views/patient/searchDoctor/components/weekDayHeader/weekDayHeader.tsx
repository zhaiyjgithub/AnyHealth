import React, {useMemo} from "react";
import moment from "moment";
import {formatDateToWeekMonthDayTuple} from "../../../../../utils/util/dateTool";
import {useViewPort} from "../../../../../utils/hooks/useViewPort";

interface IProps {
    total: number,
    startDate: Date,
    onPrevious: () => void,
    onNext: () => void,
}

export interface AvailableDate {
    date: Date,
    weekDay: string,
    month: string,
    day: number
}

export default function WeekDayHeader(props: IProps) {
    const {total, startDate, onNext, onPrevious} = props
    const {width} = useViewPort()
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
        for (let i = 0; i < dateLength; i++) {
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

    const $counterForInNextWork = (
        <div className={"text-3xl h-16 flex flex-1 flex-row items-center space-x-4"}>
            <i className="fas fa-check-circle text-green-400"/>
            <p className={"text-primary-focus font-bold"}>{`${total > 1000 ? "1000+" : total} In-network provider`}</p>
        </div>
    )

    const $day = (date: AvailableDate, idx: number) => {
        return (
            <div key={idx} className={"flex flex-col items-center justify-center"}>
                <p className={"text-sm text-primary-focus font-medium text-center"}>{date.weekDay}</p>
                <p className={"text-base text-primary-focus font-bold text-center"}>{`${date.month} ${date.day}`}</p>
            </div>
        )
    }

    const isToday = moment().isSame(moment(startDate), "day")
    const $previous = (
        <button onClick={() => {
            !isToday && onPrevious && onPrevious()
        }} type={"button"}
        className={`${isToday ? "disabled" : ""} h-8 w-8 flex items-center justify-center rounded-full`}>
            <i className={`fas fa-chevron-left ${isToday ? "text-gray-400" : ""}`}></i>
        </button>
    )

    const $next = (
        <button onClick={() => {
            onNext && onNext()
        }} type={"button"} className={"h-8 w-8 flex items-center justify-center rounded-full"}>
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

    const $weekDayList = (
        <div className={"w-5/12 flex flex-row items-center"}>
            {$previous}
            {$weekDays()}
            {$next}
        </div>
    )

    return (
        <div className={"flex flex-row items-center justify-between bg-white border-b border-base-300 px-4 z-20"}>
            {$counterForInNextWork}
            {$weekDayList}
        </div>
    )
}
