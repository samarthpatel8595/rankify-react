"use client";
import React from 'react'
import InputField from '@/components/common/InputField';
import { Archive, ArrowUpRight, FileCode, FileImage, FileText, MoreVertical, Search, SlidersHorizontal } from 'lucide-react';
import Button from '@/components/common/Button';
import { useRouter } from 'next/navigation';
import { create } from "zustand";

export const useProjectStore = create((set) => ({
    selectedProject: null,
    setProject: (data: any) => set({ selectedProject: data }),
}));



// Array of 6 items to create the 3x2 grid
const projectsData = [
    { id: 1, title: 'Adoptify AI', blogs: 120, status: 'Active' },
    { id: 2, title: 'AI CERTs', blogs: 85, status: 'Running' },
    { id: 3, title: 'AI News Daily', blogs: 210, status: 'Active' },
    { id: 4, title: 'TechVault Pro', blogs: 64, status: 'Active' },
    { id: 5, title: 'GreenEarth Blog', blogs: 42, status: 'Paused' },
    { id: 6, title: 'FinScope AI', blogs: 156, status: 'Active' },
];

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
    const router = useRouter();
    return (
        <>
            <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-semibold text-ink leading-none">Projects</h2>
                <p className="text-sm text-independence">Manage your AI blog generation projects</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-8xl">

                {projectsData.map((project) => (
                    <div key={project.id} className="flex flex-col p-5 bg-white rounded-2xl border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">

                        <div className="flex justify-between items-start mb-5">
                            <div className="flex justify-center items-center w-14 h-14 bg-[#FCFAEF] rounded-full">
                                <FileText className="text-[#CBA548]" size={26} strokeWidth={1.5} />
                            </div>

                            <span className={`px-3 py-1 text-xs font-medium border rounded-full
    ${project?.status === "Active"
                                    ? "text-green-600 bg-green-50 border-green-400"
                                    : project?.status === "Running"
                                        ? "text-blue-600 bg-blue-50 border-blue-400"
                                        : "text-gray-500 bg-gray-50 border-gray-300"
                                }`}>
                                {project.status}
                            </span>
                        </div>

                        <div className="mb-6">
                            <h3 className="text-base font-semibold text-[#1E293B]">
                                {project.title}
                            </h3>
                            <p className="text-[15px] text-slate-500 mt-1">
                                {project.blogs} Blogs
                            </p>
                        </div>

                        <div className="flex gap-3 mt-auto">
                            <button className="flex flex-1 justify-center items-center py-2.5 px-4 text-[15px] font-medium text-[#334155] bg-white border border-[#E2E8F0] rounded-xl hover:bg-slate-50 gap-2">
                                Open Sheet <ArrowUpRight size={18} />
                            </button>

                            <button
                                onClick={

                                    () => router.push(`/blogs/${project.id}`)}
                                className="flex flex-1 gap-2 justify-center items-center py-2.5 px-4 text-[15px] font-medium text-white bg-[#CBA548] rounded-xl"
                            >
                                Manage
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="14"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M10 5H3" />
                                    <path d="M12 19H3" />
                                    <path d="M14 3v4" />
                                    <path d="M16 17v4" />
                                    <path d="M21 12h-9" />
                                    <path d="M21 19h-5" />
                                    <path d="M21 5h-7" />
                                    <path d="M8 10v4" />
                                    <path d="M8 12H3" />
                                </svg>
                            </button>
                        </div>

                    </div>
                ))}

            </div>
        </>
    );
};

export default TableSection
