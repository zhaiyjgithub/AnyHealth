import React from "react";
import Button from "../../../../../components/buttons/button";
import {DoctorInfo, TimeSlotPerDay} from "../../model/doctor";
import {Variant} from "../../../../../components/buttons/enum";
import TimeSlotsPerDay from "./timeSlotsPerDay";
import {$iconDefaultDoctor} from "../../assets/assets";
import moment from "moment";
import FormModal from "../../../../../components/modal/formModal";

interface IProps {
    show: boolean,
    doctorInfo: DoctorInfo,
    timeSlotsPerDay: Array<TimeSlotPerDay>,
    onClose: () => void,
    onRequestTimeSlots: (date: string) => void
}

export default function AllAvailableTimeSlots(props: IProps) {
    const { show, doctorInfo, onClose, onRequestTimeSlots, timeSlotsPerDay } = props

    const $closeButton = (
        <div className={"w-full flex flex-row justify-end mt-2"}>
            <Button onClick={() => {
                onClose && onClose()
            }} variant={Variant.float} >
                <i className="fas fa-times text-xl" />
            </Button>
        </div>
    )

    const $avatar = (
        <div className={"h-24 w-24 rounded-full bg-red-300 flex-none"} >
            {$iconDefaultDoctor}
        </div>
    )

    const $review = (
        <div className={"flex flex-row items-center space-x-1 mt-1"}>
            <i className="fas fa-star text-pink-400 w-4 h-4"/>
            <p className={"text-pink-400 text-sm font-medium leading-snug"}>4.69</p>
            <p className={"text-gray-400 text-sm font-medium leading-snug"}>(273)</p>
        </div>
    )

    const doctorName = `${doctorInfo.namePrefix} ${doctorInfo.fullName} ${doctorInfo.jobTitle}`
    const $info = (
        <div className={"flex-1"}>
            <p className={"text-base text-primary-focus font-bold leading-snug"}>{doctorName}</p>
            <p className={"text-sm text-primary-focus font-medium leading-snug text-left"}>{doctorInfo.specialty}</p>
            <p className={"text-sm text-primary-focus leading-snug text-left"}>{doctorInfo.address}</p>
            {$review}
        </div>
    )

    const $basicInfo = (
        <div className={"w-full px-8 flex flex-row items-center space-x-6"}>
            {$avatar}
            {$info}
        </div>
    )

    const onPrevious = () => {
        const dateUTC = new Date(timeSlotsPerDay[0].date)
        const m = moment(dateUTC).subtract(5, "days")
            .toISOString()
        onRequestTimeSlots && onRequestTimeSlots(m)
    }

    const onNext = () => {
        const dateUTC = new Date(timeSlotsPerDay[timeSlotsPerDay.length - 1].date)
        const m = moment(dateUTC).add(1, "days")
            .toISOString()
        onRequestTimeSlots && onRequestTimeSlots(m)
    }
    const $timeSlotsView = (
        <TimeSlotsPerDay timeSlotsPerDay={timeSlotsPerDay} doctorName={doctorName} onNext={onNext} onPrevious={onPrevious} />
    )
    return (
        <FormModal show={show} >
            {$closeButton}
            {$basicInfo}
            {$timeSlotsView}
        </FormModal>
    )
}
