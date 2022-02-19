import React, {useContext} from "react";
import SearchDoctor from "./findDoctor/searchDoctor";
import {SearchFilterContext, SearchFilterProvider} from "./findDoctor/searchFilterProvider";

export default function HomePage() {
    const {state, dispatch} = useContext(SearchFilterContext)
    return (
        <SearchFilterProvider value={{state, dispatch}}>
            <div className={"w-full h-full"}>
                <SearchDoctor />
            </div>    
        </SearchFilterProvider>
        
    )
}