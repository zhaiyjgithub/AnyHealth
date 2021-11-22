import PageHeader from "../../../components/navBar/PageHeader";
import GeneralProfile from "./general/GeneralProfile";
import CustomProfile from "./custom/CustomProfile";

export default function Profile() {
    return (
        <div className={'w-full h-full bg-white'}>
            <PageHeader title={'Profile'}/>
            <GeneralProfile />
        </div>
    )
}