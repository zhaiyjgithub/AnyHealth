import {Transition} from "@headlessui/react";
import React from "react";
import {InfoStatus} from "../../utils/constant/Enums";

interface Props  {
    isShow: boolean,
    status: InfoStatus,
    msg: string,
}

export const Toast: React.FC<Props> = (props) => {
    // const statusColors = new Map()
    // statusColors.set(InfoStatus.none, "bg-gray-300")
    // statusColors.set(InfoStatus.success, "bg-green-400")
    // statusColors.set(InfoStatus.fail, "bg-red-400")
    // statusColors.set(InfoStatus.warning, "bg-yellow-400")

    const {isShow, status, msg} = props
    return <Transition
        show={isShow}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
    >
       <div className={'rounded bg-green-600 fixed top-4 right-8 flex flex-row items-center py-2 pl-4 pr-16'}>
           <i className="fas fa-check mr-2 text-white"></i>
           <p className={'text-left font-medium text-md  text-white'}>{msg}</p>
       </div>
    </Transition>

}