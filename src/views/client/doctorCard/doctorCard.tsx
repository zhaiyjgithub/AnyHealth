import React, {useEffect, useState} from "react";
import NavBar from "./components/navBar/navBar";
import {$iconDefaultDoctor} from "../findDoctor/assets/assets";
import SectionHeader, {ScrollSectionMenuId} from "./components/sectionHeader/sectionHeader";
import RecentRatting from "./components/ratting/recentRatting";
import InsuranceList from "./components/insurance/insuranceList";
import LocationInfo from "./components/location/locationInfo";
import EducationBackground from "./components/educationBackground/educationBackground";
import Sticky from "react-sticky-el";
import {ScrollingProvider, Section} from "react-scroll-section"
import Faq from "./components/faq/faq";
import Button from "../../../components/buttons/button";
import BookingCard from "./components/bookingCard/bookingCard";
import {useLocation} from "react-router-dom";
import qs from "qs";
import {DoctorDetailInfo, getDoctorDetailInfoByNpi} from "./service/doctorCardService";

interface IRouterLocation {
    npi: string
}

export default function DoctorCard() {
    const {search} = useLocation<IRouterLocation>()
    const { npi } = qs.parse(search.replace("?", ""))
    const [doctorInfo, setDoctorInfo] = useState<DoctorDetailInfo | null>(null)
    const [isHeaderFixed, setIsHeaderFixed] = useState<boolean>(false)

    useEffect(() => {
        if (typeof npi === "string") {
            npi && getDoctorDetailInfoByNpi(parseInt(npi), (doctorInfo) => {
                setDoctorInfo(doctorInfo)
            }, () => {
                //
            })
        }
    }, [])

    const $previewPhotosButton = (
        <button type={"button"} className={"text-lg max-w-max text-blue-600 font-medium border-blue-600 border-b border-dotted hover:border-solid"}>7 Photos</button>
    )
    const $avatar = (
        <div className={"flex flex-col items-center justify-center space-y-2 flex-none"}>
            <div className={"h-32 w-32 p-2 flex items-center justify-center flex flex-none relative"}>
                {$iconDefaultDoctor}
            </div>
            {$previewPhotosButton}
        </div>
    )

    const $appointmentTypeList = (
        <div className={"w-full flex flex-row items-center space-x-4 mt-4"}>
            <div className={"flex flex-row items-center px-2 py-1 rounded-full bg-gray-200 space-x-2"}>
                <i className="fas text-blue-500 text-xl fa-user-circle"></i>
                <span className={"text-sm text-primary-focus font-medium"}>In-person visits</span>
            </div>

            <div className={"flex flex-row items-center px-2 py-1 rounded-full bg-gray-200 space-x-2"}>
                <div className={"w-5 h-5 rounded-full bg-pink-500 flex flex-row items-center justify-center"}>
                    <i className="fas fa-video text-white text-xs"></i>
                </div>
                <span className={"text-sm text-primary-focus font-medium"}>Video visits</span>
            </div>
        </div>
    )

    const name = `${doctorInfo?.namePrefix} ${doctorInfo?.firstName} ${doctorInfo?.lastName}, ${doctorInfo?.credential}`
    const specialty = `${doctorInfo?.specialty}`
    const addressForState = `${doctorInfo?.city}, ${doctorInfo?.state}`
    const $nameAndSpecialtyAndAddress = (
        <div className={"w-full space-y-1"}>
            <p className={"font-bold text-5xl text-primary-focus"}>{name}</p>
            <p className={"text-lg font-semibold text-primary-focus"}>{specialty}</p>
            <p className={"text-lg font-semibold text-gray-400"}>{addressForState}</p>
        </div>
    )
    const $basicInfo = (
        <Section id={ScrollSectionMenuId.basicInfo}>
            <div className={"flex flex-row space-x-8"}>
                {$avatar}
                <div className={"flex flex-row items-center flex-col"}>
                    {$nameAndSpecialtyAndAddress}
                    {$appointmentTypeList}
                </div>
            </div>
        </Section>
    )

    const $star = (
        <i className="fas fa-star text-red-400"></i>
    )
    const $doctorInfoForHeader = (
        <div className={"flex flex-row items-center space-x-8"}>
            <div className={"flex flex-row items-center space-x-4"}>
                <div className={"w-12 h-12 rounded-full border"}>

                </div>
                <div>
                    <p className={"text-lg text-primary-focus font-bold"}>{name}</p>
                    <div className={"flex flex-row items-center space-x-2"}>
                        <div className={"flex flex-row"}>
                            {$star}
                            <p className={"text-sm text-red-400 font-medium"}>{"3.56"}</p>
                        </div>
                        <p className={"text-sm text-gray-400 font-medium"}>{"(121 patient ratings)"}</p>
                    </div>
                </div>
            </div>
            <Button onClick={() => {
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: "smooth",
                });
            }} >
                View availability
            </Button>
        </div>
    )

    const $sectionHeader = (
        <Section id={ScrollSectionMenuId.stickyHeader}>
            <Sticky stickyClassName={`z-50 ${isHeaderFixed ? "left-0 container" : ""}`} onFixedToggle={(fixed) => {
                setIsHeaderFixed(fixed)
            }}>
                <div className={`relative ${isHeaderFixed ? "w-screen flex flex-row justify-center bg-base-200 border-b" : ""}`}>
                    <div className={`${isHeaderFixed ? "container px-6" : "bg-white"}`}>
                        <div className={`${isHeaderFixed ? "" : "border-b border-t"}`}>
                            <SectionHeader />
                        </div>
                    </div>
                    <div className={`absolute right-8 top-2 ${isHeaderFixed ? "" : "hidden"}`}>
                        {$doctorInfoForHeader}
                    </div>
                </div>
            </Sticky>
        </Section>
    )

    const $newPatientAppointmentsTips = (
        <Section id={ScrollSectionMenuId.newPatient}>
            <div className={"flex flex-row space-x-2 py-4 border-b border-gray-100"}>
                <i className="fas fa-calendar-alt text-pink-500 mt-1"></i>
                <div className={""}>
                    <p className={"text-sm text-primary-focus font-medium"}>New patient appointments</p>
                    <p className={"text-sm text-primary-focus"}>Appointments available for new patients on ZenDoc</p>
                </div>
            </div>
        </Section>
    )

    const $recenterRattingView = (
        <Section id={ScrollSectionMenuId.rating}>
            <RecentRatting />
        </Section>
    )

    const $aboutView = (
        <Section id={ScrollSectionMenuId.about}>
            <div className={"w-full"}>
                <p className={"text-xl text-primary-focus font-bold"}>{`About ${name}`}</p>
                <div className={"block mt-2"}>
                    <span className={"text-lg text-primary-focus line-clamp-3"}>
                        {doctorInfo?.summary}
                        <span><button type={"button"} className={"cursor-pointer leading-none ml-2 text-blue-500 border-b border-blue-500 border-dotted hover:border-solid"}>Show more</button></span>
                    </span>
                </div>
            </div>
        </Section>
    )

    const $insuranceList = doctorInfo?.insurances ? (
        <Section id={ScrollSectionMenuId.insurances}>
            <InsuranceList data={doctorInfo?.insurances.split(", ")} />
        </Section>
    ) : null

    const $locationInfoView = doctorInfo ? (
        <Section id={ScrollSectionMenuId.locations}>
            <div className={"z-10"}>
                <LocationInfo specialty={specialty} doctorName={name} center={[doctorInfo.lat, doctorInfo.lng]} address={doctorInfo?.address} isVirtualVisitEnable={true} />
            </div>
        </Section>
    ) : null

    const $educationView = doctorInfo ? (
        <Section id={ScrollSectionMenuId.educations}>
            <EducationBackground doctorInfo={doctorInfo} />
        </Section>
    ) : null

    const $faqView = (
        <Section id={ScrollSectionMenuId.faq} >
            <Faq doctorName={name} />
        </Section>
    )

    return (
        <ScrollingProvider offset={-80}>
            <div className={"w-full"}>
                <NavBar />
                <div className={"flex flex-col items-center"}>
                    <div className={"container px-8 py-4 flex flex-row space-x-8"}>
                        <div className={"w-3/5 space-y-8"}>
                            {$basicInfo}
                            {$sectionHeader}
                            {$newPatientAppointmentsTips}
                            {$recenterRattingView}
                            {$aboutView}
                            {$insuranceList}
                            {$locationInfoView}
                            {$educationView}
                            {$faqView}
                        </div>
                        <div className={"w-2/5"}>
                            <BookingCard />
                        </div>
                    </div>
                </div>
            </div>
        </ScrollingProvider>
    )
}