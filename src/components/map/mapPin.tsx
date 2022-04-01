import {useMap} from "@monsonjeremy/react-leaflet";

export default function MapPin({ center, zoom }: any) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
}
