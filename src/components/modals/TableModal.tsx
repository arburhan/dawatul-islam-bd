"use client";

import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { X } from 'lucide-react';

interface TableModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (rows: number, columns: number) => void;
}

export default function TableModal({
    isOpen,
    onClose,
    onSubmit
}: TableModalProps) {
    const [rows, setRows] = useState(3);
    const [columns, setColumns] = useState(3);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(rows, columns);
        onClose();
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-sm transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900 flex items-center justify-between"
                                >
                                    টেবিল তৈরি করুন
                                    <button
                                        onClick={onClose}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <X size={20} />
                                    </button>
                                </Dialog.Title>

                                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            সারি (Rows)
                                        </label>
                                        <input
                                            type="number"
                                            min="1"
                                            max="20"
                                            value={rows}
                                            onChange={(e) => setRows(parseInt(e.target.value) || 1)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            কলাম (Columns)
                                        </label>
                                        <input
                                            type="number"
                                            min="1"
                                            max="20"
                                            value={columns}
                                            onChange={(e) => setColumns(parseInt(e.target.value) || 1)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                        />
                                    </div>

                                    <div className="mt-6 flex gap-3 justify-end">
                                        <button
                                            type="button"
                                            onClick={onClose}
                                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
                                        >
                                            বাতিল
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition"
                                        >
                                            তৈরি করুন
                                        </button>
                                    </div>
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
