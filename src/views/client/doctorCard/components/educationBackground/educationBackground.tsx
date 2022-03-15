import React from "react";
import ToolTips from "../../../../../components/toolTips/toolTips";

export default function EducationBackground() {
    const $specialtyView = (
        <div className={'space-y-2'}>
            <p className={"text-xl text-primary-focus font-bold"}>Specialty</p>
            <p className={"text-lg text-primary-focus"}>Family Physician</p>
            <p className={"text-lg text-gray-400"}>Primary Care Doctor</p>
        </div>
    )

    const $certificationsView = (
        <div className={'space-y-4'}>
            <p className={"text-xl text-primary-focus font-bold"}>Board certifications</p>
            <p className={"text-lg text-primary-focus"}>American Board of Family Medicine</p>
        </div>
    )

    const $educationTrainingView = (
        <div className={'space-y-4'}>
            <p className={"text-xl text-primary-focus font-bold"}>Education and training</p>
            <p className={"text-lg text-primary-focus"}>Medical School - Ross University School of Medicine, Doctor of Medicine</p>
            <p className={"text-lg text-primary-focus"}>Medical School - Ross University School of Medicine, Doctor of Medicine</p>
            <p className={"text-lg text-primary-focus"}>Medical School - Ross University School of Medicine, Doctor of Medicine</p>
        </div>
    )

    const $languageListView = (
        <div className={'space-y-4'}>
            <div className={'flex flex-row space-x-2'}>
                <p className={"text-xl text-primary-focus font-bold"}>Languages spoken</p>
                <ToolTips description={`Languages spoken in the provider's office`}>
                    <i className="fas fa-exclamation-circle text-primary-focus"></i>
                </ToolTips>
            </div>
            <p className={"text-lg text-primary-focus"}>English</p>
            <p className={"text-lg text-primary-focus"}>Spanish</p>
            <p className={"text-lg text-primary-focus"}>Chinese</p>
        </div>
    )

    const $providerGenderView = (
        <div className={'space-y-4'}>
            <p className={"text-xl text-primary-focus font-bold"}>Languages spoken</p>
            <p className={"text-lg text-primary-focus"}>Male</p>
        </div>
    )

    const $npiNumberView = (
        <div className={'space-y-4'}>
            <p className={"text-xl text-primary-focus font-bold"}>NPI Number</p>
            <p className={"text-lg text-primary-focus"}>1184859480</p>
        </div>
    )

    return (
        <div>
            <p className={"text-xl text-primary-focus font-bold"}>Education and background</p>
            <div className={'mt-8 space-y-8'}>
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