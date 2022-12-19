import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import DoctorInformation from "./views/zenDoc/doctorInformation/doctorInformation";
import DoctorListWrapper from "./views/zenDoc/searchDoctor/doctorListWrapper";
import CreateAccountPage from "./views/zenDoc/user/register/createAccountPage";
import UserProvider from "./views/zenDoc/user/hooks/userProvider";
import AppointmentBookingPage from "./views/zenDoc/appointment/appointmentBookingPage";
import DoctorAdmin from "./views/zenClinic/doctorAdmin";
import Setting from "./views/zenDoc/setting/setting"

export default function App() {
    return (
        <BrowserRouter>
            <UserProvider>
                <Switch>
                    <Route exact path={"/doctor/:name"} component={DoctorInformation} />
                    <Route path={"/profile-setting"} component={Setting} />
                    <Route exact path={"/search"} component={DoctorListWrapper} />
                    <Route exact path={"/create-user"} component={CreateAccountPage} />
                    <Route exact path={"/booking"} component={AppointmentBookingPage} />
                    <Route path={"/doctorAdmin"} component={DoctorAdmin} />
                </Switch>
            </UserProvider>
        </BrowserRouter>
    )
}
