import React, {useEffect, useState} from "react";
import {dataForInsurance} from "./dataForInsuarnce"
import FormRadio from "../../../../../components/form/formRadio";
import Dropdown from "./dropdown";
import {AppointmentType} from "../../../../../utils/enum/enum";
import AvailableDateView from "./availableDateView";
import {getTimeSlots} from "../../../findDoctor/service/searchDoctorService";
import {TimeSlotPerDay} from "../../../findDoctor/model/doctor";

export interface Booking {
    insurance: string,
    insuranceId: null,
    appointmentType: AppointmentType,
    reasonForAppt: string,
    isNewPatient: boolean,
    officeLocationId: number,
    dateTime: string,
    npi: number
}

export default function BookingCard() {
    const [dataForAllAvailable, setDataForAllAvailable] = useState<Array<TimeSlotPerDay>>([])
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

    const $dropdownForInsurance = (
        <Dropdown title={"What's your insurance plan?"} selected={dataForInsurance[0]} data={dataForInsurance} onChange={() => {
            //
        }} />
    )

    const $dropdownForIllness = (
        <Dropdown title={"What's the reason of your visit?"} selected={dataForInsurance[0]} data={dataForInsurance} onChange={() => {
            //
        }} />
    )

    const $newPatientOptionView = (
        <div className={"w-full"}>
            <p className={"text-base text-primary-focus font-semibold"}>Has the patient seen this doctor before?</p>
            <div className={"flex flex-row items-center justify-between border border-base-300 mt-1 bg-white"}>
                <div className={"px-3 py-2.5 flex flex-1 flex-row"}>
                    <FormRadio title={"No"} checked onChange={() => {
                        //
                    }}/>
                </div>
                <div className={"px-3 py-2.5 flex flex-1 flex-row border-l"}>
                    <FormRadio title={"Yes"} checked onChange={() => {
                        //
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
                    <FormRadio title={"In-person"} checked onChange={() => {
                        //
                    }}/>
                </div>
                <div className={"px-3 py-2.5 flex flex-1 flex-row border-l"}>
                    <FormRadio title={"In-person"} checked onChange={() => {
                        //
                    }}/>
                </div>
            </div>
        </div>
    )

    const $availableTimeView = (
        <AvailableDateView total={5} startDate={new Date()} timeSlotsPerDay={dataForAllAvailable} />
    )

    return (
        <div className={"p-8 w-full flex flex-col space-y-4 border bg-base-200"}>
            {$title}
            {$dropdownForInsurance}
            {$dropdownForIllness}
            {$newPatientOptionView}
            {$appointmentTypeOptionView}
            {$availableTimeView}
        </div>
    )
}