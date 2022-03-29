import React from "react";

export default function LocationInfo() {
    const $addressView = (
        <div className={"w-1/5 flex flex-col flex-none space-y-4 mt-4"}>
            <p className={"text-lg font-semibold"}>Clinic Name</p>
            <p className={"text-lg"}>1488 Cedarwood Ln Pleasanton, CA 94566</p>
            <button type={"button"} className={"max-w-max border-b border-blue-500 text-lg text-blue-500 p-0"}>
                Get Directions
            </button>
        </div>
    )
    const $mapInfoView = (
        <div className={"flex flex-row space-x-4"}>
            <div className={"flex flex-1 h-80 bg-red-200"}/>
            {$addressView}
        </div>
    )

    const $videoVisitTipsView = (
        <div className={"px-4 flex flex-row items-center space-x-4 py-2 bg-purple-200"}>
            <div className={"w-8 h-8 rounded-full bg-purple-500 flex flex-row items-center justify-center"}>
                <i className="fas fa-video text-white text-sm"></i>
            </div>
            <p className={"text-lg text-primary-focus"}>Dr. Binh Dang, MD also offers online video visits for patients</p>
        </div>
    )
    return (
        <div className={"w-full space-y-4"}>
            <p className={"text-xl text-primary-focus font-bold"}>Office Locations</p>
            {$videoVisitTipsView}
            {$mapInfoView}
        </div>
    )
}