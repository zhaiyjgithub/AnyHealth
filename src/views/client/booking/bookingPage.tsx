import React, {useEffect, useMemo, useState} from "react";
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
import {dataForIllness, dataForInsurance} from "../doctorCard/components/bookingCard/dataForInsuarnce";
import NewSubPatientModal from "./components/newPatient/newSubPatientModal";
import PhoneNumberModal from "./components/addPhoneNumber/phoneNumberModal";
import {SubUser} from "./components/types";
import {createSubUser, getDoctorTimeSlots, getSubUsers} from "./bookingService";
import {TimeSlotPerDay} from "../findDoctor/model/doctor";
import WeekDayHeader from "./components/weekDayHeader";
import Timeslots from "./components/timeSlots/timeSlots";
import {TimeSlot} from "../findDoctor/components/doctor/timeslots/timeslots";
import moment from "moment";

interface IRouterLocation {
    npi: string,
    date: string,
    offset: string,
    type: AppointmentType,
}

interface PatientList {
    name: string,
    id: number,
}

export default function BookingPage() {
    const [doctorInfo, setDoctorInfo] = useState<DoctorProfile | null>(null)
    const {search} = useLocation<IRouterLocation>()
    const { npi, date, offset, type } = qs.parse(search.replace("?", ""))
    const [showNewPatientModal, setShowNewPatientModal] = useState<boolean>(false)
    const [showPhoneNumberModal, setShowPhoneNumberModal] = useState<boolean>(false)
    const [subPatientList, setSubPatientList] = useState<SubUser[]>([])
    const [timeSlots, setTimeSlots] = useState<Array<TimeSlotPerDay>>([])
    const [showTimeSlotsView, setShowTimeSlotsView] = useState<boolean>(false)
    const [appointmentDateTime, setAppointmentDateTime] = useState<string>("")
    const [insurance, setInsurance] = useState<string>(dataForInsurance[0].id)
    const [illness, setIllness] = useState<string>(dataForIllness[0].id)
    const [isNewPatient, setIsNewPatient] = useState<boolean>(false)
    const [memo, setMemo] = useState<string>("")
    const [startDate, setStartDate] = useState<Date>(new Date())
    const {user} = useUserAuth()

    if (!npi || !date || !offset || !type) {
        return null
    }

    useEffect(() => {
        getDoctorProfileInfo()
        getSubPatientList()
    }, [])

    useEffect(() => {
        getTimeSlotsByNpi()
    }, [startDate])

    useEffect(() => {
        if (!date) {
            return
        }
        updateAppointmentDateTime(date.toString())
    }, [])

    const updateAppointmentDateTime = (dateStringUTC: string) => {
        const [week, month, day] = formatDateToWeekMonthDayTuple(new Date(dateStringUTC))

        const targetDate = new Date(date.toString())
        const initialMinutes = targetDate.getHours() * 60
        const currentOffset = initialMinutes + parseInt(offset.toString(), 10)

        const dateTime = parseTimeOffset(currentOffset >= 1440 ? currentOffset - 1440 : currentOffset)
        setAppointmentDateTime(`${week}, ${month} ${day} - ${dateTime}`)
    }

    const getDoctorProfileInfo = () => {
        npi && getDoctorProfile(parseInt(npi.toString(), 10), (doctorProfile) => {
            setDoctorInfo(doctorProfile)
            console.log(doctorProfile)
        }, () => {
            //
        })
    }

    const getTimeSlotsByNpi = () => {
        getDoctorTimeSlots(parseInt(npi.toString(), 10), startDate.toISOString(), 4, (list) => {
            setTimeSlots(list)
            console.log(list)
        }, () => {
            //
        })
    }

    const getSubPatientList = () => {
        const {id} = user
        getSubUsers(id, (list) => {
            console.log("sub user list: ", list)
            setSubPatientList(list)
        })
    }

    const $avatar = (
        <div className={"h-16 w-16 rounded-full bg-red-300 flex-none"} >
            {$iconDefaultDoctor}
        </div>
    )

    const doctorName = `${doctorInfo?.credential} ${doctorInfo?.fullName} ${doctorInfo?.jobTitle}`
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
    const dataForPatientList: Array<PatientList> = useMemo(() => {
        const subList: Array<PatientList> = subPatientList.map(({firstName, lastName}, idx) => {
            return {name: `${firstName} ${lastName}`, id: idx + 1}
        })
        return [{name: userName, id: 0 }].concat(subList)
    }, [subPatientList])
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
        setShowNewPatientModal(true)
    }

    const onAddPhoneNumber = () => {
        setShowPhoneNumberModal(true)
    }

    const $addOtherPatientButton = (
        <Button onClick={onAddPatient} status={ButtonStatus.link} >Someone else</Button>
    )

    const onAddSubUser = (subUser: SubUser) => {
        subUser.userID = user.id
        createSubUser(subUser, (isSuccess) => {
            if (isSuccess) {
                getSubPatientList()
            }
        })
    }

    const $newPatientInfoModal = (
        <NewSubPatientModal open={showNewPatientModal} onApply={(profile) => {
            profile && onAddSubUser(profile)
            setShowNewPatientModal(false)
        }} onClose={() => {
            setShowNewPatientModal(false)
        }}/>
    )

    const $addPhoneNumberModal = (
        <PhoneNumberModal open={showPhoneNumberModal} onApply={(phoneNumber) => {
            console.log(phoneNumber)
            setShowPhoneNumberModal(false)
        }} onClose={() => {
            setShowPhoneNumberModal(false)
        }}/>
    )

    const $patientInfo = (
        <div className={"w-full space-y-1"}>
            <p className={"text-base font-semibold text-primary-focus"}>Who will be seeing the doctor?</p>
            <div className={"w-full flex flex-col space-y-4 p-4 bg-white border"}>
                {$patientList()}
                <div className={"w-max"}>
                    {$addOtherPatientButton}
                </div>
            </div>
        </div>
    )

    const $addPhoneNumberButton = (
        <Button onClick={onAddPhoneNumber} status={ButtonStatus.link} >Add phone number</Button>
    )
    const $phoneNumberInfo = (
        <div className={"w-full space-y-1"}>
            <p className={"text-base font-semibold text-primary-focus"}>Phone number where the doctor can reach you</p>
            <div className={"w-full flex flex-col space-y-4 p-4 bg-white border"}>
                <div className={"w-max"}>
                    {$addPhoneNumberButton}
                </div>
            </div>
        </div>
    )

    const $dropdownForInsurance = (
        <Dropdown title={"Insurance"} placeholder={"Choose an insurance"} selected={insurance} data={dataForInsurance} onChange={(_id) => {
            setInsurance(_id)
        }}/>
    )

    const $dropdownForIllness = (
        <Dropdown title={"What's the reason for your visit?"} placeholder={"Illness"} selected={illness} data={dataForIllness} onChange={(_id) => {
            setIllness(_id)
        }}/>
    )

    const $newPatientOptionView = (
        <div className={"w-full"}>
            <p className={"text-base text-primary-focus font-semibold"}>Has the patient seen this doctor before?</p>
            <div className={"flex flex-row items-center justify-between border border-base-300 mt-1 bg-white"}>
                <div className={"px-3 py-2.5 flex flex-1 flex-row"}>
                    <FormRadio key={3} title={"I'm a new patient"} checked={isNewPatient} onChange={() => {
                        setIsNewPatient(true)
                    }}/>
                </div>
                <div className={"px-3 py-2.5 flex flex-1 flex-row border-l"}>
                    <FormRadio key={4} title={"I have seen this doctor"} checked={!isNewPatient} onChange={() => {
                        setIsNewPatient(false)
                    }}/>
                </div>
            </div>
        </div>
    )

    const onEditAppointmentTime = () => {
        setShowTimeSlotsView(true)
    }
    const $editAppointmentTimeButton = (
        <Button onClick={onEditAppointmentTime} status={ButtonStatus.link} >Edit</Button>
    )

    const onClickTimeSlot = (timeSlot: TimeSlot) => {
        console.log(timeSlot)
        setShowTimeSlotsView(false)
        const [week, month, day] = formatDateToWeekMonthDayTuple(new Date(timeSlot.date))
        const dateTime = timeSlot.dateTime
        setAppointmentDateTime(`${week}, ${month} ${day} - ${dateTime}`)
    }

    const $weekDayHeader = <WeekDayHeader startDate={startDate} onPrevious={() => {
        const previewStartDate = moment(startDate).subtract(4, "days")
            .toDate()
        console.log(previewStartDate)
        setStartDate(previewStartDate)
    }} onNext={() => {
        const nextStartDate = moment(startDate).add(4, "days")
            .toDate()
        console.log(nextStartDate)
        setStartDate(nextStartDate)
    }}/>
    const $timeslotsListView = (<Timeslots timeSlotsPerDay={timeSlots} onClick={onClickTimeSlot}/>)
    const $timeSlotsView = (
        <div className={"w-full flex flex-col p-4 gap-y-4 bg-white border"}>
            {$weekDayHeader}
            {$timeslotsListView}
        </div>
    )

    const $selectedTimeSlot = (
        <div className={"w-full flex flex-row items-center justify-between p-4 bg-white border"}>
            <p className={"text-sm text-primary-focus"}>{appointmentDateTime}</p>
            <div className={"w-max"}>
                {$editAppointmentTimeButton}
            </div>
        </div>
    )
    const $appointmentTimeInfo = (
        <div className={"w-full space-y-1"}>
            <p className={"text-base font-semibold text-primary-focus"}>Phone number where the doctor can reach you</p>
            {showTimeSlotsView ? $timeSlotsView : $selectedTimeSlot}
        </div>
    )

    const $memoForAppointment = (
        <div className={"w-full space-y-1"}>
            <div>
                <p className={"text-base font-semibold text-primary-focus"}>{"Notes for the doctor's office (optional)"}</p>
            </div>
            <div className={"w-full flex flex-row items-center justify-between bg-white border"}>
                <textarea value={memo} onChange={(e) => {
                    setMemo(e.target.value)
                }} className={"w-full resize-none h-24 border border-transparent"}/>
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
            {$newPatientInfoModal}
            {$addPhoneNumberModal}
        </div>
    )
}
