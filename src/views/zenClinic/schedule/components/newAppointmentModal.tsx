import React, {useContext, useEffect, useState} from "react";
import FormModal from "../../../../components/modal/formModal";
import Button from "../../../../components/buttons/button";
import {Variant} from "../../../../components/buttons/enum";
import FormInput from "../../../../components/form/formInput";
import {getTimeSlots, parseTimeOffset} from "../../../zenDoc/findDoctor/service/searchDoctorService";
import {TimeSlot} from "../../../zenDoc/findDoctor/components/doctor/timeslots/timeslots";
import {TimeSlotPerDay} from "../../../zenDoc/findDoctor/model/doctor";
import moment from "moment";
import {DoctorInfoContext} from "../../doctorInfoContext";

interface IProps {
    show: boolean
    onClose: () => void
    onSave: () => void
}

export default function NewAppointmentModal(props: IProps) {
    const {onClose, show} = props
    const [timeSlots, setTimeSlots] = useState<Array<TimeSlot>>([])
    const doctorInfo = useContext(DoctorInfoContext)
    console.log("doctor info: ", doctorInfo)

    const $closeButton = (
        <div className={"w-full flex flex-row justify-end mt-2"}>
            <Button onClick={() => {
                onClose && onClose()
            }} variant={Variant.float} >
                <i className="fas fa-times text-xl" />
            </Button>
        </div>
    )

    useEffect(() => {
        if (!show) {
            return
        }
        getTimeSlotsByNpi(1073845020, moment().toDate()
            .toISOString())
    }, [show])

    const getTimeSlotsByNpi = (npi: number, startDate: string) => {
        getTimeSlots(npi, startDate, 0, (list) => {
            if (!list.length) {
                console.log("No more record")
                return
            }
            const perDay: TimeSlotPerDay = list[0]
            const {date, timeSlots} = perDay
            const targetDate = moment(date)
            const initialMinutes = targetDate.hours() * 60
            timeSlots.forEach((timeSlot) => {
                const currentOffset = initialMinutes + timeSlot.offset
                timeSlot.isOverOneDay = currentOffset >= 1440
                timeSlot.date = date
                timeSlot.dateTime = parseTimeOffset(currentOffset >= 1440 ? currentOffset - 1440 : currentOffset)
            })
            setTimeSlots(timeSlots)
        }, () => {
            //
        })
    }

    const $overOneDayTag = (
        <p className={"bg-pink-500 p-px rounded-full text-white absolute text-xs -right-1.5 -bottom-1.5"}>+1</p>
    )

    const $timeSlot = (timeSlot: TimeSlot, idx: number) => {
        return (
            <button type={"button"} className={"relative w-full py-2 px-2 bg-primary hover:bg-primary-focus text-primary-focus hover:text-focus leading-snug text-sm font-meduim"} key={idx} onClick={() => {
                //
            }} >
                {timeSlot.dateTime}
                {timeSlot.isOverOneDay ? $overOneDayTag : null}
            </button>
        )
    }

    const $timeSlotsView = (
        <div className={"grid grid-cols-4 2xl:grid-cols-5 gap-2"}>
            {timeSlots.map((timeslot, idx) => {
                return $timeSlot(timeslot, idx)
            })}
        </div>
    )

    const $contentView = (
        <div className={"flex-1 px-8 space-y-4"}>
            <p className={"text-lg font-bold"}>Add New Appointment</p>
            <FormInput title={"Appointment date"} value={""} />
            {$timeSlotsView}
        </div>
    )

    return (
        <FormModal show={show}>
            {$closeButton}
            {$contentView}
        </FormModal>
    )
}
