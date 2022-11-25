import React, {useState} from "react";
import NavBar from "./components/navbar/navbar";
import SideBar from "./components/sidebar/sideBar";
import {Route, Switch} from "react-router-dom";
import {InsuranceInfo, SettingRoute} from "./types";
import MyProfile from "./myProfile";
import MyInsurance from "./myInsurance";
import MyAppointment from "./myAppointment";

export default function Setting() {
    const [insuranceInfo] = useState<InsuranceInfo>({Dental: {
        ID: 0,
        InsuranceID: "",
        MemberID: "",
        ImageUrls: [],
    }, Medical: {
        ID: 1,
        InsuranceID: "",
        MemberID: "",
        ImageUrls: [],
    }, Vision: {
        ID: 2,
        InsuranceID: "",
        MemberID: "",
        ImageUrls: [],
    }})
    const $navbar = (
        <NavBar />
    )

    const onUpdateInsurance = () => {
        //
    }

    const $pageView = (
        <div className={"flex-1 px-20"}>
            <Switch>
                <Route path={SettingRoute[0].path} exact component={MyProfile}/>
                <Route path={SettingRoute[1].path} exact component={MyAppointment}/>
                <Route path={SettingRoute[2].path} exact component={() => {
                    return <MyInsurance insuranceInfo={insuranceInfo} onSave={onUpdateInsurance} />
                }}/>
                <Route path={SettingRoute[3].path} exact component={MyProfile}/>
            </Switch>
        </div>
    )

    return (
        <div className={"w-full h-full bg-white"}>
            {$navbar}
            <div className={"w-full h-full p-14 flex flex-row"}>
                <SideBar />
                {$pageView}
            </div>
        </div>
    )
}
