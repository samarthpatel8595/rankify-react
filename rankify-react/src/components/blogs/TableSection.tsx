import React from 'react'
import InputField from '@/components/common/InputField';
import { Archive, FileCode, FileImage, FileText, MoreVertical, Search, SlidersHorizontal } from 'lucide-react';
import Button from '@/components/common/Button';

const files = [
    {
        id: "project-proposal",
        name: "Project_Proposal.pdf",
        size: "2.4 MB",
        modified: "2 hours ago",
        uploaded: "2 December, 2025",
        icon: FileText,
        iconColor: "text-sunray",
        iconBg: "bg-sunray/10",
    },
    {
        id: "design-mockups",
        name: "Design_Mockups.fig",
        size: "8.1 MB",
        modified: "5 hours ago",
        uploaded: "3 November, 2025",
        icon: FileCode,
        iconColor: "text-sky-500",
        iconBg: "bg-sunray/10",
    },
    {
        id: "brand-assets",
        name: "Brand_Assets.zip",
        size: "15.3 MB",
        modified: "Yesterday",
        uploaded: "14 October, 2025",
        icon: Archive,
        iconColor: "text-amber-500",
        iconBg: "bg-sunray/10",
    },
    {
        id: "screenshot",
        name: "Screenshot_2024.png",
        size: "1.2 MB",
        modified: "2 days ago",
        uploaded: "9 October, 2025",
        icon: FileImage,
        iconColor: "text-emerald-500",
        iconBg: "bg-sunray/10",
    },
    {
        id: "api-docs",
        name: "API_Documentation.md",
        size: "456 KB",
        modified: "3 days ago",
        uploaded: "4 September, 2025",
        icon: FileText,
        iconColor: "text-slate-600",
        iconBg: "bg-sunray/10",
    },
];

const TableSection = () => {
    return (
        <>
            <section className="mt-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <InputField
                        wrapperClassName="w-full max-w-md px-4 py-3"
                        inputClassName="text-xs sm:text-sm"
                        icon={<Search className="text-independence" size={16} />}
                        placeholder="Search files..."
                    />
                    <Button
                        className="flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-xs shadow-sm sm:w-auto sm:text-sm"
                        icon={<SlidersHorizontal size={16} />}
                        variant="secondary"
                    >
                        Any Date
                    </Button>
                </div>
            </section>
            <section className="rounded-2xl border border-slate-200/70 bg-white p-4 shadow-[0_14px_30px_-24px_rgba(15,23,42,0.35)] sm:p-5">
                <div className="overflow-hidden rounded-2xl">
                    <div className="hidden grid-cols-[2.2fr_0.8fr_1.2fr_1.2fr_0.4fr] gap-4 px-2 py-1 text-xs font-bold text-independence sm:grid">
                        <span>File Name</span>
                        <span>Size</span>
                        <span>Last Modified</span>
                        <span>Date of Upload</span>
                        <span className="text-right">Actions</span>
                    </div>
                    <div className="divide-y divide-slate-100">
                        {files.map((file) => {
                            const Icon = file.icon;
                            return (
                                <div
                                    key={file.id}
                                    className="grid grid-cols-1 gap-3 px-2 py-4 text-sm text-slate-600 sm:grid-cols-[2.2fr_0.8fr_1.2fr_1.2fr_0.4fr] sm:items-center"
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex min-w-0 items-center gap-3">
                                            <span
                                                className={`flex h-10 w-10 items-center justify-center rounded-[10px] ${file.iconBg}`}
                                            >
                                                <Icon size={18} className="text-sunray" />
                                            </span>
                                            <div className="min-w-0">
                                                <p className="wrap-break-word text-sm font-normal text-ink">
                                                    {file.name}
                                                </p>
                                                <div className="mt-1 flex flex-wrap gap-2 text-[11px] text-slate-400 sm:hidden">
                                                    <span>{file.size}</span>
                                                    <span>•</span>
                                                    <span>{file.modified}</span>
                                                    <span>•</span>
                                                    <span className="wrap-break-word">{file.uploaded}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-lg text-independence hover:bg-slate-100 sm:hidden"
                                            aria-label={`Open actions for ${file.name}`}
                                        >
                                            <MoreVertical size={16} />
                                        </button>
                                    </div>

                                    <span className="hidden text-xs text-slate-500 sm:block">
                                        {file.size}
                                    </span>
                                    <span className="hidden text-xs text-slate-500 sm:block">
                                        {file.modified}
                                    </span>
                                    <span className="hidden text-xs text-slate-500 sm:block">
                                        {file.uploaded}
                                    </span>
                                    <div className="hidden items-center justify-end sm:flex">
                                        <button
                                            type="button"
                                            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-independence hover:bg-slate-100"
                                            aria-label={`Open actions for ${file.name}`}
                                        >
                                            <MoreVertical size={16} />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </>
    )
}

export default TableSection