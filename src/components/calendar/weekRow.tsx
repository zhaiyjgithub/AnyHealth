import React from "react";
import moment from "moment";
import {TimeFormat} from "../../utils/enum/enum";
import DayItem from "./dayItem";

interface IProps {
    row: number,
    firstDayInWeekDay: number,
    activeMonth: number,
    activeYear: number,
    selectedDate: string,
    onChangeDate: (date: string) => void,
    pointOutDate: Set<string>
}

export default function WeekRow(props: IProps) {
    const {row, firstDayInWeekDay, activeMonth, activeYear, selectedDate, onChangeDate, pointOutDate = new Set()} = props
    // row = 0
    let list: Array<{
        date: string,
        isSelected: boolean,
        showPoint: boolean,
        isOutOfMonth: boolean,
    }> = []
    if (row === 0) {
        for (let i = 0; i < 7; i ++) {
            if (i < firstDayInWeekDay) {
                const date = moment([activeYear, activeMonth, 1]).subtract(firstDayInWeekDay - i, "days")
                    .format(TimeFormat.YYYYMMDD)
                list.push({
                    isOutOfMonth: true,
                    date: date,
                    isSelected: date === selectedDate,
                    showPoint: pointOutDate.has(date),
                })
            } else {
                const date = moment([activeYear, activeMonth, 1]).add(i - firstDayInWeekDay, "days")
                    .format(TimeFormat.YYYYMMDD)
                list.push({
                    isOutOfMonth: false,
                    date: date,
                    isSelected: date === selectedDate,
                    showPoint: pointOutDate.has(date),
                })
            }
        }
    } else {
        const daysInMonth = moment([activeYear, activeMonth, 1]).daysInMonth()
        for (let i = 0; i < 7; i ++) {
            const day = 7 - firstDayInWeekDay + (row - 1) * 7 + i
            const date = moment([activeYear, activeMonth, 1]).add(day, "days")
                .format(TimeFormat.YYYYMMDD)
            if (day < daysInMonth) {
                list.push({
                    isOutOfMonth: false,
                    date: date,
                    isSelected: date === selectedDate,
                    showPoint: pointOutDate.has(date),
                })
            } else {
                list.push({
                    isOutOfMonth: true,
                    date: date,
                    isSelected: date === selectedDate,
                    showPoint: pointOutDate.has(date),
                })
            }
        }
    }

    return (
        <div className={"w-full grid grid-cols-7 gap-x-2"}>
            {list.map(({date, isSelected, showPoint, isOutOfMonth}, idx) => {
                return <DayItem key={idx} date={date} isSelected={isSelected} showPoint={showPoint} isOutOfMonth={isOutOfMonth} onChangeDate={onChangeDate} />
            })}
        </div>
    )
}
