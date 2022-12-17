import React, {createContext, Dispatch, useReducer} from "react";
import {SearchFilter} from "./model/searchFilter";
import {AppointmentType, Gender} from "../../../utils/enum/enum";

export enum ActionTypeForSearchFilter {
    keyword,
    zip,
    city,
    apptType,
    specialty,
    distance,
    moreFilter,
    startDate,
    endDate,
    page,
}

const initialState: SearchFilter = {
    keyword: "",
    appointmentType: AppointmentType.anyType,
    startDate: new Date(),
    endDate: undefined,
    specialty: "",
    gender: Gender.Trans,
    zip: "",
    city: "",
    lat: 40.748159,
    lon: -73.978423,
    // default value = 1000km
    distance: 1000,
    page: 1,
    pageSize: 50,
}

interface ActionForFilter {
    type: ActionTypeForSearchFilter,
    value?: any
}

function reducer(state : SearchFilter, actions: ActionForFilter) {
    const {type, value} = actions
    switch (type) {
    case ActionTypeForSearchFilter.keyword:
        return {
            ...state,
            keyword: value.keyword,
            zip: value.zip,
            city: value.city,
            page: 1,
        }
    case ActionTypeForSearchFilter.apptType:
        return {
            ...state,
            appointmentType: value,
        }
    case ActionTypeForSearchFilter.specialty:
        return {
            ...state,
            specialty: value,
        }
    case ActionTypeForSearchFilter.distance:
        return {
            ...state,
            distance: value,
        }
    case ActionTypeForSearchFilter.moreFilter:
        return {
            ...state,
            gender: value?.gender,
        }
    case ActionTypeForSearchFilter.startDate:
        return {
            ...state,
            startDate: value,
        }
    case ActionTypeForSearchFilter.endDate:
        return {
            ...state,
            endDate: value,
        }
    case ActionTypeForSearchFilter.page:
        return {
            ...state,
            page: value,
        }
    default:
        return state
    }
}

export const SearchFilterContext = createContext<{
    state: SearchFilter,
    dispatch: Dispatch<ActionForFilter>
}>({
    state: initialState,
    dispatch: () => null,
})

export function SearchFilterProvider({children}: any) {
    const [state, dispatch] = useReducer(reducer, initialState)
    return (
        <SearchFilterContext.Provider value={{state, dispatch}}>
            {children}
        </SearchFilterContext.Provider>
    )
}
