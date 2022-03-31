import React from "react";

interface IProps {
    isVirtualVisitEnable: boolean,
    doctorName: string,
    lat: number | undefined,
    lng: number | undefined,
    address: string | undefined,
}

export default function LocationInfo(props: IProps) {
    const { doctorName, lat, lng, address, isVirtualVisitEnable} = props
    console.log(lat, lng)
    const $addressView = (
        <div className={"w-1/5 flex flex-col flex-none space-y-4 mt-4"}>
            <p className={"text-lg"}>{address}</p>
            <button type={"button"} className={"max-w-max border-b leading-none border-blue-500 text-lg text-blue-500 p-0"}>
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

    const $videoVisitTipsView = isVirtualVisitEnable ? (
        <div className={"px-4 flex flex-row items-center space-x-4 py-2 bg-purple-200"}>
            <div className={"w-8 h-8 rounded-full bg-purple-500 flex flex-row items-center justify-center"}>
                <i className="fas fa-video text-white text-sm"></i>
            </div>
            <p className={"text-lg text-primary-focus"}>{`${doctorName} also offers online video visits for patients`}</p>
        </div>
    ) : null
    return (
        <div className={"w-full space-y-4"}>
            <p className={"text-xl text-primary-focus font-bold"}>Office Locations</p>
            {$videoVisitTipsView}
            {$mapInfoView}
        </div>
    )
}