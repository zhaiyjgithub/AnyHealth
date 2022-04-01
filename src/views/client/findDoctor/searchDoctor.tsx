import React, {useContext, useEffect, useMemo, useState} from "react";
import Navbar from "./components/navbar/navbar";
import {AppointmentType} from "../../../utils/enum/enum";
import Filter from "./components/filter/filter";
import WeekDayHeader from "./components/weekDayHeader/weekDayHeader";
import DoctorItem from "./components/doctor/doctorItem";
import {ActionTypeForSearchFilter, SearchFilterContext} from "./searchFilterProvider";
import {findDoctor, getTimeSlots} from "./service/searchDoctorService";
import {DoctorInfo, TimeSlotPerDay} from "./model/doctor";
import PageFooter from "./components/pageFooter/pageFooter";
import AllAvailableTimeSlots from "./components/allAvailableTimeSlots/allAvailableTimeSlots";
import LeafletMap, {Pin} from "../../../components/map/leafletMap";

export default function SearchDoctor() {
    const [apptType, setApptType] = useState<AppointmentType>(AppointmentType.anyType)
    const {state, dispatch} = useContext(SearchFilterContext)
    const [data, setData] = useState<Array<DoctorInfo>>([])
    const [total, setTotal] = useState<number>(0)
    const [viewAllIdx, setViewAllIdx] = useState<number>(-1)
    const [dataForAllAvailable, setDataForAllAvailable] = useState<Array<TimeSlotPerDay>>([])
    const [offsetY, setOffsetY] = useState<number>(0)
    console.log(offsetY)
    
    const getScrollTop = () => {
        let scrollTop = 0;
        if ( document?.documentElement && document?.documentElement?.scrollTop) {
            scrollTop = document?.documentElement.scrollTop;
        } else if (document?.body) {
            scrollTop = document?.body.scrollTop;
        }
        return scrollTop;
    }

    const handleScroll = () => {
        setOffsetY(getScrollTop)
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll)
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])
    
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

    const getAllTimeSlots = (npi: number, startDate: string) => {
        getTimeSlots(npi, startDate, 5, (list) => {
            setDataForAllAvailable(list)
        }, () => {
            //
        })
    }

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

    const $weekDayStickyHeader = (
        <div className={"mt-4 sticky top-0 bg-white z-20"}>
            <WeekDayHeader startDate={state.startDate} total={total} />
        </div>
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
                    setDataForAllAvailable(data[idx].timeSlotsPerDay)
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
        <AllAvailableTimeSlots timeSlotsPerDay={dataForAllAvailable} show={viewAllIdx !== -1} doctorInfo={data[viewAllIdx]} onClose={onCloseViewAllAvailableTimeSlotsModal} onRequestTimeSlots={(date) => {
            const doctorInfo = data[viewAllIdx]
            getAllTimeSlots(doctorInfo.npi, date)
        }} />
    ) : null

    const pins = useMemo(() => {
        return data.map((doctorInfo) => {
            const name = `${doctorInfo.namePrefix} ${doctorInfo.firstName} ${doctorInfo.lastName}, ${doctorInfo.jobTitle}`
            const specialty = doctorInfo.specialty
            const address = doctorInfo.address
            return {name: name, specialty: specialty, address: address, pos: [doctorInfo.location.lat, doctorInfo.location.lon]} as Pin
        })
    }, [data])

    const $mapViewStickyHeader = (
        <div className={"h-screen w-full sticky top-0"}>
            <LeafletMap pins={pins} zoom={15} center={[40.748159, -73.978423]} />
        </div>
    )

    const $content = (
        <div className={"w-full flex flex-row"}>
            <div className={"w-full xl:w-2/3 md:border-l md:border-r flex flex-col flex-1"}>
                {$apptTab}
                {$filter}
                {$weekDayStickyHeader}
                {$resultList}
                {$allTimeSlotsModal}
            </div>
            <div className={"flex w-0 xl:w-1/3"}>
                {$mapViewStickyHeader}
            </div>
        </div>
    )

    const $footer = (
        <div className={"w-full h-48 bg-red-300"}/>
    )
    return (
        <div className={"flex flex-col w-full min-h-screen"}>
            {$navBar}
            {$content}
            {$footer}
        </div>
    )
}