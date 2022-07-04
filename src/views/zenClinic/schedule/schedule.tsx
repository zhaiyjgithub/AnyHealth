import React, {useState} from "react";
import MonthDropdown from "./components/monthDropdown";
import WorkDaysList from "./components/workDaysList";
import moment from "moment";
import {TimeFormat} from "../../../utils/enum/enum";
import DailyAppointmentList from "./components/dailyAppointment/dailyAppointmentList";
import {Appointment} from "./components/types";

export default function Schedule() {
    const [selectedDate, setSelectedDate] = useState<string>(moment().format(TimeFormat.YYYYMMDD))
    const $monthDropdown = (
        <MonthDropdown onChange={(idx) => {
            console.log(idx)
        }}/>
    )

    const $brand = (
        <p className={"font-bold text-4xl md:text-4xl text-base-content font-playball"}>
            ZenDoc
        </p>
    )
    const $workdayList = (
        <WorkDaysList selectedDate={selectedDate} onChangeDate={(date) => {
            setSelectedDate(date)
        }} />
    )

    const $navBar = (
        <div className={"bg-base-200 border-b sticky top-0 w-full py-4 px-8 space-y-2"}>
            <div className={"grid grid-cols-2 content-center"}>
                <div>
                    {$brand}
                </div>
                <div>
                    {$monthDropdown}
                </div>
            </div>
            {$workdayList}
        </div>
    )

    const data: Array<Appointment> = [
        {
            firstName: "Hello",
            appointmentDateTime: "2022-07-03T09:15:00.00Z",
        },
        {
            firstName: "Hello",
            appointmentDateTime: "2022-07-03T09:15:00.00Z",
        },
        {
            firstName: "Hello",
            appointmentDateTime: "2022-07-03T09:15:00.00Z",
        },
        {
            firstName: "Hello",
            appointmentDateTime: "2022-07-03T10:00:00.00Z",
        },
        {
            firstName: "Hello",
            appointmentDateTime: "2022-07-03T10:15:00.00Z",
        },
        {
            firstName: "Hello",
            appointmentDateTime: "2022-07-03T10:15:00.00Z",
        },
        {
            firstName: "Hello",
            appointmentDateTime: "2022-07-03T14:15:00.00Z",
        },
        {
            firstName: "Hello",
            appointmentDateTime: "2022-07-03T16:15:00.00Z",
        },
    ]
    return (
        <div className={"w-full flex-1"}>
            {$navBar}
            <DailyAppointmentList
                selectedDate={"2022-07-03"}
                workStartDateTime={"09:00"}
                workEndDateTime={"17:00"}
                interval={15}
                numberPerSlot={3}
                dataForAppointments={data} />
        </div>
    )
}
