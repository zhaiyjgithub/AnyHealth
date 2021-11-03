import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useState } from 'react'

export const CustomModalAction = {
    Cancel: 0,
    Normal: 1,
    Danger: 2,
}

export default function CustomModal({title, description, buttons, isOpen, closeModal}) {
    const renderCancelButton = (title, action, idx) => {
        return (
            <button
                key={idx}
                type="button"
                className="ml-4 inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-600 bg-gray-200 border border-transparent rounded-md hover:bg-gray-300 focus:outline-none"
                onClick={action}
            >
                {title}
            </button>
        )
    }

    const renderNormalButton = (title, action, idx) => {
        return (
            <button
                key={idx}
                type="button"
                className="ml-4 inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-600 bg-gray-200 border border-transparent rounded-md hover:bg-gray-300 focus:outline-none"
                onClick={action}
            >
                {title}
            </button>
        )
    }

    const renderDangerButton = (title, action, idx) => {
        return (
            <button
                key={idx}
                type="button"
                className="ml-4 inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-500 border border-transparent rounded-md hover:bg-red-600 focus:outline-none"
                onClick={action}
            >
                {title}
            </button>
        )
    }
    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={closeModal}
                >
                    <div className="min-h-screen px-4 text-center">
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

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span
                            className="inline-block h-screen align-middle"
                            aria-hidden="true"
                        >
              &#8203;
            </span>
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
                                    {title}
                                </Dialog.Title>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                        {description}
                                    </p>
                                </div>

                                <div className="mt-4 flex flex-row items-center justify-end">
                                    {buttons.map(({type, title, action}, idx) => {
                                        if (type === CustomModalAction.Cancel) {
                                            return renderCancelButton(title, action, idx)
                                        }else if (type === CustomModalAction.Normal) {
                                            return renderNormalButton(title, action, idx)
                                        }else if (type === CustomModalAction.Danger) {
                                            return renderDangerButton(title, action, idx)
                                        }
                                    })}
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
