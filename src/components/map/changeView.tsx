import {useMap} from "@monsonjeremy/react-leaflet";

export default function ChangeView({ center, zoom }: any) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
}
