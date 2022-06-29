import React from "react";
import MonthDropdown from "./components/monthDropdown";
import WorkDaysList from "./components/workDaysList";

export default function Schedule() {
    const $monthDropdown = (
        <MonthDropdown onChange={(idx) => {
            console.log(idx)
        }}/>
    )

    const $brand = (
        <p className={"font-bold text-4xl md:text-4xl text-base-content font-playball"}>
            ZenDoc
        </p>
    )
    const $workdayList = (
        <WorkDaysList selectedDate={"2022-06-29"} onChangeDate={(date) => {
            console.log(date)
        }} />
    )

    const $navBar = (
        <div className={"bg-base-200 border-b sticky top-0 w-full py-4 px-8 space-y-2"}>
            <div className={"grid grid-cols-2 content-center"}>
                <div>
                    {$brand}
                </div>
                <div>
                    {$monthDropdown}
                </div>
            </div>
            {$workdayList}
        </div>
    )

    return (
        <div className={"w-full flex-1"}>
            {$navBar}
        </div>
    )
}
