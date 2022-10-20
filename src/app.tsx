import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import DoctorInformation from "./views/zenDoc/doctorInformation/doctorInformation";
import DoctorListWrapper from "./views/zenDoc/searchDoctor/doctorListWrapper";
import CreateAccountPage from "./views/zenDoc/user/register/createAccountPage";
import UserProvider from "./views/zenDoc/user/hooks/userProvider";
import BookingPage from "./views/zenDoc/booking/bookingPage";
import DoctorAdmin from "./views/zenClinic/doctorAdmin";
import Setting from "./views/zenDoc/setting/setting"

export default function App() {
    return (
        <BrowserRouter>
            <UserProvider>
                <Switch>
                    <Route exact path={"/doctor/:name"} component={DoctorInformation} />
                    <Route exact path={"/profile-setting"} component={Setting} />
                    <Route exact path={"/search"} component={DoctorListWrapper} />
                    <Route exact path={"/createuser"} component={CreateAccountPage} />
                    <Route exact path={"/booking"} component={BookingPage} />
                    <Route path={"/doctorAdmin"} component={DoctorAdmin} />
                </Switch>
            </UserProvider>
        </BrowserRouter>
    )
}
