import React, {useState, Fragment, useEffect} from "react";
import ListBox from "./ListBox";
import {AppointmentType, AvailableTimeRange, GenderType} from "../../utils/constant/Enum";
import SectionListModal from "./SectionListModal";
import {SpecialtyList} from "../../utils/constant/SpecialtyList";


const GenderListBoxDataSource = [{title: 'Female', value: GenderType.Female}, {title: 'Male', value: GenderType.Male}, {title: 'Trans', value: GenderType.Trans}]
const AvailableTimeListBoxDataSource = [{title: 'Today', value: AvailableTimeRange.Today}, {title: 'In a Week', value: AvailableTimeRange.InWeek}, {title: 'Any Time', value: AvailableTimeRange.AnyTime}]
const AppointmentTypeListBoxDataSource = [{title: 'In Clinic', value: AppointmentType.InClinic}, {title: 'Virtual', value: AppointmentType.Virtual}, {title: 'Any Type', value: AppointmentType.AnyType}]


function NavBar() {
	const people = [
		{ name: 'Wade Cooper' },
		{ name: 'Arlene Mccoy' },
		{ name: 'Devon Webb' },
		{ name: 'Tom Cook' },
		{ name: 'Tanya Fox' },
		{ name: 'Hellen Schmidt' },
	]

	const [gender, setGender] = useState('')
	const [availableTime, setAvailableTime] = useState(AvailableTimeRange.AnyTime)
	const [appointmentType, setAppointmentType] = useState(AppointmentType.AnyType)
	const [isSpecialityModalOpen, setIsSpecialityModalOpen] = useState(false)
	const [specialtyDataSource, setSpecialtyDataSource] = useState([])
	const [specialty, setSpecialty] = useState('')

	useEffect(() => {
		setSpecialtyDataSource( sortSpecialty(SpecialtyList))
	})

	function onClickSpecialty() {
		setIsSpecialityModalOpen(true)
	}

	function onChangeGender(val) {
		setGender(val)
	}

	function onChangeAvailableTime(val) {
		setAvailableTime(val)
	}

	function onChangeAppointmentType(val) {
		setAppointmentType(val)
	}

	function onCloseSpecialtyModal() {
		setIsSpecialityModalOpen(false)
	}

	function onSelectedSpecialty(val) {
		setIsSpecialityModalOpen(false)
		setSpecialty(val)
	}

	function sortSpecialty(dataSource) {
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
						specialty: item,
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
		<nav className={'w-full bg-white py-3 px-32 border-b z-50'}>
			<div className={'flex flex-row items-center justify-between '}>
				<div className={'flex-none'}>
					<span className="text-primary font-mono font-bold text-3xl">Any</span>
					<span className="text-white font-mono font-bold text-3xl bg-primary p-0.5 ml-1 rounded">Health</span>
				</div>

				<div className={'flex flex-grow flex-row items-center justify-center mx-8 h-10 rounded overflow-hidden'}>
					<input className={'w-3/5 h-10 px-2 font-medium text-baseBlack text-base focus:outline-none bg-gray-200 '} placeholder={'Doctor Name'} />
					<div className={'w-2/5 flex border-l-2 bg-gray-200 h-full border-gray-300'}>
						<div className={'flex-grow h-6 px-2 font-medium text-baseBlack text-base h-full border-r-2 border-gray-300'}>
							<button type={'button'} onClick={onClickSpecialty} className="relative w-full py-2 pl-3 pr-3 text-left bg-white cursor-default bg-gray-200 rounded flex flex-row items-center justify-between">
								<span className="block truncate font-medium font-mono">Specialty</span>
								<span className="">
									<i className="fas fa-chevron-down"></i>
            					</span>
							</button>
						</div>
						<button className={'flex-none px-4'}>
							<i className="fas fa-search"></i>
						</button>
					</div>
				</div>

				<button type={'button'} className={'flex-none bg-primary rounded px-4 h-10 rounded text-white font-medium font-mono hover:bg-primary-focus transition duration-200 each-in-out '}>
					Sign In
				</button>
			</div>

			{/*filter*/}
			<div className={'w-full flex flex-row items-center mt-4'}>
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

				<button className="relative ml-4 w-48 py-2 pl-3 pr-3 text-left bg-white cursor-default bg-gray-200 rounded flex flex-row items-center justify-between">
					<span className="block truncate font-medium font-mono">City</span>
					<span className="">
									<i className="fas fa-chevron-down"></i>
            					</span>
				</button>
			</div>

			<SectionListModal
				selected={specialty}
				isOpen={isSpecialityModalOpen}
				onClose={onCloseSpecialtyModal}
				dataSource={specialtyDataSource}
				onSelected={onSelectedSpecialty}
			/>
		</nav>
	)
}

export default NavBar
