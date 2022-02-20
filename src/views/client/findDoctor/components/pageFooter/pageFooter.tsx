import React, {useContext} from "react";
import {ActionTypeForSearchFilter, SearchFilterContext} from "../../searchFilterProvider";

interface IProps {
    currentPage: number,
    total: number,
    pageSize: number
}

export default function PageFooter(props: IProps) {
    const {dispatch} = useContext(SearchFilterContext)
    const {currentPage, total, pageSize = 100} = props
    const $pageIndexItem = (idx: number) => {
        const isSelected = currentPage === idx
        return <button onClick={() => {
            dispatch({type: ActionTypeForSearchFilter.page, value: idx})
        }} key={idx} type={"button"} className={`h-8 w-8 leading-snug font-medium ${isSelected ? "bg-base-300" : ""} hover:bg-base-300 text-sm text-primary-focus`}>{idx}</button>
    }
    const page = parseInt((total / pageSize).toString(), 10)
    const maxPage = page > 10 ? 10 : page
    const $list = () => {
        const list = []
        for (let i = 0; i < maxPage; i ++) {
            list.push($pageIndexItem(i + 1))
        }
        return list
    }
    
    return (
        <div className={"w-full flex flex-row items-center space-x-4"}>
            {$list()}
        </div>
    )
    
}