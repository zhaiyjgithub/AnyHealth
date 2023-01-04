import React from "react";
import {useScrollSection} from "react-scroll-section";

interface ScrollSectionMenu {
    title: string,
    scrollSectionState: { onClick: () => void, selected: boolean }
}

export enum ScrollSectionMenuId {
    about = "About",
    insurances = "Insurances",
    locations = "Locations",
    educations = "Educations",
    faq = "FAQs",
    other = "Other",
    basicInfo = "BasicInfo",
    stickyHeader = "StickyHeader",
    newPatient = "New patient",
    rating = "Rating"
}

export default function SectionHeader() {
    const $menuItem = ({title, scrollSectionState}: ScrollSectionMenu, idx: number) => {
        return (
            <button onClick={() => {
                scrollSectionState.onClick && scrollSectionState.onClick()
            }} key={idx} type={"button"}
            className={`cursor-pointer text-xl py-4 text-primary-focus border-b-4 ${scrollSectionState.selected ? "border-primary-focus" : "border-transparent"} hover:border-primary-focus`}>{title}</button>
        )
    }
    const data: Array<ScrollSectionMenu> = [
        {title: ScrollSectionMenuId.about, scrollSectionState: useScrollSection(ScrollSectionMenuId.about)},
        {title: ScrollSectionMenuId.insurances, scrollSectionState: useScrollSection(ScrollSectionMenuId.insurances)},
        {title: ScrollSectionMenuId.locations, scrollSectionState: useScrollSection(ScrollSectionMenuId.locations)},
        {title: ScrollSectionMenuId.educations, scrollSectionState: useScrollSection(ScrollSectionMenuId.educations)},
        {title: ScrollSectionMenuId.faq, scrollSectionState: useScrollSection(ScrollSectionMenuId.faq)},
    ]

    return (
        <div className={"w-full flex flex-row items-center space-x-8"}>
            {data.map((title, idx) => {
                return $menuItem(title, idx)
            })}
        </div>
    )
}
