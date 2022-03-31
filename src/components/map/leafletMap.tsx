import {MapContainer, Marker, Popup, TileLayer} from "@monsonjeremy/react-leaflet";
import ChangeView from "./changeView";
import React from "react";

interface IProps {
    center: [number, number],
    zoom: number,
    address: string
}

const LeafletMap = ({center, zoom, address}: IProps) => {
    if (!center) {
        return null
    }
    return (
        <MapContainer
            center={center}
            className={"w-full h-full"}
            zoom={zoom}
            scrollWheelZoom={false}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <ChangeView center={center}/>
            <Marker position={center}>
                <Popup>
                    {address}
                </Popup>
            </Marker>
        </MapContainer>
    )
}

LeafletMap.defaultProps = {
    position: {lat: 0, lon: 0},
    zoomControl: true,
    zoom: 13,
    attribution: "&copy; <a href=\"http://osm.org/copyright\">OpenStreetMap</a> contributors",

}

export default LeafletMap
