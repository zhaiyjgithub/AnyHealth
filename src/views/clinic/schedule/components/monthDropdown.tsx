import React, {useEffect, useState} from "react";
import {MonthLong} from "../../../../utils/enum/enum";
import moment from "moment";
import Button from "../../../../components/buttons/button";

interface DropDownItem {
    name: string,
    idx: number
}

interface IProps {
    onChange: (idx: number) => void,
}

export default function MonthDropdown(props: IProps) {
    const {onChange} = props
    const [selected, setSelected] = useState(moment().month())
    const [show, setShow] = useState<boolean>(false)

    useEffect(() => {
        onChange && onChange(selected)
    }, [selected])

    const data: Array<DropDownItem> = MonthLong.map((item, idx) => {
        return {
            name: item,
            idx: idx,
        }
    })
    const item = data.find((_item) => {
        return _item.idx === selected
    })
    const valueName = item ? item.name : ""
    const $toggleButton = (
        <Button onClick={(e) => {
            e.stopPropagation()
            setShow(!show)
        }}>
            <div className={"flex flex-row items-center space-x-2"}>
                <p>{valueName}</p>
                <i className="fas fa-angle-down"/>
            </div>
        </Button>
    )

    const $bg = show ? (
        <div onClick={() => {
            setShow(false)
        }} className={"fixed inset-0 h-full w-full z-20"} />
    ) : null

    const $item = ({name, idx}: DropDownItem) => {
        return (
            <button type={"button"} onClick={() => {
                setShow(false)
                setSelected(idx)
            }} key={idx} className={"w-full py-2 hover:bg-pink-100 flex flex-row items-center"}>
                <p className={"text-sm px-2 font-medium text-primary-focus text-left"}>{name}</p>
            </button>
        )
    }

    const $list = show ? (
        <div className="absolute left-0 overflow-y-auto border mt-1 min-w-full bg-white shadow-2xl z-20 transition duration-150 ease-in-out max-h-96">
            {data.map((item) => {
                return $item(item)
            })}
        </div>
    ) : null

    return (
        <div className={"relative max-w-max"}>
            {$toggleButton}
            {$bg}
            {$list}
        </div>
    )
}
