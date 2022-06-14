import React, {useMemo} from "react";
import moment from "moment";
import {formatDateToWeekMonthDayTuple} from "../../../../utils/util/dateTool";
import {AvailableDate} from "../../findDoctor/components/weekDayHeader/weekDayHeader";

interface IProps {
    startDate: Date
}

export default function WeekDayHeader(props: IProps) {
    const {startDate } = props

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
