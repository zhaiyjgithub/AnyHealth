import React from "react";
import LeafletMap from "../../../../../components/map/leafletMap";

interface IProps {
    isVirtualVisitEnable: boolean,
    doctorName: string,
    specialty: string,
    center: [number, number],
    address: string,
}

export default function LocationInfo(props: IProps) {
    const { doctorName, center, address, specialty, isVirtualVisitEnable} = props
    const $addressView = (
        <div className={"w-1/5 flex flex-col flex-none space-y-4 mt-4"}>
            <p className={"text-lg"}>{address}</p>
            <button type={"button"} className={"max-w-max border-b leading-none border-blue-500 border-dotted hover:border-solid text-lg text-blue-500 p-0"}>
                Get Directions
            </button>
        </div>
    )
    const $mapInfoView = (
        <div className={"flex flex-row space-x-4"}>
            <div className={"flex flex-1 h-80 z-10"}>
                <LeafletMap pins={[{name: doctorName, specialty: specialty, address: address, pos: center}]} zoom={20} center={center} />
            </div>
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