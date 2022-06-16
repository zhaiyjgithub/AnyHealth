import React, {useState} from "react";
import WorkingHourSettings from "./workingHour/workingHourSettings";
import ClosedDateSettings from "./closedDate/closedDateSettings";
import Tab from "../../../components/tab/tab";

const dataForTab = ["Working Hour", "Closed Date", "Others"]

export default function Settings() {
    const [tab, setTab] = useState<string>(dataForTab[0])
    
    const onChangeTab = (tab: string) => {
        setTab(tab)
    }

    const $tab = (
        <Tab data={dataForTab} selected={tab} onChange={onChangeTab}/>
    )

    const $workingHour = (
        <WorkingHourSettings />
    )

    const $closedDate = (
        <ClosedDateSettings />
    )

    const $content = tab === "Working Hour" ? $workingHour : $closedDate

    return (
        <div className={"w-full flex-1 bg-base-100 pt-2"}>
            {$tab}
            {$content}
        </div>
    )
}