import React, {useContext, useEffect, useState} from "react";
import SideBar from "../../components/sideBar/sideBar";
import {Route, Switch} from "react-router-dom";
import {dataForSideBarRouter} from "../../router/routerTable";
import Dashboard from "./dashboard/dashboard";
import Schedule from "./schedule/schedule";
import Profile from "./profile/profile";
import Settings from "./settings/settings"
import {defaultDoctorUser, DoctorInfoContext, DoctorUser} from "./doctorInfoContext";

export default function DoctorAdmin() {
    const [user, setUser] = useState<DoctorUser>(defaultDoctorUser)
    const {doctorUser, login} = useContext(DoctorInfoContext)

    useEffect(() => {
        login("Jeffre.Glasser@zendoc.com", "e10adc3949ba59abbe56e057f20f883e", () => {
            //
            console.log("login success")
        })
    }, [])

    useEffect(() => {
        setUser(doctorUser)
    }, [doctorUser])
    const $sideBar = (
        <div className={"h-screen border-r w-60 sticky top-0"}>
            <SideBar doctorUser={user}/>
        </div>
    )
    const $contentView = (
        <div className={"flex-1"}>
            <Switch>
                <Route path={dataForSideBarRouter[0].path} component={Dashboard}/>
                <Route path={dataForSideBarRouter[1].path} component={Schedule}/>
                <Route path={dataForSideBarRouter[2].path} component={Profile}/>
                <Route path={dataForSideBarRouter[3].path} component={Settings}/>
            </Switch>
        </div>
    )
    return (
        <div className={"w-full min-h-screen bg-base-100 flex flex-row"}>
            {$sideBar}
            {$contentView}
        </div>

    )
}
