import React, {useState, Fragment} from "react";
import icon_logo from '../../assets/images/logo.jpg'
import { Listbox, Transition, Dialog } from '@headlessui/react'
import ListBox from "./ListBox";
import {AppointmentType, AvailableTimeRange, GenderType} from "../../utils/constant/Enum";


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

	const [citySelected, setCitySelected] = useState(people[0])
	const [isOpen, setIsOpen] = useState(true)

	const [gender, setGender] = useState('')
	const [availableTime, setAvailableTime] = useState(AvailableTimeRange.AnyTime)
	const [appointmentType, setAppointmentType] = useState(AppointmentType.AnyType)

	function closeModal() {
		setIsOpen(false)
	}

	function openModal() {
		setIsOpen(true)
	}

	function renderGenderList() {

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
							<button type={'button'} className="relative w-full py-2 pl-3 pr-3 text-left bg-white cursor-default bg-gray-200 rounded flex flex-row items-center justify-between">
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

				<button className="relative ml-4 w-48 py-2 pl-3 pr-3 text-left bg-white cursor-default bg-gray-200 rounded flex flex-row items-center justify-between">
					<span className="block truncate font-medium font-mono">Any Time</span>
					<span className="">
									<i className="fas fa-chevron-down"></i>
            					</span>
				</button>

				<button className="relative ml-4 w-48 py-2 pl-3 pr-3 text-left bg-white cursor-default bg-gray-200 rounded flex flex-row items-center justify-between">
					<span className="block truncate font-medium font-mono">Appointment Type</span>
					<span className="">
									<i className="fas fa-chevron-down"></i>
            					</span>
				</button>
			</div>


			<Transition appear show={isOpen} as={Fragment}>
				<Dialog
					as="div"
					className="fixed inset-0 z-10 overflow-y-auto"
					onClose={closeModal}
				>
					<div className="flex items-center justify-center min-h-screen">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<Dialog.Overlay className="fixed inset-0" />
						</Transition.Child>

						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
								<Dialog.Title
									as="h3"
									className="text-lg font-medium leading-6 text-gray-900"
								>
									Payment successful
								</Dialog.Title>
								<div className="mt-2">
									<p className="text-sm text-gray-500">
										Your payment has been successfully submitted. We’ve sent
										your an email with all of the details of your order.
									</p>
								</div>

								<div className="mt-4">
									<button
										type="button"
										className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
										onClick={closeModal}
									>
										Got it, thanks!
									</button>
								</div>
							</div>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition>
		</nav>
	)
}

export default NavBar
