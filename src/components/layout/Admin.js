import NavBar from "../navBar/NavBar";
import React, {useState, useEffect} from "react";
import ListWrapper from "../List/ListWrapper";
import { name } from "faker";
import DoctorItem from "../../views/finder/DoctorItem";
import {SpecialtyList} from "../../utils/constant/SpecialtyList";


function Admin() {
	const [hasNextPage, setHasNextPage] = useState(true)
	const [isNextPageLoading, setIsNextPageLoading] = useState(false)
	const [items, setItems] = useState([])

	const [doctorName, setDoctorName] = useState('')
	const [specialty, setSpecialty] = useState('')
	const [city, setCity] = useState('')
	const [gender, setGender] = useState('')
	const [visitType, setVisitType] = useState('')
	const [sort, setSort] = useState(false)


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
			<div className={'w-full h-full flex flex-row items-center justify-center bg-white'}>
				<div className={'w-full max-w-screen-md h-full pt-16 bg-red-200'}>
					<div className={'mt-2'}>
						<div className={'flex flex-row items-center'}>
							<p className={'font-medium mr-2'}>{'Sort: '}</p>
							<label className="inline-flex items-center">
								<input type="radio" className=" h-4 w-4 rounded-full" checked={true} />
								<span
									className="ml-2 text-gray-700 font-Lato">Default</span>
							</label>

							<label className="inline-flex items-center ml-4">
								<input type="radio" className=" h-4 w-4 rounded-full" checked={false} />
								<span
									className="ml-2 text-gray-700 font-Lato">By distance</span>
							</label>
						</div>
					</div>

					{/*<ListWrapper*/}
					{/*	hasNextPage={hasNextPage}*/}
					{/*	isNextPageLoading={isNextPageLoading}*/}
					{/*	items={items}*/}
					{/*	loadNextPage={loadNextPage}*/}
					{/*/>*/}

					{/*const {FullName, specialty, SubSpecialty,*/}
					{/*NextAvailableDateInClinic, NextAvailableDateVirtual,*/}
					{/*gender, YearsOfExperience, Language,*/}
					{/*Distance, Address, Lat, Lng*/}

					<DoctorItem
						FullName={'FullName'}

					/>
				</div>



			</div>
		</div>
	)
}

export default Admin
