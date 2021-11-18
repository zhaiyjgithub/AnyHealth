import PageHeader from "../../../components/navBar/PageHeader";
import ScheduleSettings from "./schedule/ScheduleSettings";
import {useState} from "react";
import ClosedDateSettings from "./closedDate/ClosedDateSettings";
import MenuHeader from "../../../components/navBar/MenuHeader";

const MenuType = {
    workingHour: 0,
    closedDate: 1
}

export default function Settings() {
    const [menu, setMenu] = useState(MenuType.workingHour)
    return (
        <div className={'w-full h-full bg-white'}>
            <PageHeader title={'settings'}/>
            <MenuHeader 
                dataSource={[{type: MenuType.workingHour, title: 'Working Hours'}, {type: MenuType.closedDate, title: 'Closed Date'}]}
                selectedType={menu}
                onClick={(newPage) => {
                    setMenu(newPage)
                }}
            />
            {menu === MenuType.workingHour ? <ScheduleSettings /> : <ClosedDateSettings />}
        </div>
    )
}