import React, {useState} from "react";
import Button from "../../../../../components/buttons/button";
import {ButtonStatus, ButtonType} from "../../../../../components/buttons/enum";
import {SpecialtyList} from "../../../../../utils/enum/specialtyList";

interface IProps {
    selectedSpecialty: Array<string>,
    onApply: (list: Array<string>) => void
}

export default function SpecialtyFilter(props: IProps) {
    const {onApply} = props
    const [show, setShow] = useState<boolean>(false)
    const [selectedSpecialty, setSelectedSpecialty] = useState<Array<string>>(props.selectedSpecialty)
    const [selectedSet, setSelectedSet] = useState<Set<string>>(new Set())

    const isSelected = (targetSpecialty: string) => {
        return selectedSet.has(targetSpecialty)
    }

    const $toggleButton = (
        <button onClick={(e) => {
            e.stopPropagation()
            setShow(!show)
        }} type={"button"} className={`z-10 relative px-4 py-2 font-medium rounded-full flex flex-row items-center border text-primary-focus text-sm leading-tight hover:bg-base-250 hover:border-primary-focus ${show || selectedSpecialty.length ? "border-primary-focus bg-base-250" : "border-base-300 bg-white"}`}>
            Specialty
        </button>
    )

    const $bg = show ? (
        <div onClick={() => {
            setShow(false)
        }} className={"fixed inset-0 h-full w-full z-20"} />
    ) : null

    const onSelect = (specialty: string) => {
        if (isSelected(specialty)) {
            const data = selectedSpecialty.filter((_item) => {
                return _item !== specialty
            })
            const newSet: Set<string> = new Set(selectedSet)
            newSet.delete(specialty)
            setSelectedSet(newSet)
            setSelectedSpecialty(data)
        } else {
            const newSet: Set<string> = new Set(selectedSet)
            newSet.add(specialty)
            setSelectedSet(newSet)
            setSelectedSpecialty(selectedSpecialty.concat([specialty]))
        }
    }

    const onClear = () => {
        setSelectedSpecialty([])
        setSelectedSet(new Set())
    }

    const $footer = (
        <div className={"w-full flex flex-row items-center justify-end border-t px-4 py-2"}>
            <Button type={ButtonType.float} onClick={() => {
                onClear()
            }} >Clear</Button>
            <Button status={ButtonStatus.primary} onClick={() => {
                onApply && onApply(selectedSpecialty)
                setShow(false)
            }} >Apply</Button>

        </div>
    )

    const $list = show ? (
        <div className="absolute left-0 border border-base-300 mt-1 w-56 bg-white shadow-2xl z-20 transition duration-150 ease-in-out">
            <div className={"w-full overflow-y-scroll max-h-96 py-4"}>
                <p className={"text-lg font-bold text-primary-focus px-4 leading-none"}>All specialties for illness (a-z)</p>
                <ul className={"w-full mt-2" }>
                    {SpecialtyList.map((specialty, idx) => {
                        return <li onClick={(e) => {
                            e.stopPropagation()
                            onSelect(specialty)
                        }} className={"px-4 w-full hover:bg-base-250 cursor-pointer"} key={idx}>
                            <div className={" flex flex-row space-x-2 py-2"}>
                                <input type={"checkbox"} checked={isSelected(specialty)} className={"form-checkbox w-4 h-4 rounded-none flex-none transition duration-150"}/>
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