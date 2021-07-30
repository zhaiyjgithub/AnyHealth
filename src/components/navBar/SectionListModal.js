import React, {Fragment, useState, useEffect} from "react";
import {Dialog, Transition} from "@headlessui/react";

export default function SectionListModal(props) {
	function closeModal() {
		// setIsOpen(false)
		const {onClose} = props
		onClose && onClose()
	}

	function onSelected(val) {
		const {onSelected} = props
		onSelected && onSelected(val)
	}

	function renderItem({sectionID, data}, idx) {

		return (
			<div key={idx} className={'w-1/4 px-2 py-2 rounded'}>
				<p className={'font-semibold text-lg text-base-black font-mono'}>{sectionID}</p>
				<ul className={'w-full mt-1'}>
					{data.map(({title, specialty}) => {
						console.log(specialty + ' - ' + props.selected)
						const isSelected = (specialty === props.selected)
						return <li onClick={() => {
							onSelected(specialty)
						}} className={`py-1 px-0.5 hover:bg-gray-200 text-sm font-mono font-normal ${isSelected ? 'bg-primary text-white' : ' text-base-black'}`}>{title}</li>
					}) }
				</ul>
			</div>
		)
	}

	return (
		<Transition appear show={props.isOpen} as={Fragment}>
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
						<div className="inline-block w-full max-w-screen-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
							<Dialog.Title
								as="h3"
								className="text-lg font-medium leading-6 text-gray-900 border-b pb-2"
							>
								Select A Specialty
							</Dialog.Title>

							<div className={'flex flex-row w-full h-80 flex-wrap overflow-auto'}>
								{props.dataSource.map((section, idx) => {
									return renderItem(section, idx)
								})}
							</div>

							<div className="mt-4 w-full flex flex-row-reverse">
								<button
									type="button"
									className=" inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-gray-400 border border-transparent rounded-md hover:bg-gray-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
									onClick={() => {
										onSelected('')
									}}
								>
									Cancel
								</button>

								<button
									type="button"
									className=" inline-flex justify-center px-4 py-2 mr-2 text-sm font-medium text-white bg-primary border border-transparent rounded-md hover:bg-primary-focus focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
									onClick={closeModal}
								>
									Reset
								</button>
							</div>
						</div>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition>
	)
}

SectionListModal.defaultProps = {
	selected: '',
	dataSource: [],
	onChangeValue: undefined,
	onClose: undefined
}
