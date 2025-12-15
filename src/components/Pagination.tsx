"use client";

import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    const canGoPrev = currentPage > 1;
    const canGoNext = currentPage < totalPages;

    return (
        <div className="flex items-center justify-center gap-4 py-8">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={!canGoPrev}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-700 transition"
            >
                <ChevronLeft size={20} />
                আগের পেজ
            </button>

            <div className="flex items-center gap-2">
                <span className="text-gray-700 font-medium">
                    পেজ {currentPage} / {totalPages}
                </span>
            </div>

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={!canGoNext}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-700 transition"
            >
                পরের পেজ
                <ChevronRight size={20} />
            </button>
        </div>
    );
}
