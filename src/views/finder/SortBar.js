import React, {useState} from "react";
import SegmentTab from "../../components/SegmentTab/SegmentTab";
import {SortBy} from "../../utils/constant/Enum";

const SortBar = ({selectedSortBy = 0, onChangeSegmentTab}) => {
	const buttons = [{title: 'Default', value: SortBy.Default}, {title: 'Distance', value: SortBy.Distance}]

	const onClickSegmentTab = (val) => {
		onChangeSegmentTab && onChangeSegmentTab(val)
	}
	return (
		<div className={'w-full flex flex-row items-center justify-between p-2 border'}>
			<p className={'font-semibold text-base text-primary font-mono'}>Doctors for you</p>
			<div className={'flex flex-row items-center'}>
				<p className={'font-semibold mr-2 text-base text-base-black'}>Sort By:</p>
				<SegmentTab buttons={buttons} selected={selectedSortBy} onClick={onClickSegmentTab}/>
			</div>
		</div>
	)
}

export default SortBar
