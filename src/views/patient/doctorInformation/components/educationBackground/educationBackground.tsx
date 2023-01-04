import React from "react";
import ToolTips from "../../../../../components/toolTips/toolTips";
import {DoctorDetailInfo} from "../../service/doctorCardService";

interface IProps {
    doctorInfo: DoctorDetailInfo
}

export default function EducationBackground(props: IProps) {
    const {doctorInfo} = props
    const $specialtyView = (
        <div className={"space-y-2"}>
            <p className={"text-xl text-primary-focus font-bold"}>Specialty</p>
            <p className={"text-lg text-primary-focus"}>{doctorInfo.specialty}</p>
            <p className={"text-lg text-gray-500"}>{doctorInfo.subSpecialty}</p>
        </div>
    )

    const $certificationsView = doctorInfo.certifications.length ? (
        <div className={"space-y-4"}>
            <p className={"text-xl text-primary-focus font-bold"}>Board certifications</p>
            {doctorInfo.certifications.map(({name, desc}, idx) => {
                return (
                    <p key={idx} className={"text-lg text-primary-focus"}>{`${name} - ${desc}`}</p>
                )
            })}
        </div>
    ) : null

    const $educationTrainingView = doctorInfo.educations.length ? (
        <div className={"space-y-4"}>
            <p className={"text-xl text-primary-focus font-bold"}>Education and training</p>
            {doctorInfo.educations.map(({name, desc}, idx) => {
                return (
                    <p key={idx} className={"text-lg text-primary-focus"}>{`${name} - ${desc}`}</p>
                )
            })}
        </div>
    ) : null

    const languages = doctorInfo.language.replace("English", "").split(",")
    const $languageListView = (
        <div className={"space-y-4"}>
            <div className={"flex flex-row space-x-2"}>
                <p className={"text-xl text-primary-focus font-bold"}>Languages spoken</p>
                <ToolTips description={"Languages spoken in the provider's office"}>
                    <i className="fas fa-exclamation-circle text-primary-focus"></i>
                </ToolTips>
            </div>
            <p className={"text-lg text-primary-focus"}>English</p>
            {languages.map((lang, idx) => {
                return (
                    <p key={idx} className={"text-lg text-primary-focus"}>{lang}</p>
                )
            })}
        </div>
    )

    const gender = doctorInfo.gender === "F" ? "Female" : "Male"
    const $providerGenderView = (
        <div className={"space-y-4"}>
            <p className={"text-xl text-primary-focus font-bold"}>Provider gender</p>
            <p className={"text-lg text-primary-focus"}>{gender}</p>
        </div>
    )

    const $npiNumberView = (
        <div className={"space-y-4"}>
            <p className={"text-xl text-primary-focus font-bold"}>NPI Number</p>
            <p className={"text-lg text-primary-focus"}>{doctorInfo.npi}</p>
        </div>
    )

    return (
        <div>
            <p className={"text-xl text-primary-focus font-bold"}>Education and background</p>
            <div className={"mt-8 space-y-8"}>
                {$specialtyView}
                {$certificationsView}
                {$educationTrainingView}
                {$languageListView}
                {$providerGenderView}
                {$npiNumberView}
            </div>
        </div>
    )
}
