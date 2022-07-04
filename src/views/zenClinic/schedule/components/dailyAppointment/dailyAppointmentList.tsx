import React, {useMemo} from "react";
import {Appointment} from "../types";
import moment from "moment";
import {TimeFormat} from "../../../../../utils/enum/enum";

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
    console.log(minNumberOfPerSlot)
    const section = useMemo(() => {
        let data: Appointment[][] = []
        for (let row = 0; row < rows; row ++) {
            let row: Array<Appointment> = []
            data.push(row)
        }
        dataForAppointments.forEach((appointment) => {
            const mAppointmentDate = moment.utc(appointment.appointmentDateTime)
            console.log(mAppointmentDate.hours(), mAppointmentDate.minutes())
            let offset = mAppointmentDate.hours() * 60 + mAppointmentDate.minutes()
            let targetIndex = parseInt(((offset - mWorkStartDateOffset) / interval).toString(), 10)
            console.log(targetIndex)
            data[targetIndex].push(appointment)
        })
        return data
    }, [selectedDate])
    console.log(section)

    return (
        <div className={"w-full grid grid-rows-10"}>

        </div>
    )
}
