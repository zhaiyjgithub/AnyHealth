import React, {useEffect, useMemo, useState} from "react";
import NavBar from "./components/navBar/navBar";
import {$iconDefaultDoctor} from "../searchDoctor/assets/assets";
import {useLocation} from "react-router-dom";
import qs from "qs";
import {DoctorProfile, getDoctorProfile} from "../../zenClinic/profile/general/generalProfileService";
import {AppointmentType, TimeFormat} from "../../../utils/enum/enum";
import {formatDateToWeekMonthDayTuple} from "../../../utils/util/dateTool";
import FormRadio from "../../../components/form/formRadio";
import useUserAuth from "../user/hooks/useUserAuth";
import Button from "../../../components/buttons/button";
import {ButtonSize, ButtonStatus} from "../../../components/buttons/enum";
import Dropdown from "../doctorInformation/components/bookingCard/dropdown";
import {dataForIllness, dataForInsurance} from "../doctorInformation/components/bookingCard/dataForInsuarnce";
import NewSubPatientModal from "./components/newPatient/newSubPatientModal";
import PhoneNumberModal from "./components/addPhoneNumber/phoneNumberModal";
import {SubUser} from "./components/types";
import {addNewAppointment, createSubUser, getDoctorTimeSlots, getSubUsers} from "./bookingService";
import {TimeSlotPerDay} from "../searchDoctor/model/doctor";
import WeekDayHeader from "./components/weekDayHeader";
import Timeslots from "./components/timeSlots/timeSlots";
import {TimeSlot} from "../searchDoctor/components/doctor/timeslots/timeslots";
import moment from "moment";
import {Appointment} from "./types";

interface IRouterLocation {
    npi: string,
    date: string,
    offset: string,
    appointmentType: AppointmentType,
    insuranceID: string,
    illnessID: string,
    isNewPatient: string
}

interface PatientList {
    name: string,
    id: number,
}

export default function BookingPage() {
    const [doctorInfo, setDoctorInfo] = useState<DoctorProfile | null>(null)
    const {search} = useLocation<IRouterLocation>()
    const urlParams = qs.parse(search.replace("?", ""))
    const { npi, date, offset, appointmentType,
        illnessID, insuranceID,
    } = urlParams

    const defaultInsuranceID = insuranceID ? insuranceID : dataForInsurance[0].id
    const defaultIllnessID = illnessID ? parseInt(illnessID.toString(), 10) : dataForIllness[0].id

    const [showNewPatientModal, setShowNewPatientModal] = useState<boolean>(false)
    const [showPhoneNumberModal, setShowPhoneNumberModal] = useState<boolean>(false)
    const [subPatientList, setSubPatientList] = useState<SubUser[]>([])
    const [timeSlots, setTimeSlots] = useState<Array<TimeSlotPerDay>>([])
    const [showTimeSlotsView, setShowTimeSlotsView] = useState<boolean>(false)
    const [appointmentDateTime, setAppointmentDateTime] = useState<string>("")

    const [insurance, setInsurance] = useState<string>(defaultInsuranceID)
    const [illness, setIllness] = useState<number>(defaultIllnessID)
    const [isNewPatient, setIsNewPatient] = useState<boolean>(urlParams.isNewPatient === "true")
    const [memo, setMemo] = useState<string>("")
    const [startDate, setStartDate] = useState<Date>(new Date())
    const [phoneNumber, setPhoneNumber] = useState<string>("")
    const [selectedPatientID, setSelectedPatientID] = useState<number>(0)
    const {user} = useUserAuth()

    if (!npi || !date || !offset || !appointmentType) {
        return null
    }

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
        });
    }, [])

    useEffect(() => {
        getDoctorProfileInfo()
        getSubPatientList(false)
    }, [])

    useEffect(() => {
        const endDate = moment(startDate).add("days", 4)
        getDoctorTimeSlots(parseInt(npi.toString(), 10), startDate.toISOString(), endDate.toISOString(), (list) => {
            setTimeSlots(list)
        }, () => {
            //
        })
    }, [startDate])

    useEffect(() => {
        if (!date) {
            return
        }
        const tDate = new Date(date.toString())
        setAppointmentDateTime(moment(tDate).add(parseInt(offset.toString(), 10), "minutes")
            .format(TimeFormat.YYYYMMDDHHmm))
    }, [])

    const getDoctorProfileInfo = () => {
        npi && getDoctorProfile(parseInt(npi.toString(), 10), (doctorProfile) => {
            setDoctorInfo(doctorProfile)
            console.log(doctorProfile)
        }, () => {
            //
        })
    }

    const getSubPatientList = (isAddNewSubUser: boolean = false) => {
        const {id} = user
        getSubUsers(id, (list) => {
            if (isAddNewSubUser) {
                setSelectedPatientID(list.length)
            }
            setSubPatientList(list)
        })
    }

    const $avatar = (
        <div className={"h-16 w-16 rounded-full bg-red-300 flex-none"} >
            {$iconDefaultDoctor}
        </div>
    )

    const doctorName = `${doctorInfo?.credential} ${doctorInfo?.fullName} ${doctorInfo?.jobTitle}`
    const appointmentTypeDesc = parseInt(appointmentType.toString(), 10) === AppointmentType.virtual ? "Video visit" : doctorInfo?.address
    const sDate = moment(appointmentDateTime, TimeFormat.YYYYMMDDHHmm)
    const [week, month, day] = formatDateToWeekMonthDayTuple(sDate.toDate())
    const sDateTime = sDate.format(TimeFormat.HHmm)
    const $info = (
        <div className={"flex-1"}>
            <p className={"text-base text-primary-focus font-bold leading-snug"}>{doctorName}</p>
            <p className={"text-sm text-primary-focus font-medium leading-snug text-left"}>{`${week}, ${month} ${day} - ${sDateTime}`}</p>
            <p className={"text-sm text-primary-focus leading-snug text-left"}>{appointmentTypeDesc}</p>
        </div>
    )

    const $doctorBasicInfo = (
        <div className={"w-full bg-white flex flex-row justify-center border-b"}>
            <div className={"w-full max-w-md flex flex-row items-center text-left py-6 "}>
                <div className={"w-full flex flex-row items-center space-x-4"}>
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
    const onSelectPatient = (ID: number) => {
        setSelectedPatientID(ID)
    }
    const $patientList = () => {
        return dataForPatientList.map(({name, id}, idx) => {
            const isChecked = selectedPatientID === id
            return <FormRadio key={idx} title={name} checked={isChecked} onChange={() => {
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
                getSubPatientList(true)
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
        <PhoneNumberModal phoneNumber={phoneNumber} open={showPhoneNumberModal} onApply={(phoneNumber) => {
            setPhoneNumber(phoneNumber)
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
        <Button onClick={onAddPhoneNumber} status={ButtonStatus.link} >{phoneNumber.length ? phoneNumber : "Add phone number"}</Button>
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
        setShowTimeSlotsView(false)
        setAppointmentDateTime(`${timeSlot.date} ${timeSlot.dateTime}`)
    }

    const $weekDayHeader = <WeekDayHeader startDate={startDate} onPrevious={() => {
        const previewStartDate = moment(startDate).subtract(4, "days")
            .toDate()
        setStartDate(previewStartDate)
    }} onNext={() => {
        const nextStartDate = moment(startDate).add(4, "days")
            .toDate()
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
            <p className={"text-sm text-primary-focus"}>{`${week}, ${month} ${day} - ${sDateTime}`}</p>
            <div className={"w-max"}>
                {$editAppointmentTimeButton}
            </div>
        </div>
    )
    const $appointmentTimeInfo = (
        <div className={"w-full space-y-1"}>
            <p className={"text-base font-semibold text-primary-focus"}>Appointment Time</p>
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

    const bookAppointment = () => {
        const aptDate = moment(appointmentDateTime, TimeFormat.YYYYMMDDHHmm).toDate()
            .toISOString()
        const appointment: Appointment = {
            DoctorID: 1,
            Npi: doctorInfo!.npi,
            AppointmentType: parseInt(appointmentType.toString(), 10),
            AppointmentDate: aptDate,
            AppointmentStatus: 1,
            Offset: 0,
            Memo: memo,
            PatientID: user.id,
            LegalGuardianPatientID: 0,
            FirstName: user.firstName,
            LastName: user.lastName,
            Dob: user.birthday,
            Gender: user.gender,
            Email: user.email,
            Phone: phoneNumber,
            Insurance: parseInt(insuranceID!.toString(), 10),
            VisitReason: illnessID!.toString(),
            IsNewPatient: isNewPatient,
        }
        addNewAppointment(appointment, () => {
            alert("Book success")
        }, () => {
            alert("Book failed")
        })
    }
    const $bookButton = (
        <Button size={ButtonSize.block} onClick={bookAppointment} >Book appointment</Button>
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
