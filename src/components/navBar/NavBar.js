import React, {useState, Fragment} from "react";
import icon_logo from '../../assets/images/logo.jpg'
import { Listbox, Transition } from '@headlessui/react'


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

	return (
		<nav className={'w-full bg-white py-3 px-32 border-b z-50 fixed'}>
			<div className={'flex flex-row items-center justify-between '}>
				<div className={'flex-none'}>
					<span className="text-primary font-mono font-bold text-3xl">Any</span>
					<span className="text-white font-mono font-bold text-3xl bg-primary p-0.5 ml-1 rounded">Health</span>
				</div>

				<div className={'flex flex-grow flex-row items-center justify-center mx-8 h-10 rounded overflow-hidden'}>
					<input className={'w-3/5 h-10 px-2 font-medium text-baseBlack text-base focus:outline-none bg-gray-200 '} placeholder={'Doctor Name'} />
					<div className={'w-2/5 flex border-l-2 bg-gray-200 h-full border-gray-300'}>
						<button type="button" className={'flex-grow h-6 px-2 font-medium text-baseBlack text-base h-full border-r-2 border-gray-300'}>
							Specialty
						</button>
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
				<div className="w-48">
					<Listbox value={citySelected.name} onChange={setCitySelected}>
						<div className="relative mt-0">
							<Listbox.Button className="relative w-full py-2 pl-3 pr-3 text-left bg-white cursor-default bg-gray-200 rounded flex flex-row items-center justify-between">
								<span className="block truncate font-medium font-mono">{citySelected.name}</span>
								<span className="">
									<i className="fas fa-chevron-down"></i>
            					</span>
							</Listbox.Button>
							<Transition
								as={Fragment}
								enter="transition duration-100 ease-out"
								enterFrom="transform scale-95 opacity-0"
								enterTo="transform scale-100 opacity-100"
								leave="transition duration-75 ease-out"
								leaveFrom="transform scale-100 opacity-100"
								leaveTo="transform scale-95 opacity-0"
							>
								<Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded shadow-lg max-h-72">
									{people.map((person, personIdx) => {
										return (
											<Listbox.Option
												key={personIdx}
												value={person.name}
											>
												{({ selected, active }) => {
													console.log('isSelected', selected)
													return (
														<div
															className={`${
																active ? 'bg-primary text-white font-medium' : 'bg-white text-black font-normal'
															} w-full py-2 px-4 font-mono`}
														>
															{selected && <i className="fas fa-check mr-4"></i>}
															{person.name}
														</div>
													)
												}}
											</Listbox.Option>
										)
									})}
								</Listbox.Options>
							</Transition>
						</div>
					</Listbox>
				</div>
			</div>
		</nav>
	)
}

export default NavBar
