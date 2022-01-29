import React from "react";

interface IProps {
    doctorName: string,
    location: string,
    onChangeDoctorName: (value: string) => void,
    onChangeDoctorLocation: (value: string) => void,
}

export default function SearchBar(props: IProps) {
    const {doctorName, location, onChangeDoctorLocation, onChangeDoctorName} = props
    return (
        <div className={"w-full h-full flex flex-row items-center"}>
            <div className={"flex-1 h-full min-m-min flex flex-row items-center border-l border-t border-b border-base-300 bg-white"}>
                <input value={doctorName} placeholder={"doctor name..."} onChange={(e) => {
                    onChangeDoctorName && onChangeDoctorName(e.target.value)
                }} className={"w-full h-full min-m-min block px-3 py-1.5 text-sm font-medium text-base-content bg-white transition ease-in-out focus:outline-none focus:ring-0 focus:ring-transparent active:ring-0"}/>

                <div className={"w-px h-2/3 bg-base-300 flex-none"}/>

                <input value={location} placeholder={"zip code or city"} onChange={(e) => {
                    onChangeDoctorName && onChangeDoctorName(e.target.value)
                }} className={"w-full h-full block px-3 py-1.5 text-sm font-medium text-base-content bg-white transition ease-in-out focus:outline-none focus:ring-0 focus:ring-transparent active:ring-0"}/>
            </div>

            <button type={"button"} onClick={() => {
                onChangeDoctorLocation && onChangeDoctorLocation(location)
            }} className={"h-full px-3 inline-flex items-center justify-center bg-primary border border-transparent hover:bg-primary-focus hover:text-white active:bg-primary-focus active:text-white"}>
                <i className="fas fa-search"></i>
            </button>
        </div>
    )
}