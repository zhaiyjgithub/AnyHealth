import React from "react";
import {Switch} from "@headlessui/react";

interface IProps {
    checked: boolean,
    onChange: () => void
}

export default function FormSwitch(props: IProps) {
    const {checked, onChange} = props
    return (
        <Switch
            checked={checked}
            onChange={() => {
                onChange && onChange()
            }}
            className={`${
                checked ? "bg-primary" : "bg-gray-200"
            } relative inline-flex items-center h-6 rounded-full w-11 mr-4`}
        >
            <span
                className={`${
                    checked ? "translate-x-6" : "translate-x-1"
                } inline-block w-4 h-4 transform bg-white rounded-full`}
            />
        </Switch>
    )
}