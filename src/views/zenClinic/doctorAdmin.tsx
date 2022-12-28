import React from "react";
import SideBar from "../../components/sideBar/sideBar";
import {Route, Switch} from "react-router-dom";
import {dataForSideBarRouter} from "../../router/routerTable";
import Dashboard from "./dashboard/dashboard";
import Schedule from "./schedule/schedule";
import Profile from "./profile/profile";
import Settings from "./settings/settings"

export default function DoctorAdmin() {
    const $sideBar = (
        <div className={"h-screen border-r w-60 sticky top-0"}>
            <SideBar />
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
