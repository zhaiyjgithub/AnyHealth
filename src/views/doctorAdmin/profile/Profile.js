import PageHeader from "../../../components/navBar/PageHeader";
import GeneralProfile from "./general/GeneralProfile";
import CustomProfile from "./custom/CustomProfile";

export default function Profile() {
    return (
        <div className={'flex flex-col h-full bg-white'}>
            <PageHeader title={'Profile'}/>
            <div className={'flex flex-grow'}>
                <GeneralProfile />
            </div>
        </div>
    )
}