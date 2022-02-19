import React, {useContext, useEffect, useState} from "react";
import SearchBar from "./searchBar";
import LoginDropdown from "../login/loginDropdown";
import {ActionTypeForSearchFilter, SearchFilterContext} from "../../searchFilterProvider";
import {validateNumber} from "../../../../../utils/util/commonTool";

export default function Navbar() {
    const [doctorName, setDoctorName] = useState<string>("")
    const [zip, setZip] = useState<string>("")
    const [city, setCity] = useState<string>("")
    const {dispatch} = useContext(SearchFilterContext)

    const onDispatch = (type: ActionTypeForSearchFilter, value: any) => {
        dispatch({type: type, value: value})
    }
    useEffect(() => {
        onDispatch(ActionTypeForSearchFilter.keyword, doctorName)
    }, [doctorName, zip, city])

    useEffect(() => {
        onDispatch(ActionTypeForSearchFilter.zip, zip)
    }, [zip])

    useEffect(() => {
        onDispatch(ActionTypeForSearchFilter.city, city)
    }, [city])
    
    const onChangeDoctorName = (text: string) => {
        setDoctorName(text)
    }

    const onChangeDoctorLocation = (text: string) => {
        if (validateNumber(text)) {
            setZip(text)
        } else {
            setCity(text)
        }
    }

    const $brand = (
        <p className={"font-bold text-3xl text-base-content"}>
            AnyHealth
        </p>
    )

    const $searchBar = (
        <div className={"w-2/3 h-full max-w-4xl"}>
            <SearchBar doctorName={doctorName} location={zip || city} onChangeDoctorName={onChangeDoctorName} onChangeDoctorLocation={onChangeDoctorLocation} />
        </div>
    )

    const $login = (
        <LoginDropdown />
    )

    return (
        <div className={"w-full flex flex-row items-center justify-between px-8 py-4 bg-base-200 border"}>
            <div className={"flex-1 flex flex-row items-center h-12 space-x-4"}>
                {$brand}
                {$searchBar}
            </div>
            {$login}
        </div>
    )
}