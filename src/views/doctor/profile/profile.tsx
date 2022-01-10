import React, {useState} from "react";
import GeneralProfile from "./general/GeneralProfile";
import CustomProfile from "./custom/customProfile";

export default function Profile() {
    const [tab, setTab] = useState<number>(0)

    const onClickTab = (idx: number) => {
        setTab(idx)
    }
    const $tab = (
        <div className="tabs">
            <a onClick={() => {
                onClickTab(0)
            }} className={`tab tab-lg tab-lifted ${tab === 0 ? "tab-active" : ""}`}>General Profile</a>
            <a onClick={() => {
                onClickTab(1)
            }} className={`tab tab-lg tab-lifted ${tab === 1 ? "tab-active" : ""}`}>My Open Website Profile</a>
        </div>
    )

    const $general = (
        <GeneralProfile />
    )

    const $custom = (
        <CustomProfile />
    )

    const $content = tab === 0 ? $general : $custom

    return (
        <div className={"w-full flex-1 bg-base-100 pt-2"}>
            {$tab}
            {$content}
        </div>
    )
}