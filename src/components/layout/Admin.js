import NavBar from "../navBar/NavBar";
import React, {useState, useEffect} from "react";
import ListWrapper from "../List/ListWrapper";
import { name } from "faker";
import DoctorItem from "../../views/finder/DoctorItem";
import {SpecialtyList} from "../../utils/constant/SpecialtyList";
import Appointment from "../../views/appointment/Appointment";


function Admin() {
	const [hasNextPage, setHasNextPage] = useState(true)
	const [isNextPageLoading, setIsNextPageLoading] = useState(false)
	const [items, setItems] = useState([])

	useEffect(() => {

	})

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
