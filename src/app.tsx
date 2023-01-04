import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import DoctorInformation from "./views/patient/doctorInformation/doctorInformation";
import DoctorListWrapper from "./views/patient/searchDoctor/doctorListWrapper";
import CreateAccountPage from "./views/patient/user/register/createAccountPage";
import UserProvider from "./views/patient/user/hooks/userProvider";
import AppointmentBookingPage from "./views/patient/appointment/appointmentBookingPage";
import DoctorAdmin from "./views/clinic/doctorAdmin";
import Setting from "./views/patient/setting/setting"
import DoctorUserProvider from "./views/clinic/doctorInfoContext";

export default function App() {
    return (
        <BrowserRouter>
            <UserProvider>
                <DoctorUserProvider>
                    <Switch>
                        <Route exact path={"/doctor/:name"} component={DoctorInformation} />
                        <Route path={"/profile-setting"} component={Setting} />
                        <Route exact path={"/search"} component={DoctorListWrapper} />
                        <Route exact path={"/create-user"} component={CreateAccountPage} />
                        <Route exact path={"/booking"} component={AppointmentBookingPage} />
                        <Route path={"/doctorAdmin"} component={DoctorAdmin} />
                    </Switch>
                </DoctorUserProvider>
            </UserProvider>
        </BrowserRouter>
    )
}
