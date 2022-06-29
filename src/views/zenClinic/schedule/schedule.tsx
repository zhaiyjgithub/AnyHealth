import React, {useState} from "react";
import Calendar from "../../../components/calendar/calendar";
import moment from "moment";
import {TimeFormat} from "../../../utils/enum/enum";

export default function Schedule() {
    const [selectedDate, setSelectedDate] = useState<string>(moment().format(TimeFormat.YYYYMMDD))
    const onChangeDate = (date: string) => {
        setSelectedDate(date)
    }
    return (
        <div className={"w-full flex-1"}>
            <Calendar selectedDate={selectedDate} onChangeDate={onChangeDate}/>
        </div>
    )
}
