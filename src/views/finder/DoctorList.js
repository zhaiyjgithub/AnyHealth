import {SortBy} from "../../utils/constant/Enum";
import {HTTP} from "../../utils/httpTool/HttpTool";
import {ApiDoctor} from "../../utils/httpTool/Api";
import {name} from "faker";
import ListWrapper from "../../components/listView/ListWrapper";
import React, {useEffect, useState} from "react";
import {FilterContext} from "../../hooks/filter/Provider";
import {DoctorProfileContext} from "../../hooks/doctorProfile/DoctorProfileProvider";

const DoctorList = ({hasNextPage, isNextPageLoading, items, onLoadMore}) => {
	const [sortBy, setSortBy] = useState(SortBy.Default)
	const [state, dispatchAction] = React.useContext(DoctorProfileContext)

	const onChangeSegmentTab = (val) => {
		setSortBy(val)
		dispatchAction({type: 'hello'})
	}

	return (
		<div className={'h-full w-full '}>
			<ListWrapper
				hasNextPage={hasNextPage}
				isNextPageLoading={isNextPageLoading}
				items={items}
				loadNextPage={onLoadMore}
				onChangeSegmentTab={onChangeSegmentTab}
			/>
		</div>
	)
}

export default DoctorList
