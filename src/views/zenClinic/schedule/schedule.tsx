import React, {useState} from "react";
import MonthDropdown from "./components/monthDropdown";
import WorkDaysList from "./components/workDaysList";
import moment from "moment";
import {TimeFormat} from "../../../utils/enum/enum";
import DailyAppointmentList from "./components/dailyAppointment/dailyAppointmentList";
import {Appointment} from "./components/types";
import Button from "../../../components/buttons/button";

export default function Schedule() {
    const [selectedDate, setSelectedDate] = useState<string>(moment().format(TimeFormat.YYYYMMDD))
    const $monthDropdown = (
        <MonthDropdown onChange={(idx) => {
            console.log(idx)
        }}/>
    )
    const $refreshButton = (
        <Button onClick={(e) => {
            e.stopPropagation()
        }}>
            <div className={'flex space-x-2 items-center'}>
                <i className="fas fa-redo-alt"></i>
                <p>Refresh</p>
            </div>
        </Button>
    )

    const $newAppointmentButton = (
        <Button onClick={() => {
            //
        }} >
            <div className={'flex space-x-2 items-center'}>
                <i className="fas fa-plus"></i>
                <p>New Appointment</p>
            </div>
        </Button>
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

    const $toolbar = (
        <div className={"flex flex-row items-center justify-between"}>
            <div>
                {$brand}
            </div>
            <div className={'flex justify-end space-x-8'}>
                {$monthDropdown}
                {$refreshButton}
                {$newAppointmentButton}
            </div>
        </div>
    )
    const $navBar = (
        <div className={"z-50 bg-base-200 border-b sticky top-0 w-full py-4 px-8 space-y-6"}>
            {$toolbar}
            {$workdayList}
        </div>
    )

    const data: Array<Appointment> = [
        {
            firstName: "Hello",
            lastName: "Hello",
            appointmentDateTime: "2022-07-03T09:15:00.00Z",
        },
        {
            firstName: "Hello",
            lastName: "Hello",
            appointmentDateTime: "2022-07-03T09:15:00.00Z",
        },
        {
            firstName: "Hello",
            lastName: "Hello",
            appointmentDateTime: "2022-07-03T09:15:00.00Z",
        },
        {
            firstName: "Hello",
            lastName: "Hello",
            appointmentDateTime: "2022-07-03T10:00:00.00Z",
        },
        {
            firstName: "Hello",
            lastName: "Hello",
            appointmentDateTime: "2022-07-03T10:15:00.00Z",
        },
        {
            firstName: "Hello",
            lastName: "Hello",
            appointmentDateTime: "2022-07-03T10:15:00.00Z",
        },
        {
            firstName: "Hello",
            lastName: "Hello",
            appointmentDateTime: "2022-07-03T14:15:00.00Z",
        },
        {
            firstName: "Hello",
            lastName: "Hello",
            appointmentDateTime: "2022-07-03T16:15:00.00Z",
        },
    ]

    const $appointmentList = (
        <div className={'pl-10'}>
            <DailyAppointmentList
                selectedDate={"2022-07-03"}
                workStartDateTime={"09:00"}
                workEndDateTime={"17:00"}
                interval={15}
                numberPerSlot={3}
                dataForAppointments={data} />
        </div>
    )
    return (
        <div className={"w-full flex-col flex-1"}>
            {$navBar}
            {$appointmentList}
        </div>
    )
}
