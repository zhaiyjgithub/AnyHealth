import {Listbox, Transition} from "@headlessui/react";
import React, {Fragment, useState} from "react";

export default function ListBox(props) {
	const [selected, setSelected] = useState(props.selected)

	function onChange(value) {
		setSelected(value)
		const {onChangeValue} = props
		onChangeValue && onChangeValue(value)
	}

	function getTitle(value) {
		const item = props.dataSource.find((_item) => {
			return _item && _item.value.length && _item.value === value
		})
		return item ? item.title : props.defaultTitle
	}

	const isSelectedValue = selected.length > 0
	const title = getTitle(selected)

	return (
		<div className="min-w-min">
			<Listbox value={selected} onChange={onChange} >
				<div className="relative mt-0">
					<Listbox.Button className={` relative py-1 px-4 cursor-default rounded-full flex flex-row items-center justify-between ${isSelectedValue ? 'bg-green' : 'border border-gray-400 bg-white hover:bg-gray-200'}`}>
						<span className={` font-mono text-sm mr-2 ${isSelectedValue ? 'font-bold text-white' : ' font-semibold text-gray-600'}`}>{title}</span>
						<span className="">
									<i className={`fas fa-chevron-down ${isSelectedValue ? 'text-white' : 'text-gray-600'}`}></i>
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
						<Listbox.Options className="absolute w-48 py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-2xl border max-h-72">
							{props.dataSource.map((gender, idx) => {
								return (
									<Listbox.Option
										key={idx}
										value={gender.value}
									>
										{({ selected, active }) => {
											console.log('isSelected', selected)
											return (
												<div
													className={`${
														active ? 'bg-green text-white font-medium' : 'bg-white text-black font-normal'
													} w-full py-2 px-4 font-mono text-sm`}
												>
													{selected && <i className="fas fa-check mr-4"></i>}
													{gender.title}
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
	)
}

ListBox.defaultProps = {
	selected: '',
	defaultTitle: 'Gender',
	dataSource: [],
	onChangeValue: undefined
}
