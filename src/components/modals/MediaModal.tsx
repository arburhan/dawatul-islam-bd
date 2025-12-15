"use client";

import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { X } from 'lucide-react';

interface MediaModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (url: string) => void;
    title: string;
    placeholder: string;
}

export default function MediaModal({
    isOpen,
    onClose,
    onSubmit,
    title,
    placeholder
}: MediaModalProps) {
    const [url, setUrl] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!url.trim()) {
            setError('URL লিখুন');
            return;
        }

        let formattedUrl = url.trim();
        // Auto-add https:// if missing
        if (!/^https?:\/\//i.test(formattedUrl)) {
            formattedUrl = 'https://' + formattedUrl;
        }

        // Basic URL validation
        try {
            new URL(formattedUrl);
            onSubmit(formattedUrl);
            setUrl('');
            setError('');
            onClose();
        } catch {
            setError('সঠিক URL লিখুন');
        }
    };

    const handleClose = () => {
        setUrl('');
        setError('');
        onClose();
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={handleClose}>
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
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900 flex items-center justify-between"
                                >
                                    {title}
                                    <button
                                        onClick={handleClose}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <X size={20} />
                                    </button>
                                </Dialog.Title>

                                <form onSubmit={handleSubmit} className="mt-4">
                                    <div>
                                        <input
                                            type="text"
                                            value={url}
                                            onChange={(e) => {
                                                setUrl(e.target.value);
                                                setError('');
                                            }}
                                            placeholder={placeholder}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                            autoFocus
                                        />
                                        {error && (
                                            <p className="mt-1 text-sm text-red-600">{error}</p>
                                        )}
                                    </div>

                                    <div className="mt-6 flex gap-3 justify-end">
                                        <button
                                            type="button"
                                            onClick={handleClose}
                                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
                                        >
                                            বাতিল
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition"
                                        >
                                            যুক্ত করুন
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
