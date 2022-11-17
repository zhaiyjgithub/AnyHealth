import React, {useEffect, useState} from "react";
import FormRadio from "../../../../../components/form/formRadio";
import Dropdown from "./dropdown";
import {AppointmentType} from "../../../../../utils/enum/enum";
import TimeSlotsView from "./timeSlotsView";
import {getTimeSlots} from "../../../searchDoctor/service/searchDoctorService";
import {TimeSlotPerDay} from "../../../searchDoctor/model/doctor";
import {dataForIllness, dataForInsurance} from "./dataForInsuarnce";
import Button from "../../../../../components/buttons/button";
import {TimeSlot} from "../../../searchDoctor/components/doctor/timeslots/timeslots";
import {useHistory} from "react-router-dom";
import moment from "moment";

export interface Booking {
    insuranceId: string,
    illnessId: 0,
    appointmentType: AppointmentType,
    isNewPatient: boolean | undefined,
}

interface IProps {
    npi: number
}

export default function BookingCard(props: IProps) {
    const {npi} = props
    const [dataForAllAvailable, setDataForAllAvailable] = useState<Array<TimeSlotPerDay>>([])
    const [booking, setBooking] = useState<Booking>({
        insuranceId: "",
        illnessId: 0,
        appointmentType: AppointmentType.inClinic,
        isNewPatient: undefined,
    })
    const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null)
    const [startDate, setStartDate] = useState<Date>(new Date())
    const history = useHistory()
    useEffect(() => {
        const startDate = (new Date()).toISOString()
        const endDate = moment(new Date()).add(5, "days")
            .toDate()
            .toISOString()
        getAllTimeSlots(npi, startDate, endDate)
    }, [props.npi])

    const getAllTimeSlots = (npi: number, startDate: string, endDate: string) => {
        getTimeSlots(npi, startDate, endDate, (list) => {
            setDataForAllAvailable(list)
        }, () => {
            //
        })
    }

    const $title = (
        <p className={"font-bold text-2xl text-primary-focus"}>Book an appointment for free</p>
    )

    const $dropdownForInsurance = (
        <Dropdown title={"What's your insurance plan?"} placeholder={"Choose an insurance"} selected={booking.insuranceId} data={dataForInsurance} onChange={(id) => {
            setBooking({
                ...booking,
                insuranceId: id,
            })
        }} />
    )

    const $dropdownForIllness = (
        <Dropdown title={"What's the reason of your visit?"} placeholder={"Illness"} selected={booking.illnessId} data={dataForIllness} onChange={(id) => {
            setBooking({
                ...booking,
                illnessId: id,
            })
        }} />
    )

    const $newPatientOptionView = (
        <div className={"w-full"}>
            <p className={"text-base text-primary-focus font-semibold"}>Has the patient seen this doctor before?</p>
            <div className={"flex flex-row items-center justify-between border border-base-300 mt-1 bg-white"}>
                <div className={"px-3 py-2.5 flex flex-1 flex-row"}>
                    <FormRadio key={3} title={"No"} checked={booking.isNewPatient === true} onChange={() => {
                        setBooking({
                            ...booking,
                            isNewPatient: true,
                        })
                    }}/>
                </div>
                <div className={"px-3 py-2.5 flex flex-1 flex-row border-l"}>
                    <FormRadio key={4} title={"Yes"} checked={booking.isNewPatient === false} onChange={() => {
                        setBooking({
                            ...booking,
                            isNewPatient: false,
                        })
                    }}/>
                </div>
            </div>
        </div>
    )

    const $appointmentTypeOptionView = (
        <div className={"w-full"}>
            <p className={"text-base text-primary-focus font-semibold"}>Choose the type of appointment</p>
            <div className={"flex flex-row items-center justify-between border mt-1 bg-white"}>
                <div className={"px-3 py-2.5 flex flex-1 flex-row"}>
                    <FormRadio key={1} title={"In-person"} checked={booking.appointmentType === AppointmentType.inClinic} onChange={() => {
                        setBooking({
                            ...booking,
                            appointmentType: AppointmentType.inClinic,
                        })
                    }}/>
                </div>
                <div className={"px-3 py-2.5 flex flex-1 flex-row border-l"}>
                    <FormRadio key={2} title={"Video visit"} checked={booking.appointmentType === AppointmentType.virtual} onChange={() => {
                        setBooking({
                            ...booking,
                            appointmentType: AppointmentType.virtual,
                        })
                    }}/>
                </div>
            </div>
        </div>
    )

    const $timeSlotsView = (
        <TimeSlotsView selectedTimeSlot={selectedTimeSlot} onSelect={(timeSlot) => {
            setSelectedTimeSlot(timeSlot)
        }} total={5} startDate={startDate} timeSlotsPerDay={dataForAllAvailable} onPrevious={() => {
            const previewStartDate = moment(startDate).subtract(4, "days")
                .toDate()
            setStartDate(previewStartDate)
        }} onNext={() => {
            const nextStartDate = moment(startDate).add(4, "days")
                .toDate()
            setStartDate(nextStartDate)
        }}/>
    )

    const onClickContinueBook = () => {
        if (!booking.insuranceId.length) {
            return;
        }
        if (!booking.illnessId) {
            return;
        }
        if (booking.isNewPatient === undefined) {
            return;
        }
        if (!selectedTimeSlot) {
            return
        }
        history.push({
            pathname: "/booking",
            search: `?npi=${npi}&date=${selectedTimeSlot.date}&dateTime=${selectedTimeSlot.dateTime}&offset=${selectedTimeSlot.offset}&isNewPatient=${booking.isNewPatient}&insuranceID=${booking.insuranceId}&illnessID=${booking.illnessId}&appointmentType=${booking.appointmentType}`,
        })
    }
    const $bookButton = (
        <Button onClick={onClickContinueBook} >Continue booking</Button>
    )
    return (
        <div className={"p-8 w-full flex flex-col space-y-4 border bg-base-200"}>
            {$title}
            {$dropdownForInsurance}
            {$dropdownForIllness}
            {$newPatientOptionView}
            {$appointmentTypeOptionView}
            {$timeSlotsView}
            {$bookButton}
        </div>
    )
}
