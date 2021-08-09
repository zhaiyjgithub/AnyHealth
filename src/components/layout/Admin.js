import NavBar from "../navBar/NavBar";
import React, {useState, useEffect} from "react";
import ListWrapper from "../List/ListWrapper";
import { name } from "faker";
import Appointment from "../../views/appointment/Appointment";
import {HTTP} from "../../utils/httpTool/HttpTool";
import {ApiDoctor} from "../../utils/httpTool/Api";
import {SortBy} from "../../utils/constant/Enum";


function Admin() {
	const [hasNextPage, setHasNextPage] = useState(true)
	const [isNextPageLoading, setIsNextPageLoading] = useState(false)
	const [items, setItems] = useState([])
	const [sortBy, setSortBy] = useState(SortBy.Default)

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
		<div className={'w-screen h-screen bg-white'}>
			<NavBar />
			<div className={'w-full h-full flex flex-row justify-center bg-white px-4 md:px-20'}>
				<div className={'h-full w-1/2 '}>
					<ListWrapper
						hasNextPage={hasNextPage}
						isNextPageLoading={isNextPageLoading}
						items={items}
						loadNextPage={loadNextPage}
						onChangeSegmentTab={onChangeSegmentTab}
					/>
				</div>

				<div className={'w-1/2 flex-grow overflow-scroll'}>
					<Appointment />
				</div>
			</div>
		</div>
	)
}

export default Admin
