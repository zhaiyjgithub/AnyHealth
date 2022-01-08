import React, {useState} from "react";
import WorkingHourSettings from "./workingHourSettings";

export default function Settings() {
    const [tab, setTab] = useState<number>(0)
    
    const onClickTab = (idx: number) => {
        setTab(idx)
    }
    const $tab = (
        <div className="tabs">
            <a onClick={() => {
                onClickTab(0)
            }} className={`tab tab-lg tab-lifted ${tab === 0 ? "tab-active" : ""}`}>Working Hour</a>
            <a onClick={() => {
                onClickTab(1)
            }} className={`tab tab-lg tab-lifted ${tab === 1 ? "tab-active" : ""}`}>Closed Date</a>
            <a onClick={() => {
                onClickTab(2)
            }} className={`tab tab-lg tab-lifted ${tab === 2 ? "tab-active" : ""}`}>Others</a>
        </div>
    )

    const $workingHour = (
        <WorkingHourSettings />
    )

    return (
        <div className={"w-full flex-1 bg-base-100 pt-2"}>
            {$tab}
            {$workingHour}
        </div>
    )
}