import React, {useState, useContext, useEffect} from "react";
import SideBar from "../sideBar/SideBar";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import Dashboard from "../../views/doctorAdmin/dashboard/Dashboard";
import Calendar from "../../views/doctorAdmin/calendar/Calendar";
import Profile from "../../views/doctorAdmin/profile/Profile";
import Settings from "../../views/doctorAdmin/settings/Settings";

export default function DoctorAdmin() {
    return (
        <div className={'w-full h-full flex flex-row'}>
            <SideBar />
            <div className={'w-full h-full'}>
                <Switch>
                    <Route path={'/doctor/dashboard'} exact
                           render={(props) => <Dashboard />}
                    />
                    <Route path={'/doctor/calendar'} exact
                           render={(props) => <Calendar />}
                    />
                    <Route path={'/doctor/profile'} exact
                           render={(props) => <Profile />}
                    />
                    <Route path={'/doctor/settings'} exact
                           render={(props) => <Settings />}
                    />
                </Switch>
            </div>
        </div>
    )
}