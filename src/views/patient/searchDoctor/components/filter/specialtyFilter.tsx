import React, {useState} from "react";
import Button from "../../../../../components/buttons/button";
import {ButtonStatus, Variant} from "../../../../../components/buttons/enum";
import {SpecialtyList} from "../../../../../utils/enum/specialtyList";

interface IProps {
    selectedSpecialty: string,
    onSave: (specialty: string) => void,
}

export default function SpecialtyFilter(props: IProps) {
    const {onSave} = props
    const [show, setShow] = useState<boolean>(false)
    const [selectedSpecialty, setSelectedSpecialty] = useState<string>(props.selectedSpecialty)

    const isSelected = (targetSpecialty: string) => {
        return selectedSpecialty === targetSpecialty
    }

    const $toggleButton = (
        <button onClick={(e) => {
            e.stopPropagation()
            setShow(!show)
        }} type={"button"}
        className={`z-10 relative px-4 py-2 font-semibold rounded-full flex flex-row items-center border text-sm leading-tight hover:bg-base-250 hover:border-primary-focus ${show || selectedSpecialty.length ? "border-primary-focus bg-base-250 base-content text-primary-focus" : "text-gray-400 border-base-300 bg-white"}`}>
            Specialty
        </button>
    )

    const $bg = show ? (
        <div onClick={() => {
            setShow(false)
            // Cancel to apply
            setSelectedSpecialty(props.selectedSpecialty)
        }} className={"fixed inset-0 h-full w-full z-20"}/>
    ) : null

    const onSelect = (specialty: string) => {
        setSelectedSpecialty(specialty)
    }

    const onClear = () => {
        setSelectedSpecialty("")
    }

    const $footer = (
        <div className={"w-full flex flex-row items-center justify-end border-t px-4 py-2"}>
            <Button variant={Variant.float} onClick={() => {
                onClear()
                setSelectedSpecialty("")
            }}>Clear</Button>
            <Button status={ButtonStatus.primary} onClick={() => {
                setShow(false)
                onSave && onSave(selectedSpecialty)
            }}>Apply</Button>
        </div>
    )

    const $list = show ? (
        <div
            className="absolute left-0 border border-base-300 mt-1 w-56 bg-white shadow-2xl z-20 transition duration-150 ease-in-out">
            <div className={"w-full overflow-y-scroll max-h-96 py-4"}>
                <p className={"text-lg font-bold text-primary-focus px-4 leading-none"}>All specialties for illness
                    (a-z)</p>
                <ul className={"w-full mt-2"}>
                    {SpecialtyList.map((specialty, idx) => {
                        return <li onClick={(e) => {
                            e.stopPropagation()
                            onSelect(specialty)
                        }} className={"px-4 w-full hover:bg-base-250 cursor-pointer"} key={idx}>
                            <div className={" flex flex-row space-x-2 py-2"}>
                                <input type={"checkbox"} checked={isSelected(specialty)}
                                    className={"form-checkbox w-4 h-4 rounded-none flex-none transition duration-150"}/>
                                <p className={"text-base text-primary-focus leading-tight"}>{specialty}</p>
                            </div>
                        </li>
                    })}
                </ul>
            </div>
            {$footer}
        </div>
    ) : null

    return (
        <div className={"relative w-max"}>
            {$toggleButton}
            {$bg}
            {$list}
        </div>
    )
}
