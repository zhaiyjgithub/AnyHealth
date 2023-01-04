import React, {useState} from "react";
import GeneralProfile from "./general/generalProfile";
import CustomProfile from "./custom/customProfile";
import Tab from "../../../components/tab/tab";

const dataForTab = ["General Profile", "My Open Website"]
export default function Profile() {
    const [tab, setTab] = useState<string>(dataForTab[0])

    const onChangeTab = (tab: string) => {
        setTab(tab)
    }

    const $tab = (
        <Tab data={dataForTab} selected={tab} onChange={onChangeTab}/>
    )

    const $general = (
        <GeneralProfile />
    )

    const $custom = (
        <CustomProfile />
    )

    const $content = tab === dataForTab[0] ? $general : $custom

    return (
        <div className={"w-full flex-1 bg-base-100"}>
            {$tab}
            {$content}
        </div>
    )
}
