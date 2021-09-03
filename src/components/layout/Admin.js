import NavBar from "../navBar/NavBar";
import React, {useState, useContext, useEffect} from "react";
import DoctorProfile from "../../views/doctorProfile/DoctorProfile";
import DoctorList from "../../views/finder/DoctorList";
import {findDoctor} from "../../views/finder/Service";
import {name} from "faker";
import {DoctorProfileContext, DoctorProfileProvider} from "../../hooks/doctorProfile/DoctorProfileProvider";
import SortBar from "../../views/finder/SortBar";
import {initialFilter, FilterContext} from "../../hooks/filter/FilterProvider";

function Admin() {
	const [dataSource, setDataSource] = useState([])
	const [filter, setFilter] = useState(initialFilter)
	const [hasNextPage, setHasNextPage] = useState(true)
	const [isNextPageLoading, setIsNextPageLoading] = useState(false)
	const [page, setPage] = useState(1)

	const [userLocation, setUserLocation] = useState({lat:  40.747898, lon: -73.324025})
	const pageSize = 10
	let distance = 200

	useEffect(() => {
		console.log('filter is updated....', filter, page, )
		onLoadMore()
	}, [filter])

	// //多个useEffect, 根据
	// useEffect(() => {
	// 	console.log('sortBy is changed, exec func.......', filter, page, )
	// }, [sortBy])

	const onChangeFilter = (newFilter) =>{
		console.log('exec onChangeFilter:', newFilter)
		setDataSource([])
		setPage(1)
		setFilter(newFilter)
	}

	const onLoadMore = () => {
		console.log('on load more...')
		setIsNextPageLoading(true)
		requestDoctorList((data) => {
			setPage(page + 1)
			setHasNextPage(true)
			setDataSource([...dataSource].concat(data))
			console.log('on end request....')
		})
	}

	const requestDoctorList = (success, fail) => {
		const {
			keyword,
			specialty,
			city,
			gender,
			availableTime,
			appointmentType,
			sortBy,
		} = filter

		let isInClinicEnable = true // keep
		let	isVirtualEnable = true //keep
		let nextAvailableDate = (new Date(2021, 3,4)).toISOString()
		findDoctor(keyword,
			isInClinicEnable ,
			isVirtualEnable,
			appointmentType,
			nextAvailableDate,
			gender,
			specialty,
			city,
			userLocation.lat,
			userLocation.lon,
			distance,
			page,
			pageSize,
			sortBy, (data) => {
				success && success(data)
			}, (error) => {

			})
	}

	return (
		<FilterContext.Provider value={{onChangeFilter, onLoadMore, filter}}>
			<DoctorProfileProvider>
				<div className={'w-screen h-screen bg-white'}>
					<NavBar />
					<div className={'w-full h-full flex flex-row justify-center bg-white px-4 md:px-20 pt-2'}>
						<div className={'h-full w-full flex flex-col md:w-1/2 z-10'}>
							<SortBar />
							<div className={'w-full h-full'}>
								<DoctorList
									hasNextPage={hasNextPage}
									dataSource={dataSource}
									onLoadMore={onLoadMore}
								/>
							</div>
						</div>
						<div className={'hidden md:flex md:w-1/2 h-full overflow-scroll z-10'}>
							<DoctorProfile dataSource={dataSource}/>
						</div>
					</div>
				</div>
			</DoctorProfileProvider>
		</FilterContext.Provider>

	)
}

export default Admin
