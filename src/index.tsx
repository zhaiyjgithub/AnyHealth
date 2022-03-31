import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../src/views/client/findDoctor/components/filter/calendarCustom.css";
import "leaflet/dist/leaflet.css";
import reportWebVitals from "./reportWebVitals";
import {HashRouter, Route, Switch} from "react-router-dom";
// import L from "leaflet";
// import DoctorAdmin from "./views/doctor/doctorAdmin";
import DoctorCard from "./views/client/doctorCard/doctorCard";
import DoctorListContainer from "./views/client/findDoctor/doctorListContainer";
// import icon from './logo.svg'

// let DefaultIcon = L.icon({
//     iconUrl: "",
//     iconRetinaUrl: icon,
//     shadowUrl: "",
// });
//
// L.Marker.prototype.options.icon = DefaultIcon;

ReactDOM.render(
    <HashRouter>
        <Switch>
            <Route exact path={"/doctor/:name"} component={DoctorCard} />
            <Route exact path={"/search"} component={DoctorListContainer} />
        </Switch>
    </HashRouter>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
