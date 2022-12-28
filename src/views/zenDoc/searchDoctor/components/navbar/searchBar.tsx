import React, {useContext, useState} from "react";
import {ActionTypeForSearchFilter, SearchFilterContext} from "../../searchFilterProvider";
import {validateNumber} from "../../../../../utils/util/commonTool";

export default function SearchBar() {
    const [doctorName, setDoctorName] = useState<string>("")
    const [zip, setZip] = useState<string>("")
    const [city, setCity] = useState<string>("")
    const {dispatch} = useContext(SearchFilterContext)

    const onDispatch = (type: ActionTypeForSearchFilter, value: any) => {
        dispatch({type: type, value: value})
    }

    return (
        <div className={"w-full h-full flex flex-row items-center"}>
            <div className={"flex-1 h-full min-m-min flex flex-row items-center border-l border-t border-b border-base-300 bg-white"}>
                <input value={doctorName} placeholder={"Doctor name..."} onChange={(e) => {
                    setDoctorName(e.target.value)
                }} className={"w-full h-full min-m-min block px-3 py-1.5 text-sm font-medium text-base-content bg-white transition ease-in-out focus:outline-none focus:ring-0 focus:ring-transparent active:ring-0"}/>

                <div className={"w-px h-2/3 bg-base-300 flex-none"}/>

                <input value={zip || city} placeholder={"Zip code or City"} onChange={(e) => {
                    const text = e.target.value
                    if (validateNumber(text)) {
                        setZip(text)
                        setCity("")
                    } else {
                        setCity(text)
                        setZip("")
                    }
                }} className={"w-full h-full block px-3 py-1.5 text-sm font-medium text-base-content bg-white transition ease-in-out focus:outline-none focus:ring-0 focus:ring-transparent active:ring-0"}/>
            </div>

            <button type={"button"} onClick={() => {
                const value = {
                    keyword: doctorName,
                    zip: zip,
                    city: city,
                }
                onDispatch(ActionTypeForSearchFilter.keyword, value)
            }} className={"h-full px-3 inline-flex items-center justify-center bg-primary border border-transparent hover:bg-primary-focus hover:text-white active:bg-primary-focus active:text-white"}>
                <i className="fas fa-search"/>
            </button>
        </div>
    )
}
