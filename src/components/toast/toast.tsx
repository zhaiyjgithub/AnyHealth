import {Transition} from "@headlessui/react";
import React from "react";
import {InfoStatus} from "../../utils/constant/Enums";

interface Props  {
    isShow: boolean,
    status: InfoStatus,
    msg: string,
}

export const Toast: React.FC<Props> = (props) => {
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


           <div className="alert alert-info fixed top-4 right-8 flex py-2 pl-4 bg-primary">
               <div className="flex flex-row items-center">
                   <i className="fas fa-check mr-2 text-white" />
                   <label className={'text-white'}>{msg}</label>
               </div>
           </div>

    </Transition>

}