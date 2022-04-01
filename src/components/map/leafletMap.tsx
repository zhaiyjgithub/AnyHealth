import {MapContainer, Marker, Popup, TileLayer} from "@monsonjeremy/react-leaflet";
import React from "react";

export interface Pin {
    name: string,
    specialty: string,
    avatar?: string,
    address: string,
    pos: [number, number]
}

interface IProps {
    center: [number, number],
    zoom: number,
    pins: Array<Pin>
}

export default function LeafletMap({center, zoom, pins}: IProps) {
    if (!center) {
        return null
    }
    
    const $markerList = () => {
        return pins.map(({address, name, specialty, pos}, idx) => {
            return (
                <Marker key={idx} position={pos}>
                    <Popup >
                        <div className={"flex flex-row rounded space-x-2"}>
                            <img className={"h-16 w-16 flex-none rounded-full bg-red-300"}/>
                            <div className={"flex flex-col"}>
                                <span className={"text-sm font-semibold text-primary-focus"}>{name}</span>
                                <span className={"text-sm text-primary-focus"}>{specialty}</span>
                                <span className={"text-xs text-gray-400"}>{address}</span>
                            </div>
                        </div>
                    </Popup>
                </Marker>
            )
        })
    }
    return (
        <MapContainer
            center={center}
            className={"w-full h-full"}
            zoom={zoom}
            markerZoomAnimation={true}
            zoomControl={true}
            scrollWheelZoom={true}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {$markerList()}
        </MapContainer>
    )
}

LeafletMap.defaultProps = {
    position: {lat: 40.758087, lon: -73.695629},
    zoomControl: true,
    zoom: 13,
    attribution: "&copy; <a href=\"http://osm.org/copyright\">OpenStreetMap</a> contributors",

}