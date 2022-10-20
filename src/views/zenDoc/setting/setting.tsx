import React from "react";
import NavBar from "./components/navbar/navbar";
import SideBar from "./components/sidebar/sideBar";

export default function Setting() {
    const $navbar = (
        <NavBar />
    )
    return (
        <div className={'w-full h-full bg-white'}>
            {$navbar}
            <div className={'w-full h-full p-14'}>
                <SideBar />
            </div>
        </div>
    )
}
