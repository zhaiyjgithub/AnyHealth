import React, {useState, Fragment, useEffect} from "react";
import ListBox from "./ListBox";
import {AppointmentType, AvailableTimeRange, GenderType} from "../../utils/constant/Enum";
import SectionListModal from "../sectionList/SectionListModal";
import {SpecialtyList} from "../../utils/constant/SpecialtyList";
import {NY} from  "../../utils/constant/CityList";
import {Listbox} from "@headlessui/react";


const GenderListBoxDataSource = [{title: 'Female', value: GenderType.Female}, {title: 'Male', value: GenderType.Male}, {title: 'Trans', value: GenderType.Trans}]
const AvailableTimeListBoxDataSource = [{title: 'Today', value: AvailableTimeRange.Today}, {title: 'In a Week', value: AvailableTimeRange.InWeek}, {title: 'Any Time', value: AvailableTimeRange.AnyTime}]
const AppointmentTypeListBoxDataSource = [{title: 'In Clinic', value: AppointmentType.InClinic}, {title: 'Virtual', value: AppointmentType.Virtual}, {title: 'Any Type', value: AppointmentType.AnyType}]


function NavBar() {
	const [gender, setGender] = useState('')
	const [availableTime, setAvailableTime] = useState(AvailableTimeRange.AnyTime)
	const [appointmentType, setAppointmentType] = useState(AppointmentType.AnyType)
	const [isSpecialityModalOpen, setIsSpecialityModalOpen] = useState(false)
	const [specialtyDataSource, setSpecialtyDataSource] = useState([])
	const [specialty, setSpecialty] = useState('')

	const [isCityModalOpen, setIsCityModalOpen] = useState(false)
	const [cityDataSource, setCityDataSource] = useState([])
	const [city, setCity] = useState([])


	useEffect(() => {
		setSpecialtyDataSource(sortList(SpecialtyList))
		setCityDataSource(sortList(NY))
	}, [])


	function onChangeGender(val) {
		setGender(val)
	}

	function onChangeAvailableTime(val) {
		setAvailableTime(val)
	}

	function onChangeAppointmentType(val) {
		setAppointmentType(val)
	}

	function onClickSpecialty() {
		setIsSpecialityModalOpen(true)
	}

	function onCloseSpecialtyModal() {
		setIsSpecialityModalOpen(false)
	}

	function onSelectedSpecialty(val) {
		setIsSpecialityModalOpen(false)
		setSpecialty(val)
	}

	function onClickCity() {
		setIsCityModalOpen(true)
	}

	function onCloseCityModal() {
		setIsCityModalOpen(false)
	}

	function onSelectedCity(val) {
		setIsCityModalOpen(false)
		setCity(val)
	}

	function sortList(dataSource) {
		if (!dataSource.length) {
			return []
		}

		const categories = [
			'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
			'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
		]
		let list = []
		for (let section = 0; section < categories.length; section++) {
			let rows = []
			for (let row = 0; row < dataSource.length; row++) {
				const item = dataSource[row]
				if (item.startsWith(categories[section])) {
					rows.push({
						title: item,
						value: item,
						sectionID: categories[section],
						type: 1,
					})
				}
			}
			if (rows.length) {
				list.push({sectionID: categories[section], data: rows})
			}
		}
		return list
	}

	return (
		<nav className={'w-full bg-white py-3 px-4 md:px-20 border-b'}>
			<div className={'w-full md:max-w-screen-xl'}>
				<div className={'flex flex-row items-center justify-between '}>
					<div className={'flex-none'}>
						<span className="text-primary font-mono font-bold text-3xl">Any</span>
						<span className="text-white font-mono font-bold text-3xl bg-primary p-0.5 ml-1 rounded">Health</span>
					</div>

					<div className={'flex flex-grow flex-row items-center justify-center mx-8 h-10 rounded overflow-hidden'}>
						<input className={'w-full h-10 px-2 font-medium text-baseBlack text-base focus:outline-none bg-gray-200 '} placeholder={'Doctor Name'} />
						<button className={'flex-none px-4 bg-gray-200 h-full border-l-2 border-gray-300'}>
							<i className="fas fa-search"></i>
						</button>
					</div>

					<button type={'button'} className={'flex-none bg-primary rounded px-4 py-2 rounded-full text-white font-medium font-mono hover:bg-primary-focus transition duration-200 each-in-out '}>
						Sign In
					</button>
				</div>

				{/*filter*/}
				<div className={'w-full flex flex-row items-center mt-4'}>
					{/*specialty*/}
					<button onClick={onClickSpecialty} className={` relative py-1 px-4 cursor-default rounded-full flex flex-row items-center justify-between ${specialty.length ? 'bg-green' : 'border border-gray-400 bg-white hover:bg-gray-200'}`}>
						<span className={` font-mono text-sm mr-2 ${specialty.length ? 'font-bold text-white' : ' font-semibold text-gray-600'}`}>{specialty.length ? specialty : 'Specialty'}</span>
						<span className="">
						<i className={`fas fa-chevron-down ${specialty.length ? 'text-white' : 'text-gray-600'}`}></i>
					</span>
					</button>

					<div className={'w-2'}/>

					<button onClick={onClickCity} className={` relative py-1 px-4 cursor-default rounded-full flex flex-row items-center justify-between ${city.length ? 'bg-green' : 'border border-gray-400 bg-white hover:bg-gray-200'}`}>
						<span className={` font-mono text-sm mr-2 ${city.length ? 'font-bold text-white' : ' font-semibold text-gray-600'}`}>{city.length ? city : 'City'}</span>
						<span className="">
						<i className={`fas fa-chevron-down ${city.length ? 'text-white' : 'text-gray-600'}`}></i>
					</span>
					</button>

					<div className={'w-2'}/>
					{/*gender*/}
					<ListBox
						dataSource={GenderListBoxDataSource}
						defaultTitle = {'Gender'}
						selected={gender}
						onChangeValue={onChangeGender}
					/>

					<div className={'w-2'}/>
					{/*next available date*/}
					<ListBox
						dataSource={AvailableTimeListBoxDataSource}
						defaultTitle = {'Any Time'}
						selected={availableTime}
						onChangeValue={onChangeAvailableTime}
					/>

					<div className={'w-2'}/>
					{/*Appointment type*/}
					<ListBox
						dataSource={AppointmentTypeListBoxDataSource}
						defaultTitle = {'Any Type'}
						selected={appointmentType}
						onChangeValue={onChangeAppointmentType}
					/>

					<div className={'w-2'}/>
				</div>

				<SectionListModal
					title ={'Select A Specialty'}
					selected={specialty}
					isOpen={isSpecialityModalOpen}
					onClose={onCloseSpecialtyModal}
					dataSource={specialtyDataSource}
					onSelected={onSelectedSpecialty}
				/>


				<SectionListModal
					title ={'Select A City'}
					selected={city}
					isOpen={isCityModalOpen}
					onClose={onCloseCityModal}
					dataSource={cityDataSource}
					onSelected={onSelectedCity}
				/>
			</div>
		</nav>
	)
}

export default NavBar
