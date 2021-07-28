import React, {Fragment, useState, useEffect} from "react";
import {Dialog, Transition} from "@headlessui/react";

export default function SectionListModal(props) {
	const [selected, setSelected] = useState(props.selected)

	function closeModal() {
		// setIsOpen(false)
		const {onClose} = props
		onClose && onClose()
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
	)
}

SectionListModal.defaultProps = {
	selected: '',
	dataSource: [],
	onChangeValue: undefined,
	onClose: undefined
}
