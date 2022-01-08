import React, {useState} from "react";
import SideBar from "../../components/sideBar/sideBar";
import {defaultDoctorInfo, DoctorInfoContext, IDoctorInfoContext} from "./doctorInfoContext"
import {Route, Switch} from "react-router-dom";
import {dataForSideBarRouter} from "../../router/routerTable";
import Dashboard from "./dashboard/dashboard";
import Schedule from "./schedule/schedule";
import Profile from "./profile/profile";
import Settings from "./settings/settings"
import AdminNavBar from "../../components/navBar/adminNavBar";

export default function DoctorAdmin() {
    const [doctorInfo] = useState<IDoctorInfoContext>(defaultDoctorInfo)
    return (
        <DoctorInfoContext.Provider value={doctorInfo}>
            <div className={"w-full min-h-screen bg-base-100 flex flex-row"}>
                <SideBar />
                <div className={"ml-60 flex-1"}>
                    <AdminNavBar />
                    <Switch>
                        <Route path={dataForSideBarRouter[0].path} component={Dashboard}/>
                        <Route path={dataForSideBarRouter[1].path} component={Schedule}/>
                        <Route path={dataForSideBarRouter[2].path} component={Profile}/>
                        <Route path={dataForSideBarRouter[3].path} component={Settings}/>
                    </Switch>
                </div>
            </div>
        </DoctorInfoContext.Provider>
    )
}