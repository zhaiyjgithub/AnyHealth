import React, {useContext, useEffect, useState} from "react";
import SpecialtyFilter from "./specialtyFilter";
import DistanceFilter from "./distanceFilter";
import MoreFilter, {DataForMoreFilter} from "./moreFilter";
import CalendarFilter from "./calendarFilter";
import {ActionTypeForSearchFilter, SearchFilterContext} from "../../searchFilterProvider";
import {Gender} from "../../../../../utils/enum/enum";

export default function Filter() {
    const [showMoreFilter, setShowMoreFilter] = useState<boolean>(false)
    const [languages] = useState<Array<string>>([])
    const [moreFilter, setMoreFilter] = useState<DataForMoreFilter>({gender: Gender.Trans})
    const {state, dispatch} = useContext(SearchFilterContext)

    const onDispatch = (type: ActionTypeForSearchFilter, value: any) => {
        dispatch({type: type, value: value})
    }

    useEffect(() => {
        onDispatch(ActionTypeForSearchFilter.moreFilter, moreFilter)
    }, [moreFilter])

    const $toggleButtonForMoreFilter = (
        <button onClick={(e) => {
            e.stopPropagation()
            setShowMoreFilter(true)
        }} type={"button"} className={`z-10 relative px-4 py-2 font-medium rounded-full flex flex-row items-center border text-primary-focus text-sm leading-tight hover:bg-base-250 hover:border-primary-focus ${showMoreFilter || languages.length ? "border-primary-focus bg-base-250" : "border-base-300 bg-white"}`}>
            More filters
        </button>
    )

    const $modalForMoreFilter = (
        <MoreFilter filter={moreFilter} open={showMoreFilter} onApply={(filter) => {
            setMoreFilter(filter)
            setShowMoreFilter(false)
        }} />
    )

    const $specialtyFilter = (
        <SpecialtyFilter selectedSpecialty={state.specialty} onApply={(specialty) => {
            onDispatch(ActionTypeForSearchFilter.specialty, specialty)
        }} />
    )

    const $distanceFilter = (<DistanceFilter distance={state.distance} onApply={(distance) => {
        onDispatch(ActionTypeForSearchFilter.distance, distance)
    }} />)

    const $dateFilter = (
        <div className={"flex flex-row items-center space-x-4"}>
            <CalendarFilter date={state.startDate} onApply={(date) => {
                onDispatch(ActionTypeForSearchFilter.startDate, date)
            }} />
        </div>
    )

    const $fieldFilters = (
        <div className={"flex flex-row items-center space-x-2"}>
            {$specialtyFilter}
            {$distanceFilter}
            {$dateFilter}
            {$toggleButtonForMoreFilter}
            {$modalForMoreFilter}
        </div>
    )

    return (
        <div className={"flex flex-row items-center justify-between"}>
            {$fieldFilters}
        </div>
    )
}