import React, {useContext, useEffect, useState} from "react";
import Navbar from "./components/navbar/navbar";
import {AppointmentType} from "../../../utils/enum/enum";
import Filter from "./components/filter/filter";
import Sticky from "react-sticky-el";
import WeekDayHeader from "./components/weekDayHeader/weekDayHeader";
import DoctorItem from "./components/doctor/doctorItem";
import {ActionTypeForSearchFilter, SearchFilterContext} from "./searchFilterProvider";
import {findDoctor} from "./service/searchDoctorService";
import {DoctorInfo} from "./model/doctor";
import PageFooter from "./components/pageFooter/pageFooter";
import AllAvailableTimeSlots from "./components/allAvailableTimeSlots";
import {list} from "postcss";

export default function SearchDoctor() {
    const [apptType, setApptType] = useState<AppointmentType>(AppointmentType.anyType)
    const {state, dispatch} = useContext(SearchFilterContext)
    const [data, setData] = useState<Array<DoctorInfo>>([])
    const [total, setTotal] = useState<number>(0)
    const [viewAllIdx, setViewAllIdx] = useState<number>(-1)

    useEffect(() => {
        findDoctor(state, (total, data) => {
            setTotal(total)
            setData(data)
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth",
            });
        }, () => {
            //
        })
    }, [state])

    const onChangeApptType = (type: AppointmentType) => {
        setApptType(type)
    }

    const onDispatchApptType = (apptType: AppointmentType) => {
        dispatch({type: ActionTypeForSearchFilter.apptType, value: apptType})
    }
    const $apptTab = (
        <div className={"flex fle-row items-center space-x-6 mt-6 px-6"}>
            <button onClick={() => {
                onChangeApptType(AppointmentType.anyType)
                onDispatchApptType(AppointmentType.anyType)
            }} type={"button"} className={`inline-block py-2 text-primary-focus hover:text-gray-400 text-base font-medium border-b-2 ${apptType === AppointmentType.anyType ? "border-primary-focus" : "border-transparent"}`}>
                All appointments
            </button>
            <button onClick={() => {
                onChangeApptType(AppointmentType.inClinic)
                onDispatchApptType(AppointmentType.inClinic)
            }} type={"button"} className={`inline-block py-2 text-primary-focus hover:text-gray-400 text-base font-medium border-b-2 ${apptType === AppointmentType.inClinic ? "border-primary-focus" : "border-transparent"}`}>
                In-person
            </button>
            <div className={"flex flex-row items-center space-x-2"}>
                <button onClick={() => {
                    onChangeApptType(AppointmentType.virtual)
                    onDispatchApptType(AppointmentType.virtual)
                }} type={"button"} className={`inline-flex flex-row items-center space-x-2 py-2 text-primary-focus hover:text-gray-400 text-base font-medium border-b-2 ${apptType === AppointmentType.virtual ? "border-primary-focus" : "border-transparent"}`}>
                    <p>Video visit</p>
                </button>
                <p className={"text-sm text-white px-1 bg-pink-500 italic uppercase rounded"}>New</p>
            </div>
        </div>
    )

    const $navBar = (<Navbar />)
    const $filter = (<div className={"mt-4 px-6 z-30"}><Filter /></div>)

    const $stickHeader = (
        <Sticky className={"mt-4 z-20"}>
            <WeekDayHeader startDate={state.startDate} total={total} />
        </Sticky>
    )

    const $pageFooter = (
        <div className={"my-8 mx-8"}>
            <PageFooter currentPage={state.page} total={total} pageSize={state.pageSize} />
        </div>
    )

    const $resultList = (
        <div className={"w-full flex flex-col flex-1 z-10"}>
            {data.map((doctor, idx) => {
                return <DoctorItem doctorInfo={doctor} key={idx} onViewAllAvailability={() => {
                    setViewAllIdx(idx)
                }}/>
            })}
            {$pageFooter}
        </div>
    )

    const onCloseViewAllAvailableTimeSlotsModal = () => {
        setViewAllIdx(-1)
    }
    const $allTimeSlotsModal = viewAllIdx !== -1 && data.length ? (
        <AllAvailableTimeSlots show={viewAllIdx !== -1} doctorInfo={data[viewAllIdx]} onClose={onCloseViewAllAvailableTimeSlotsModal} />
    ) : null
    const $content = (
        <div className={"w-full xl:w-2/3 border-r flex flex-col flex-1"}>
            {$apptTab}
            {$filter}
            {$stickHeader}
            {$resultList}
            {$allTimeSlotsModal}
        </div>
    )

    return (
        <div className={"flex flex-col w-full min-h-screen"}>
            {$navBar}
            {$content}
        </div>
    )
}