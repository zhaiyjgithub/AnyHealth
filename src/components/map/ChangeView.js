import {useMap} from "@monsonjeremy/react-leaflet";

export default function ChangeView({ center, zoom }) {
	const map = useMap();
	map.setView(center, 13);
	return null;
}
