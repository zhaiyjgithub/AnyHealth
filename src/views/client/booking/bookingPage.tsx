import React, {useEffect, useState} from "react";
import NavBar from "./components/navBar/navBar";
import {$iconDefaultDoctor} from "../findDoctor/assets/assets";
import {useLocation} from "react-router-dom";
import qs from "qs";
import {DoctorProfile, getDoctorProfile} from "../../doctor/profile/general/GeneralProfileService";
import {AppointmentType} from "../../../utils/enum/enum";
import {formatDateToWeekMonthDayTuple} from "../../../utils/util/dateTool";
import {parseTimeOffset} from "../findDoctor/service/searchDoctorService";
import FormRadio from "../../../components/form/formRadio";
import useUserAuth from "../user/hooks/useUserAuth";
import Button from "../../../components/buttons/button";
import {ButtonSize, ButtonStatus} from "../../../components/buttons/enum";
import Dropdown from "../doctorCard/components/bookingCard/dropdown";
import {dataForInsurance} from "../doctorCard/components/bookingCard/dataForInsuarnce";

interface IRouterLocation {
    npi: string,
    date: string,
    offset: string,
    type: AppointmentType,
}

export default function BookingPage() {
    const [doctorInfo, setDoctorInfo] = useState<DoctorProfile | null>(null)
    const {search} = useLocation<IRouterLocation>()
    const { npi, date, offset, type } = qs.parse(search.replace("?", ""))
    const {user} = useUserAuth()
    console.log(user)

    if (!npi || !date || !offset || !type) {
        return null
    }

    useEffect(() => {
        npi && getDoctorProfile(parseInt(npi.toString(), 10), (doctorProfile) => {
            setDoctorInfo(doctorProfile)
        }, () => {
            //
        })
    }, [])

    const $avatar = (
        <div className={"h-16 w-16 rounded-full bg-red-300 flex-none"} >
            {$iconDefaultDoctor}
        </div>
    )

    const doctorName = `${doctorInfo?.credential} ${doctorInfo?.fullName} ${doctorInfo?.jobTitle}`
    const [week, month, day] = formatDateToWeekMonthDayTuple(new Date(date.toString()))

    const targetDate = new Date(date.toString())
    const initialMinutes = targetDate.getHours() * 60
    const currentOffset = initialMinutes + parseInt(offset.toString(), 10)

    const dateTime = parseTimeOffset(currentOffset >= 1440 ? currentOffset - 1440 : currentOffset)
    const appointmentDateTime = `${week}, ${month} ${day} - ${dateTime}`
    const appointmentTypeDesc = parseInt(type.toString(), 10) === AppointmentType.virtual ? "Video visit" : doctorInfo?.address
    const $info = (
        <div className={"flex-1"}>
            <p className={"text-base text-primary-focus font-bold leading-snug"}>{doctorName}</p>
            <p className={"text-sm text-primary-focus font-medium leading-snug text-left"}>{appointmentDateTime}</p>
            <p className={"text-sm text-primary-focus leading-snug text-left"}>{appointmentTypeDesc}</p>
        </div>
    )

    const $doctorBasicInfo = (
        <div className={"w-full bg-white flex flex-row justify-center border-b"}>
            <div className={"w-full max-w-md flex flex-row items-center text-left py-6 "}>
                <div className={"w-full flex flex-row items-center space-x-2"}>
                    {$avatar}
                    {$info}
                </div>
            </div>
        </div>
    )

    const $title = (
        <p className={"text-2xl leading-none text-center md:text-left text-primary-focus font-bold"}>Review and book</p>
    )

    const userName = `${user.firstName} ${user.lastName}(Me)`
    const dataForPatientList: Array<{name: string, id: number}> = [
        {name: userName, id: 0},
        {name: "Test user", id: 0},
    ]
    const onSelectPatient = (id: number) => {
        console.log(id)
    }
    const $patientList = () => {
        return dataForPatientList.map(({name, id}, idx) => {
            return <FormRadio key={idx} title={name} checked={true} onChange={() => {
                onSelectPatient(id)
            }} />
        })
    }

    const onAddPatient = () => {
        //
    }
    const $addOtherPatientButton = (
        <Button onClick={onAddPatient} status={ButtonStatus.link} >Someone else</Button>
    )
    const $patientInfo = (
        <div className={"w-full space-y-1"}>
            <p className={"text-sm text-primary-focus"}>Who will be seeing the doctor?</p>
            <div className={"w-full flex flex-col space-y-4 p-4 bg-white border"}>
                {$patientList()}
                <div className={"w-max"}>
                    {$addOtherPatientButton}
                </div>
            </div>

        </div>
    )

    const $addPhoneNumberButton = (
        <Button onClick={onAddPatient} status={ButtonStatus.link} >Add phone number</Button>
    )
    const $phoneNumberInfo = (
        <div className={"w-full space-y-1"}>
            <p className={"text-sm text-primary-focus"}>Phone number where the doctor can reach you</p>
            <div className={"w-full flex flex-col space-y-4 p-4 bg-white border"}>
                <div className={"w-max"}>
                    {$addPhoneNumberButton}
                </div>
            </div>
        </div>
    )

    const $dropdownForInsurance = (
        <Dropdown title={"Insurance"} placeholder={"Choose an insurance"} selected={""} data={dataForInsurance} onChange={() => {
            // setBooking({
            //     ...booking,
            //     insurance: value,
            // })
        }}/>
    )

    const $dropdownForIllness = (
        <Dropdown title={"What's the reason for your visit?"} placeholder={"Illness"} selected={""} data={dataForInsurance} onChange={() => {
            // setBooking({
            //     ...booking,
            //     insurance: value,
            // })
        }}/>
    )

    const $newPatientOptionView = (
        <div className={"w-full"}>
            <p className={"text-base text-primary-focus font-semibold"}>Has the patient seen this doctor before?</p>
            <div className={"flex flex-row items-center justify-between border border-base-300 mt-1 bg-white"}>
                <div className={"px-3 py-2.5 flex flex-1 flex-row"}>
                    <FormRadio key={3} title={"No"} checked={true} onChange={() => {
                        //
                    }}/>
                </div>
                <div className={"px-3 py-2.5 flex flex-1 flex-row border-l"}>
                    <FormRadio key={4} title={"Yes"} checked={false} onChange={() => {
                        //
                    }}/>
                </div>
            </div>
        </div>
    )

    const onEditAppointmentTime = () => {
        //
    }
    const $editAppointmentTimeButton = (
        <Button onClick={onEditAppointmentTime} status={ButtonStatus.link} >Edit</Button>
    )
    const $appointmentTimeInfo = (
        <div className={"w-full space-y-1"}>
            <p className={"text-sm text-primary-focus"}>Phone number where the doctor can reach you</p>
            <div className={"w-full flex flex-row items-center justify-between p-4 bg-white border"}>
                <p className={"text-sm text-primary-focus"}>{appointmentDateTime}</p>
                <div className={"w-max"}>
                    {$editAppointmentTimeButton}
                </div>
            </div>
        </div>
    )

    const $memoForAppointment = (
        <div className={"w-full space-y-1"}>
            <div>
                <p className={"text-sm text-primary-focus"}>{"Notes for the doctor's office (optional)"}</p>
            </div>
            <div className={"w-full flex flex-row items-center justify-between bg-white border"}>
                <textarea className={"w-full resize-none h-24 border border-transparent"}/>
            </div>
        </div>
    )

    const $ternOfServiceViewButton = (
        <Button onClick={() => {
            //
        }} status={ButtonStatus.link} >term of service</Button>
    )
    const $agreementView = (
        <label className={"flex flex-row space-x-2 cursor-pointer"}>
            <input type={"checkbox"} className={"form-checkbox mt-1 w-4 h-4 rounded-none flex-none transition duration-150"}/>
            <span className={"text-sm font-semibold text-primary-focus leading-snug"}>
                I certify that the insurance or payment selected is the one that I will be using when I see this medical professional, and that I have read and agree to the Zendoc
                <span className={"w-max ml-1"}>
                    {$ternOfServiceViewButton}
                </span>
            </span>
        </label>
    )

    const $bookButton = (
        <Button size={ButtonSize.block} onClick={() => {
            //
        }} >Book appointment</Button>
    )

    const $contentView = (
        <div className={"w-full max-w-md mt-5 space-y-8"}>
            {$title}
            {$patientInfo}
            {$phoneNumberInfo}
            {$dropdownForInsurance}
            {$dropdownForIllness}
            {$newPatientOptionView}
            {$appointmentTimeInfo}
            {$memoForAppointment}
            {$agreementView}
            {$bookButton}
        </div>
    )

    const $secureButton = (
        <div className={"flex flex-row items-center space-x-4 mt-10"}>
            <i className="fas fa-lock text-xs text-gray-400" />
            <p className={"font-semibold text-xs text-gray-400"}>
                Secure booking
            </p>
        </div>
    )

    return (
        <div className={"w-full min-h-screen bg-gray-100 flex pb-10 md:pb-20 flex-col items-center"}>
            <NavBar />
            {$doctorBasicInfo}
            {$contentView}
            {$secureButton}
        </div>
    )
}
