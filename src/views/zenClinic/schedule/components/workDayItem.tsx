import React from "react";
import moment from "moment";
import {TimeFormat, WeekDayShort} from "../../../../utils/enum/enum";

interface IProps {
    date: string,
    isSelected: boolean,
    showPoint: boolean,
    isOutOfMonth: boolean,
    onChangeDate: (date: string) => void
}

export default function WorkDayItem(props: IProps) {
    const {date, isSelected, showPoint, isOutOfMonth, onChangeDate} = props
    const m = moment(date, TimeFormat.YYYYMMDD)
    const day = m.date()
    const weekDay = m.weekday()
    const weekDayShortName = WeekDayShort[weekDay]
    const isToday = moment().isSame(m, "day")
    return (
        <button type={"button"} onClick={() => {
            onChangeDate && onChangeDate(date)
        }} className={"w-full flex flex-col items-center justify-center"}>
            <p className={`${isOutOfMonth ? "text-gray-400" : (isSelected ? "text-primary-focus font-bold" : (isToday ? "text-blue-500 font-bold" : weekDay === 0 ? "text-red-500 font-bold" : "text-primary-focus"))} text-sm leading-none`}>{weekDayShortName}</p>
            <div className={`${!isOutOfMonth && isSelected ? "bg-blue-500" : ""} h-8 w-8 rounded-full flex flex-col items-center justify-center mt-1`}>
                <p className={`${isOutOfMonth ? "text-gray-400" : (isSelected ? "bg-blue-500 text-white font-bold" : (isToday ? "text-blue-500 font-bold" : ""))} text-sm leading-none`}>{day}</p>
                <div className={`${showPoint ? (isOutOfMonth ? "bg-gray-400" : (isSelected ? "bg-white" : "bg-blue-500")) : "hidden"} mt-1 h-1 w-1 rounded-full`}/>
            </div>
        </button>
    )
}
