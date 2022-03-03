import React, {useContext} from "react";
import {DoctorInfo} from "../../../model/doctor";
import VideoVisitToolTips from "./videoVisitToolTips";
import {SearchFilterContext} from "../../../searchFilterProvider";
import {AppointmentType} from "../../../../../../utils/enum/enum";

interface IProps {
    doctorInfo: DoctorInfo
}

export default function DoctorInformation(props: IProps) {
    const {state} = useContext(SearchFilterContext)
    const { doctorInfo } = props
    const $virtualVisitIcon = doctorInfo.nextAvailableDateVirtual.length ? (
        <div className={"absolute right-2 bottom-2 h-9 w-9 p-1.5 rounded-full bg-pink-500 border-2 border-white flex flex items-center justify-center"}>
            <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" xmlnsXlink="http://www.w3.org/1999/xlink">
                <defs>
                    <style type="text/css" />
                </defs>
                <path
                    d="M960 192l-28.384 0c-16.8 0-32.928 6.624-44.928 18.432l-86.688 85.504 0-39.936c0-53.024-43.008-96-96-96l-608 0c-52.928 0-96 43.04-96 96l0 512c0 52.992 42.976 96 96 96l608 0c52.992 0 96-43.008 96-96l0-39.072 86.688 85.504c12 11.808 28.128 18.432 44.928 18.432l28.384 0c35.328 0 64-28.64 64-64l0-512.864c0-35.36-28.672-64-64-64zM96 800c-17.664 0-32-14.368-32-32l0-512c0-17.696 14.304-32 32-32l608 0c17.632 0 32 14.336 32 32l0 512c0 17.632-14.368 32-32 32l-608 0zM960 768.864l-32 0-128-128 0-0.864-32-32 0-192 160-160 32 0 0 512.864z"
                    fill="#ffffff" />
            </svg>
        </div>
    ) : null
    const $avatar = (
        <div className={"h-32 w-32 p-2 flex items-center justify-center flex flex-none relative"}>
            <svg className="w-full h-full rounded-full bg-red-300" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" width="120" height="120">
                <path
                    d="M284.778 286.294h33.722V233.94c0-31.448 25.586-57.032 57.034-57.032h9.778l-34.778-12.964c-21.248-7.92-39.804-20.706-54.624-36.78-23.83 18.368-39.92 47.134-39.92 81.446v84.836a61.294 61.294 0 0 1 28.788-7.152z"
                    fill="#FED402"/>
                <path
                    d="M349.834 165.818l29.748 11.09h268.886c31.448 0 57.034 25.584 57.034 57.032v52.356h33.722a61.308 61.308 0 0 1 28.79 7.152v-138.92C768.012 69.184 698.828 0 613.484 0H266.29a10.3 10.3 0 0 0-10.302 10.302v20.376c0 60.222 37.418 114.104 93.846 135.14z"
                    fill="#FED402"/>
                <path
                    d="M425.09 161.3c-50.376-23.556-83.092-74.314-83.092-130.622V10.302A10.3 10.3 0 0 1 352.3 0h-86.008a10.3 10.3 0 0 0-10.302 10.302v20.376c0 60.222 37.418 114.104 93.846 135.14l24.464 9.12c0.412-0.008 0.82-0.032 1.234-0.032h59.906a95.566 95.566 0 0 1-10.35-13.606z"
                    fill="#FAC600"/>
                <path
                    d="M510.918 176.908a14.918 14.918 0 0 0-5.1-0.908c-36.036 0-65.354-29.318-65.354-65.354 0-8.286-6.714-15-15-15s-15 6.714-15 15c0 25.728 10.26 49.092 26.88 66.262zM603.636 176.908a14.918 14.918 0 0 0-5.1-0.908c-36.036 0-65.354-29.318-65.354-65.354 0-8.286-6.714-15-15-15s-15 6.714-15 15c0 25.728 10.26 49.092 26.88 66.262z"
                    fill="#FFF5C6"/>
                <path
                    d="M416.572 612.938H188.116c-51.206 0-92.716 41.51-92.716 92.716v297.742c0 11.378 9.224 20.604 20.604 20.604h300.57V612.938z"
                    fill="#F3F0F3"/>
                <path
                    d="M209.238 636.994a117.036 117.036 0 0 1 5.43-24.056H188.116c-51.206 0-92.716 41.51-92.716 92.716v297.742c0 11.378 9.224 20.604 20.604 20.604h83.428c-11.38 0-20.604-9.224-20.604-20.604v-297.74c-0.002-27.22 11.728-51.7 30.41-68.662z"
                    fill="#E2DEE2"/>
                <path
                    d="M835.884 612.938H607.428V1024h300.57c11.38 0 20.604-9.224 20.604-20.604v-297.74c-0.002-51.206-41.512-92.718-92.718-92.718z"
                    fill="#F3F0F3"/>
                <path
                    d="M815.596 724.18v-73.39c0-65.076-52.944-118.02-118.02-118.02h-50.778a151.794 151.794 0 0 1-5.108 3.784l-1.346 0.95 11.314 25.268h45.918c48.534 0 88.02 39.484 88.02 88.02v73.388c-35.198 6.996-61.812 38.11-61.812 75.33v166.274c0 8.286 6.714 15 15 15h28.666c8.286 0 15-6.714 15-15s-6.714-15-15-15h-13.666v-151.274c0-25.81 21-46.81 46.812-46.81 25.81 0 46.81 21 46.81 46.81v151.274h-13.666c-8.286 0-15 6.714-15 15s6.714 15 15 15h28.666c8.286 0 15-6.714 15-15v-166.274c0-37.22-26.614-68.334-61.81-75.33zM381.758 536.162a150.4 150.4 0 0 1-4.56-3.39h-50.774c-65.076 0-118.02 52.944-118.02 118.02v157.306c4.82-1.136 9.838-1.756 15-1.756s10.18 0.62 15 1.756v-157.306c0-48.536 39.486-88.02 88.02-88.02h44.99l11.688-25.654z"
                    fill="#A79BA7"/>
                <path d="M223.404 871.706m-52.366 0a52.366 52.366 0 1 0 104.732 0 52.366 52.366 0 1 0-104.732 0Z"
                    fill="#B5ADB6"/>
                <path
                    d="M213.498 871.706c0-21.36 12.796-39.722 31.136-47.868a52.144 52.144 0 0 0-21.23-4.498c-28.92 0-52.366 23.446-52.366 52.366 0 28.922 23.446 52.366 52.366 52.366 7.56 0 14.74-1.614 21.23-4.498-18.338-8.146-31.136-26.506-31.136-47.868z"
                    fill="#A79BA7"/>
                <path
                    d="M223.404 939.072c-37.144 0-67.366-30.22-67.366-67.366s30.22-67.368 67.366-67.368 67.368 30.22 67.368 67.368c0 37.146-30.222 67.366-67.368 67.366z m0-104.732c-20.604 0-37.366 16.764-37.366 37.368s16.762 37.366 37.366 37.366 37.368-16.762 37.368-37.366-16.764-37.368-37.368-37.368z"
                    fill="#554E56"/>
                <path
                    d="M713.886 696.84l-71.904-160.57a150.238 150.238 0 0 1-36.554 18.996v221.882l106.304-72.678a6.188 6.188 0 0 0 2.154-7.63z"
                    fill="#E2DEE2"/>
                <path d="M711.308 766.792l-105.88-62.21V1020l2 4 106.436-249.454a6.182 6.182 0 0 0-2.556-7.754z"
                    fill="#FFFFFF"/>
                <path
                    d="M418.572 555.264a150.274 150.274 0 0 1-37.104-19.386L308.15 696.8a6.182 6.182 0 0 0 2.16 7.682l108.264 73.292V555.264z"
                    fill="#E2DEE2"/>
                <path d="M418.572 704.042l-107.836 62.738a6.18 6.18 0 0 0-2.56 7.806L416.572 1024l2-4z" fill="#FFFFFF"/>
                <path
                    d="M555.33 563.906h-86.66a149.45 149.45 0 0 1-52.098-9.332V1024h190.854V554.576a149.43 149.43 0 0 1-52.096 9.33z"
                    fill="#0ED290"/>
                <path d="M416.572 556.708V1024h54.22V686.984l-44.56-127.154a151.908 151.908 0 0 1-9.66-3.122z"
                    fill="#00C285"/>
                <path
                    d="M555.33 563.906h-86.66a149.66 149.66 0 0 1-43.242-6.374l76.85 219.296c3.222 9.194 16.222 9.194 19.444 0l76.848-219.296a149.634 149.634 0 0 1-43.24 6.374z"
                    fill="#F6A96C"/>
                <path
                    d="M468.816 565.908a152.28 152.28 0 0 1-42.582-6.078l76.044 216.998c3.222 9.194 16.222 9.194 19.444 0l11.902-33.962-62.012-176.958z"
                    fill="#EA9B58"/>
                <path
                    d="M318.5 413.738v-129.444h-33.722c-35.18 0-63.7 28.52-63.7 63.7v19.224c0 35.18 28.52 63.7 63.7 63.7h34.734a150.872 150.872 0 0 1-1.012-17.18z"
                    fill="#D88A55"/>
                <path
                    d="M739.222 284.294H705.5v129.444c0 5.812-0.366 11.538-1.012 17.18h34.734c35.18 0 63.7-28.52 63.7-63.7v-19.224c0-35.18-28.52-63.7-63.7-63.7z"
                    fill="#EA9B58"/>
                <path
                    d="M648.468 174.908H375.532c-32.602 0-59.032 26.43-59.032 59.032v177.35l2 2h46.884c14.132 0 27.742-5.034 38.318-14.17 27.52-23.774 66.99-37.408 108.296-37.408 41.302 0 80.776 13.634 108.294 37.406 10.578 9.138 24.188 14.172 38.32 14.172h46.884l2-2V233.94c0.004-32.602-26.426-59.032-59.028-59.032z"
                    fill="#F6A96C"/>
                <path
                    d="M364.574 411.29c5.45 0 10.844-0.756 16.032-2.19v-175.16c0-32.602 26.43-59.032 59.032-59.032h-64.106c-32.602 0-59.032 26.43-59.032 59.032v177.496c0-0.08 0.066-0.146 0.146-0.146z"
                    fill="#EA9B58"/>
                <path
                    d="M419.284 347.748a14.998 14.998 0 0 1-15-15v-44.22c0-8.286 6.714-15 15-15s15 6.714 15 15v44.22a15 15 0 0 1-15 15zM604.716 347.748a14.998 14.998 0 0 1-15-15v-44.22c0-8.286 6.714-15 15-15s15 6.714 15 15v44.22c0 8.286-6.714 15-15 15z"
                    fill="#A44F3E"/>
                <path
                    d="M510.234 361.748l15.426-34.018a15.002 15.002 0 0 0-27.322-12.392l-22.656 49.968a185.576 185.576 0 0 1 34.552-3.558z"
                    fill="#A44F3E"/>
                <path
                    d="M555.33 565.908c84.042 0 152.17-68.128 152.17-152.17v-2.448h-48.884c-13.578 0-26.738-4.808-37.014-13.686-26.912-23.25-66.032-37.894-109.602-37.894s-82.69 14.644-109.602 37.894c-10.274 8.876-23.436 13.684-37.012 13.684H316.5v2.448c0 84.042 68.128 152.17 152.17 152.17h86.66z"
                    fill="#05E39C"/>
                <path
                    d="M468.67 565.908h64.106c-84.04 0-152.17-68.128-152.17-152.17v-4.518a57.154 57.154 0 0 1-15.222 2.07H316.5v2.448c0 84.04 68.128 152.17 152.17 152.17z"
                    fill="#0ED290"/>
                <path
                    d="M563.272 450.088h-102.542c-8.286 0-15-6.714-15-15s6.714-15 15-15h102.542c8.286 0 15 6.714 15 15s-6.716 15-15 15zM584.92 504.778h-145.84c-8.286 0-15-6.714-15-15s6.714-15 15-15h145.84c8.286 0 15 6.714 15 15s-6.714 15-15 15z"
                    fill="#00C285"/>
            </svg>
            {$virtualVisitIcon}
        </div>
    )

    const $review = (
        <div className={"flex flex-row items-center space-x-1 mt-1"}>
            <i className="fas fa-star text-pink-400 w-4 h-4"/>
            <p className={"text-pink-400 text-sm font-medium leading-snug"}>4.69</p>
            <p className={"text-gray-400 text-sm font-medium leading-snug"}>(273)</p>
        </div>
    )

    const doctorName = `${doctorInfo.namePrefix} ${doctorInfo.fullName} ${doctorInfo.jobTitle}`
    const distance = `${doctorInfo.distance.toFixed(2)} km`
    const $distanceView = (<p className={"text-sm text-gray-400 font-medium text-right mr-2"}>{distance}</p>)
    const $videoVisitTag = (
        <div className={"flex flex-row items-center space-x-1"}>
            <p className={"leading-snug text-sm px-2 border border-gray-400 text-gray-500"}>External video visit</p>
            <div className={"w-5 h-5 flex items-center"}>
                <VideoVisitToolTips />
            </div>
        </div>
    )

    const isVideoVisitEnable = (doctorInfo.nextAvailableDateVirtual && doctorInfo.nextAvailableDateVirtual.length)
    const $tagView = () => {
        if (isVideoVisitEnable) {
            return $videoVisitTag
        } 
        return $distanceView
    }

    const description = () => {
        if ((state.appointmentType === AppointmentType.anyType ||
            state.appointmentType === AppointmentType.virtual
        ) && isVideoVisitEnable) {
            return "New patient appointments • Also offers video visits"
        } 
        return "New patient appointments • Also offers in-persion visits"
    }
    const $info = (
        <div className={"flex-1"}>
            <div className={"w-full flex flex-row justify-between"}>
                <p className={"text-xl text-primary-focus font-bold leading-snug"}>{doctorName}</p>
                {$tagView()}
            </div>
            <p className={"text-base text-primary-focus font-medium leading-snug text-left"}>{doctorInfo.specialty}</p>
            <p className={"text-base text-primary-focus leading-snug text-left"}>{doctorInfo.address}</p>
            {$review}
            <p className={"text-base text-gray-400 text-left mt-2"}>{description()}</p>
        </div>
    )
    return (
        <div className={"flex-1 flex flex-row space-x-8 pl-4"}>
            {$avatar}
            {$info}
        </div>
    )
}