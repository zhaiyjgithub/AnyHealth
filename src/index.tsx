import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./views/zenDoc/findDoctor/components/filter/calendarCustom.css";
import "leaflet/dist/leaflet.css";
import reportWebVitals from "./reportWebVitals";
import L from "leaflet";
import icon from "./assets/map/marker-icon.png";
import iconShadow from "./assets/map/marker-shadow.png";
import App from "./app";

let DefaultIcon = L.icon({
    iconUrl: icon,
    // iconRetinaUrl: iconRetina,
    shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

ReactDOM.render(
    <App />,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
