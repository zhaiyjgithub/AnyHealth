import React, {useContext, useEffect, useState} from "react";
import MonthDropdown from "./components/monthDropdown";
import WorkDaysList from "./components/workDaysList";
import moment from "moment";
import {TimeFormat} from "../../../utils/enum/enum";
import DailyAppointmentList from "./components/dailyAppointment/dailyAppointmentList";
import Button from "../../../components/buttons/button";
import NewAppointmentModal from "./components/newAppointmentModal";
import {DoctorInfoContext} from "../doctorInfoContext";
import {Appointment} from "../../patient/appointment/types";
import {getAppointmentByDate} from "./service";

export default function Schedule() {
    const [dataSource, setDataSource] = useState<Array<Appointment>>([])
    const [selectedDate, setSelectedDate] = useState<string>(moment().format(TimeFormat.YYYYMMDD))
    const [show, setShow] = useState<boolean>(false)
    const {doctorUser} = useContext(DoctorInfoContext)

    useEffect(() => {
        const curDate = moment(selectedDate, TimeFormat.YYYYMMDD)
        const nextDate = moment(selectedDate, TimeFormat.YYYYMMDD).add(1, "day")
        const startDate = (new Date(curDate.year(), curDate.month(), curDate.date(), 0, 0, 0)).toISOString()
        const endDate = (new Date(nextDate.year(), nextDate.month(), nextDate.date(), 0, 0, 0)).toISOString()
        getAppointmentByDate(doctorUser.npi, startDate, endDate, (data) => {
            setDataSource(data)
        }, () => {
            //
        })
    }, [])

    const $monthDropdown = (
        <MonthDropdown onChange={(idx) => {
            console.log(idx)
        }}/>
    )
    const $refreshButton = (
        <Button onClick={(e) => {
            e.stopPropagation()
        }}>
            <div className={"flex space-x-2 items-center"}>
                <i className="fas fa-redo-alt"></i>
                <p>Refresh</p>
            </div>
        </Button>
    )

    const $newAppointmentButton = (
        <Button onClick={() => {
            setShow(true)
        }} >
            <div className={"flex space-x-2 items-center"}>
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
            <div className={"flex justify-end space-x-8"}>
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

    const $appointmentList = (
        <div className={"pl-10"}>
            <DailyAppointmentList
                selectedDate={"2022-07-03"}
                workStartDateTime={"09:00"}
                workEndDateTime={"17:00"}
                interval={15}
                numberPerSlot={3}
                dataForAppointments={dataSource} />
        </div>
    )

    const onCloseModal = () => {
        setShow(false)
    }

    const onSaveModal = () => {
        setShow(false)
    }
    const $newAppointmentModal = (
        <NewAppointmentModal npi={doctorUser.npi} show={show} onClose={onCloseModal} onSave={onSaveModal} />
    )
    return (
        <div className={"w-full flex-col flex-1"}>
            {$navBar}
            {$appointmentList}
            {$newAppointmentModal}
        </div>
    )
}
