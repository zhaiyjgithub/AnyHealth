import React, {useState} from "react";
import Button from "../../../../../components/buttons/button";
import {ButtonStatus, ButtonType} from "../../../../../components/buttons/enum";
import {formatDateToWeekMonthDay} from "../../../../../utils/util/dateTool";
import Calendar from "react-calendar";

interface IProps {
    date: Date,
    onApply: (date: Date) => void,
}

export default function CalendarFilter(props: IProps) {
    const {onApply} = props
    const [show, setShow] = useState<boolean>(false)
    const [date, setDate] = useState<Date>(props.date)

    const formattedDate = formatDateToWeekMonthDay(date)
    const $toggleButton = (
        <button onClick={(e) => {
            e.stopPropagation()
            setShow(!show)
        }} type={"button"} className={"z-10 relative px-4 py-2 font-medium rounded-full flex flex-row items-center border text-primary-focus text-sm leading-snug hover:bg-base-250 hover:border-primary-focus border-base-300 bg-white space-x-2"}>
            <i className="flex-none far fa-calendar"></i>
            <span>{formattedDate}</span>
        </button>
    )

    const $bg = show ? (
        <div onClick={() => {
            setShow(false)
        }} className={"fixed inset-0 h-full w-full z-20"} />
    ) : null

    const $footer = (
        <div className={"w-full flex flex-row items-center justify-end border-t px-4 py-2"}>
            <Button type={ButtonType.float} onClick={() => {
                setShow(false)
                setDate(props.date)
                onApply && onApply(props.date)
            }}>Cancel</Button>
            <Button status={ButtonStatus.primary} onClick={() => {
                onApply && onApply(date)
                setShow(false)
            }}>
                Apply
            </Button>
        </div>
    )

    const onChange = (_date: Date) => {
        setDate(_date)
    }

    const $calendar = (
        <Calendar minDate={new Date()} onChange={onChange} value={date} />
    )
    const $list = show ? (
        <div className="absolute border border-base-200 right-0 mt-1 bg-white shadow-2xl z-20 transition duration-150 ease-in-out">
            {$calendar}
            {$footer}
        </div>
    ) : null

    return (
        <div className={"relative w-max"}>
            {$toggleButton}
            {$bg}
            {$list}
        </div>
    )
}