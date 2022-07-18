import React, {useMemo} from "react";
import {Appointment} from "../types";
import moment from "moment";
import {TimeFormat} from "../../../../../utils/enum/enum";
import AppointmentRow from "./appointmentRow";

interface IProps {
    selectedDate: string
    workStartDateTime: string,
    workEndDateTime: string,
    interval: number,
    numberPerSlot: number,
    dataForAppointments: Array<Appointment>
}

export default function DailyAppointmentList(props: IProps) {
    const {selectedDate, workEndDateTime, workStartDateTime, numberPerSlot = 3, interval, dataForAppointments} = props
    const mWorkStartDateTime = moment(`${selectedDate} ${workStartDateTime}`, TimeFormat.YYYYMMDDHHmm)
    const mWorkEndDateTime = moment(`${selectedDate} ${workEndDateTime}`, TimeFormat.YYYYMMDDHHmm)
    const mWorkStartDateOffset = mWorkStartDateTime.hours() * 60 + mWorkStartDateTime.minutes()
    const rows = mWorkEndDateTime.diff(mWorkStartDateTime, 'minutes') / interval
    const minNumberOfPerSlot = numberPerSlot >= 3 ? numberPerSlot : 3
    const section = useMemo(() => {
        let data: Appointment[][] = []
        for (let row = 0; row < rows; row ++) {
            let row: Array<Appointment> = []
            data.push(row)
        }
        dataForAppointments.forEach((appointment) => {
            const mAppointmentDate = moment.utc(appointment.appointmentDateTime)
            console.log(mAppointmentDate.hours(), mAppointmentDate.minutes())
            const offset = mAppointmentDate.hours() * 60 + mAppointmentDate.minutes()
            const targetIndex = parseInt(((offset - mWorkStartDateOffset) / interval).toString(), 10)
            console.log(targetIndex)
            data[targetIndex].push(appointment)
        })
        return data
    }, [selectedDate])

    const $sectionList = (section.map((rows:Appointment[], idx) => {
        return (
            <AppointmentRow key={idx} numberPerSlots={minNumberOfPerSlot} data={rows} />
        )
    }))
    return (
        <div className={"w-full grid gap-y-2 grid-rows-10"}>
            {$sectionList}
        </div>
    )
}
