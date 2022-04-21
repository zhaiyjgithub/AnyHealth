import React, {useEffect, useMemo, useState} from "react";
import FormRadio from "../../../../../components/form/formRadio";
import Dropdown, {DropDownItem} from "./dropdown";
import {AppointmentType} from "../../../../../utils/enum/enum";
import AvailableDateView from "./availableDateView";
import {getTimeSlots} from "../../../findDoctor/service/searchDoctorService";
import {TimeSlotPerDay} from "../../../findDoctor/model/doctor";
import {dataForIllness} from "./dataForInsuarnce";
import Button from "../../../../../components/buttons/button";
import {TimeSlot} from "../../../findDoctor/components/doctor/timeslots/timeslots";

export interface Booking {
    insurance: string,
    insuranceId: null,
    illness: string,
    appointmentType: AppointmentType,
    reasonForAppt: string,
    isNewPatient: boolean,
    officeLocationId: number,
    dateTime: string,
    npi: number
}

export default function BookingCard() {
    const [dataForAllAvailable, setDataForAllAvailable] = useState<Array<TimeSlotPerDay>>([])
    const [booking, setBooking] = useState<Booking>({
        insurance: "",
        appointmentType: AppointmentType.inClinic,
        dateTime: "",
        illness: "",
        insuranceId: null,
        isNewPatient: false,
        npi: 0,
        officeLocationId: 0,
        reasonForAppt: "",
    })
    const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null)
    useEffect(() => {
        getAllTimeSlots(1902809254, (new Date()).toISOString())
    }, [])

    const getAllTimeSlots = (npi: number, startDate: string) => {
        getTimeSlots(npi, startDate, 5, (list) => {
            setDataForAllAvailable(list)
        }, () => {
            //
        })
    }

    const $title = (
        <p className={"font-bold text-2xl text-primary-focus"}>Book an appointment for free</p>
    )

    const dataForInsurance = useMemo(() => {
        const list = [
            "Aetna Choice POS II",
            "Aetna HMO",
            "BCBS Blue Card PPO",
            "CIGNA HMO",
            "CIGNA Open Access",
            "CIGNA PPO",
            "Empire BCBS HMO",
            "Empire BCBS PPO",
            "GHI PPO",
            "HIP of New York - Select PPO",
            "Humana ChoiceCare Network PPO",
            "MagnaCare PPO",
            "MVP Healthcare PPO",
            "Oxford Health Freedom",
            "Oxford Health Liberty",
            "United Healthcare - Direct Choice Plus POS",
            "United Healthcare - Direct Options PPO",
        ]
        return list.map((item) => {
            return {name: item, id: item} as DropDownItem
        })
    }, [])

    const $dropdownForInsurance = (
        <Dropdown title={"What's your insurance plan?"} placeholder={"Choose an insurance"} selected={booking?.insurance} data={dataForInsurance} onChange={(value) => {
            setBooking({
                ...booking,
                insurance: value,
            })
        }} />
    )

    const $dropdownForIllness = (
        <Dropdown title={"What's the reason of your visit?"} placeholder={"Illness"} selected={booking?.illness} data={dataForIllness} onChange={(value) => {
            setBooking({
                ...booking,
                illness: value,
            })
        }} />
    )

    const $newPatientOptionView = (
        <div className={"w-full"}>
            <p className={"text-base text-primary-focus font-semibold"}>Has the patient seen this doctor before?</p>
            <div className={"flex flex-row items-center justify-between border border-base-300 mt-1 bg-white"}>
                <div className={"px-3 py-2.5 flex flex-1 flex-row"}>
                    <FormRadio key={3} title={"No"} checked={!booking.isNewPatient} onChange={() => {
                        setBooking({
                            ...booking,
                            isNewPatient: false,
                        })
                    }}/>
                </div>
                <div className={"px-3 py-2.5 flex flex-1 flex-row border-l"}>
                    <FormRadio key={4} title={"Yes"} checked={booking.isNewPatient} onChange={() => {
                        setBooking({
                            ...booking,
                            isNewPatient: true,
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

    const $availableTimeView = (
        <AvailableDateView selectedTimeSlot={selectedTimeSlot} onSelect={(timeSlot) => {
            setSelectedTimeSlot(timeSlot)
        }} total={5} startDate={new Date()} timeSlotsPerDay={dataForAllAvailable} />
    )

    const $bookButton = (
        <Button onClick={() => {
            //
        }} >Continue booking</Button>
    )
    return (
        <div className={"p-8 w-full flex flex-col space-y-4 border bg-base-200"}>
            {$title}
            {$dropdownForInsurance}
            {$dropdownForIllness}
            {$newPatientOptionView}
            {$appointmentTypeOptionView}
            {$availableTimeView}
            {$bookButton}
        </div>
    )
}
