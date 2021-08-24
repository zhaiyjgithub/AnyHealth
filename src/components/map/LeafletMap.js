import {MapContainer, Marker, Popup, TileLayer, useMap} from "@monsonjeremy/react-leaflet";
import ChangeView from "./ChangeView";
import React from "react";

const LeafletMap = ({position, zoomControl, zoom, attribution, address}) => {
	if (!position) {
		return null
	}
	return (
		<MapContainer
			center={position}
			className={'w-full h-full'}
			zoom={zoom}
			zoomControl={zoomControl}
			scrollWheelZoom={false}>
			<TileLayer
				attribution={attribution}
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<ChangeView center={position}/>
			<Marker position={position}>
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
	attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'

}

export default LeafletMap
