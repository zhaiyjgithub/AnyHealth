import React from "react";
import {HashRouter, Route, Switch} from "react-router-dom";
import DoctorCard from "./views/client/doctorCard/doctorCard";
import DoctorListContainer from "./views/client/findDoctor/doctorListContainer";
import CreateAccountPage from "./views/client/user/register/createAccountPage";
import UserProvider from "./views/client/user/hooks/userProvider";
import BookingPage from "./views/client/booking/bookingPage";

export default function App() {
    return (
        <HashRouter>
            <UserProvider>
                <Switch>
                    <Route exact path={"/doctor/:name"} component={DoctorCard} />
                    <Route exact path={"/search"} component={DoctorListContainer} />
                    <Route exact path={"/createuser"} component={CreateAccountPage} />
                    <Route exact path={"/booking"} component={BookingPage} />
                </Switch>
            </UserProvider>
        </HashRouter>
    )
}