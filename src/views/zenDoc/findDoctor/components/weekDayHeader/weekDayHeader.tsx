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
    const { total, startDate, onNext, onPrevious } = props
    const { width } = useViewPort()
    const dateLength = useMemo(() => {
        if (width <= 1280) {
            return 2
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

    const $counterForInNextWork = (
        <div className={"text-3xl h-16 flex flex-1 flex-row items-center"}>
            <span>
                <svg data-test="search-results-in-network-icon" xmlns="http://www.w3.org/2000/svg" color="#00E6AF" additional-margin="true" className="w-7 h-7"
                    viewBox="0 0 31 35"><path opacity=".12"
                        d="M15.5 1.813C11.086 5.426 3.946 6.186 2.067 6.28c-.282 0-.47.286-.47.57.47 22.723 11.274 27.097 13.717 27.762.282.095.657.095.94 0 2.442-.665 13.246-4.944 13.998-27.571 0-.285-.188-.57-.47-.57-1.973-.19-9.02-.951-13.34-4.66-.377-.19-.658-.19-.94 0z"
                        fill="#000"></path><path
                        d="M14.748.48C10.238 4.095 3.193 4.855 1.22 4.95c-.282 0-.47.284-.47.57.47 22.722 11.274 27.096 13.717 27.761.281.095.657.095.94 0 2.442-.665 13.246-4.944 13.997-27.571 0-.285-.187-.57-.47-.57-1.972-.19-9.018-.951-13.34-4.66-.282-.284-.658-.284-.846 0z"
                        fill="#00D19F"></path><path
                        d="M14.749 3.524C11.179 6.471 5.448 7.042 3.85 7.232c-.282 0-.47.19-.47.38.376 18.445 9.113 22.057 11.086 22.628.282.095.564.095.752 0 1.973-.57 10.71-3.993 11.368-22.438 0-.285-.188-.475-.376-.475-1.597-.095-7.328-.76-10.898-3.803-.094-.19-.376-.19-.564 0z"
                        fill="#00E6AF"></path><path d="M10.917 21.042l1.965 1.77 8.868-10.087-1.966-1.77-8.867 10.087z"
                        fill="#fff"></path><path
                        d="M12.86 22.733l1.75-1.989-4.423-3.981-1.748 1.989 4.422 3.981z" fill="#fff"></path></svg>
            </span>
            <span className={"ml-4 text-primary-focus font-bold"}>{`${total > 1000 ? "1000+" : total} In-network provider`}</span>
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
        }} type={"button"} className={`${isToday ? "disabled" : ""} h-8 w-8 flex items-center justify-center rounded-full`}>
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

    console.log("data length", data.length, dateLength)
    const $weekDays = () => {
        return (
            <div className={`flex-1 grid grid-cols-${dateLength}`}>
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
