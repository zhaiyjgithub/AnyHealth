import React, {useEffect, useState} from "react";
import WeekRow from "./weekRow";
import moment from "moment";
import {MonthShort, TimeFormat} from "../../utils/enum/enum";

interface IProps {
    selectedDate: string,
    onChangeDate: (date: string) => void
    pointOutDate?: Set<string>
}

export default function Calendar(props: IProps) {
    const {selectedDate, onChangeDate, pointOutDate} = props
    const [activeYear, setActiveYear] = useState<number>(moment().year())
    const [activeMonth, setActiveMonth] = useState<number>(moment().month())
    const weekDays = ["S", "M", "T", "W", "T", "F", "S"]
    const $weekDayView = (
        <div className={"grid grid-cols-7"}>
            {weekDays.map((week, idx) => {
                return (
                    <div key={idx} className={"flex flex-column items-center justify-center"}>
                        <p className={`text-base ${idx === 0 || idx === 6 ? "text-red-500" : "text-primary-focus"} font-bold`}>{week}</p>
                    </div>
                )
            })}
        </div>
    )

    useEffect(() => {
        const m = moment(selectedDate, TimeFormat.YYYYMMDD)
        if (m.year() !== activeYear || m.month() !== activeMonth) {
            setActiveYear(m.year())
            setActiveMonth(m.month())
        }
    }, [selectedDate])

    const m = moment([activeYear, activeMonth, 1])
    const firstDayInWeekDay = m.day()
    const daysInMonth = m.daysInMonth()
    const month = m.month()
    const year = m.year()
    const total = firstDayInWeekDay + daysInMonth

    const row = parseInt((total / 7).toString(), 10) + (total % 7 ? 1 : 0)
    const $daysView = () => {
        let list = []
        for (let i = 0; i < row; i ++) {
            list.push(
                <WeekRow pointOutDate={pointOutDate} onChangeDate={onChangeDate} key={i} selectedDate={selectedDate} row={i} firstDayInWeekDay={firstDayInWeekDay} activeMonth={month} activeYear={year} />
            )
        }
        return list
    }

    const $yearAndMonth = (
        <p className={"text-lg font-primary-focus font-semibold"}>{`${MonthShort[month]} ${year}`}</p>
    )

    const onClickPreviousMonth = () => {
        const newDate = moment([activeYear, activeMonth, 1]).subtract(1, "month")
        setActiveYear(newDate.year())
        setActiveMonth(newDate.month())
    }

    const onClickNextMonth = () => {
        const newDate = moment([activeYear, activeMonth, 1]).add(1, "month")
        setActiveYear(newDate.year())
        setActiveMonth(newDate.month())
    }
    const $naviButtons = (
        <div className={"flex flex-row items-center space-x-8"}>
            <button onClick={onClickPreviousMonth} className={"bg-emerald-500 rounded h-6 w-6 flex items-center justify-center"}>
                <i className="text-white fas fa-angle-left"/>
            </button>

            <button onClick={onClickNextMonth} className={"bg-emerald-500 rounded h-6 w-6 flex items-center justify-center"}>
                <i className="text-white fas fa-angle-right"/>
            </button>
        </div>
    )
    const $titleView = (
        <div className={"flex flex-row items-center justify-between"}>
            {$yearAndMonth}
            {$naviButtons}
        </div>
    )
    return (
        <div className={"shadow shadow-lg max-w-max p-4 space-y-8"}>
            {$titleView}
            <div className={"space-y-2 max-w-max"}>
                {$weekDayView}
                {$daysView()}
            </div>
        </div>
    )
}
