import React from "react";
import {HashRouter, Route, Switch} from "react-router-dom";
import DoctorCard from "./views/zenDoc/doctorCard/doctorCard";
import DoctorListContainer from "./views/zenDoc/findDoctor/doctorListContainer";
import CreateAccountPage from "./views/zenDoc/user/register/createAccountPage";
import UserProvider from "./views/zenDoc/user/hooks/userProvider";
import BookingPage from "./views/zenDoc/booking/bookingPage";
import DoctorAdmin from "./views/zenClinic/doctorAdmin";

export default function App() {
    return (
        <HashRouter>
            <UserProvider>
                <Switch>
                    <Route exact path={"/doctor/:name"} component={DoctorCard} />
                    <Route exact path={"/search"} component={DoctorListContainer} />
                    <Route exact path={"/createuser"} component={CreateAccountPage} />
                    <Route exact path={"/booking"} component={BookingPage} />
                    <Route path={"/doctorAdmin"} component={DoctorAdmin} />
                </Switch>
            </UserProvider>
        </HashRouter>
    )
}
