import {SortBy} from "../../utils/constant/Enum";
import {HTTP} from "../../utils/httpTool/HttpTool";
import {ApiDoctor} from "../../utils/httpTool/Api";
import {name} from "faker";
import ListWrapper from "../../components/listView/ListWrapper";
import React, {useEffect, useState} from "react";
import {FilterContext} from "../../hooks/filter/Provider";

const DoctorList = () => {
	const [hasNextPage, setHasNextPage] = useState(true)
	const [isNextPageLoading, setIsNextPageLoading] = useState(false)
	const [items, setItems] = useState([])
	const [sortBy, setSortBy] = useState(SortBy.Default)
	const [state, dispatch] = React.useContext(FilterContext)

	console.log('hooks state', JSON.stringify(state))

	useEffect(() => {
		testRequest()
	}, [])

	const testRequest = () => {
		const param = {
			"Keyword": "",
			"IsInClinicEnable": true,
			"IsVirtualEnable": true,
			"AppointmentType": 2,
			"NextAvailableDate": "2021-07-05T14:36:41Z",
			"Gender": "M",
			"Specialty": "",
			"City": "",
			"Lat": 40.747898,
			"Lon": -73.324025,
			"Distance": 200,
			"Page": 1,
			"PageSize": 20,
			"SortType": 1
		}
		HTTP.post(ApiDoctor.SearchDoctor, param).then((response) => {
			console.log(JSON.stringify(response))
		}).catch((error) => {
			alert(error)
		})
	}

	const loadNextPage = (...args) => {
		setIsNextPageLoading(true)
		setTimeout(() => {
			setHasNextPage(items.length < 100)
			setIsNextPageLoading(false)
			setItems([...items].concat(
				new Array(10).fill(true).map(() => ({ name: name.findName() }))
			))
		}, 2500)
	};

	const onChangeSegmentTab = (val) => {
		setSortBy(val)
	}

	return (
		<div className={'h-full w-full '}>
			<ListWrapper
				hasNextPage={hasNextPage}
				isNextPageLoading={isNextPageLoading}
				items={items}
				loadNextPage={loadNextPage}
				onChangeSegmentTab={onChangeSegmentTab}
			/>
		</div>
	)
}

export default DoctorList
