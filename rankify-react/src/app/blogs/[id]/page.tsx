

"use client";
import { Archive, FileCode, FileImage, FileText } from "lucide-react";
import { useParams } from "next/navigation";

import {
  ArrowUpRight,
  CheckCircle2,
  AlertTriangle,
  Search,
  SlidersHorizontal,
  Download,
  Loader2,
} from "lucide-react";
import React from "react";
const projectsData = [
  {
    id: 1, title: "Adoptify AI", status: "Active", blogs: 120, description: "AI-powered blog generation for Adoptify AI", activities: [{
      id: 1,
      type: "success",
      message: "Blog generated: 'Top 10 AI Tools for 2025'",
      time: "2 Min Ago",
    }]
  },
  {
    id: 2, title: "AI CERTs", status: "Running", blogs: 85, description: "Certification program for AI professionals", activities: [{
      id: 2,
      type: "success",
      message: "Blog published: 'Machine Learning Basics'",
      time: "5 Min Ago",
    }]
  },
  {
    id: 3, title: "AI News Daily", status: "Active", blogs: 210, description: "Daily news and updates about AI", activities: [{
      id: 3,
      type: "progress",
      message: "Blog generation in progress: 'Future of LLMs'",
      time: "Just Now",
    }]
  },
  {
    id: 4, title: "TechVault Pro", status: "Active", blogs: 64, description: "Professional tech vault for developers", activities: [{
      id: 4,
      type: "success",
      message: "Blog generated: 'AI in Healthcare'",
      time: "12 Min Ago",
    }]
  },
  { id: 5, title: "GreenEarth Blog", status: "Paused", blogs: 42, description: "Blog about environmental sustainability", activities: [] },
  { id: 6, title: "FinScope AI", status: "Active", blogs: 156, description: "AI-driven financial analysis tool", activities: [] },
];
const files = [
  {
    id: 1,
    name: "Project_Proposal.pdf",
    size: "2.4 MB",
    modified: "2 hours ago",
    uploaded: "2 December, 2025",
    icon: FileText,
    iconColor: "text-sunray",
    iconBg: "bg-sunray/10",
  },
  {
    id: 2,
    name: "Design_Mockups.fig",
    size: "8.1 MB",
    modified: "5 hours ago",
    uploaded: "3 November, 2025",
    icon: FileCode,
    iconColor: "text-sky-500",
    iconBg: "bg-sunray/10",
  },
  {
    id: 3,
    name: "Brand_Assets.zip",
    size: "15.3 MB",
    modified: "Yesterday",
    uploaded: "14 October, 2025",
    icon: Archive,
    iconColor: "text-amber-500",
    iconBg: "bg-sunray/10",
  },
  {
    id: 4,
    name: "Screenshot_2024.png",
    size: "1.2 MB",
    modified: "2 days ago",
    uploaded: "9 October, 2025",
    icon: FileImage,
    iconColor: "text-emerald-500",
    iconBg: "bg-sunray/10",
  },
  {
    id: 5,
    name: "API_Documentation.md",
    size: "456 KB",
    modified: "3 days ago",
    uploaded: "4 September, 2025",
    icon: FileText,
    iconColor: "text-slate-600",
    iconBg: "bg-sunray/10",
  },
];

// const projectData = {


//   name: "Adoptify AI",
//   status: "Active",
//   description: "AI-powered blog generation for Adoptify AI",
//   stats: {
//     completed: 108,
//     failed: 3,
//   },
//   activities: [
//     {
//       id: 1,
//       type: "success",
//       message: "Blog generated: 'Top 10 AI Tools for 2025'",
//       time: "2 Min Ago",
//     },
//     {
//       id: 2,
//       type: "success",
//       message: "Blog published: 'Machine Learning Basics'",
//       time: "5 Min Ago",
//     },
//     {
//       id: 3,
//       type: "progress",
//       message: "Blog generation in progress: 'Future of LLMs'",
//       time: "Just Now",
//     },
//     {
//       id: 4,
//       type: "success",
//       message: "Blog generated: 'AI in Healthcare'",
//       time: "12 Min Ago",
//     },
//   ],
// };


export default function Page() {
  const [openFilter, setOpenFilter] = React.useState(false);
  const filterOptions = ["Today", "Weekly", "Monthly", "Yearly"];
  const [selectedFilter, setSelectedFilter] = React.useState("Yearly");
  const params = useParams();
  const id = Number(params.id);


  const projectData = projectsData.find(p => p.id === id);
  // ✅ Always protect
  if (!projectData) {
    return <h1>Project not found</h1>;
  }

  return (
    <div className="min-h-screen  space-y-6 ">
      <div className="max-w-6xl mx-auto">

        {/* 🔥 HEADER */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-semibold text-slate-800">
                {projectData?.title || "Project Title"}
              </h1>
              <span className="px-3 py-1 text-xs font-medium text-green-600 bg-green-100 border border-green-400 rounded-full">
                {projectData?.status}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              {projectData?.description}
            </p>
          </div>

          <button type="button" className="inline-flex items-center gap-2 rounded-2xl border border-platinum bg-white px-4 py-3 text-sm text-independence hover:bg-anti-flash">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-arrow-up-right"
            >
              <path d="M7 7h10v10"></path>
              <path d="M7 17 17 7"></path>
            </svg>Open Google Sheet</button>
        </div>

        {/* 🔥 STATS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">

          {/* Completed */}
          <div className="flex items-center gap-3 bg-white p-4 rounded-2xl shadow">
            <div className="w-8 h-8 flex items-center justify-center bg-yellow-50 rounded-full">
              <CheckCircle2 className="text-yellow-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Completed Blogs</p>
              <p className="text-2xl font-semibold text-yellow-600">
                {projectData?.blogs}
              </p>
            </div>
          </div>

          {/* Failed */}
          <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow">
            <div className="w-8 h-8 flex items-center justify-center bg-yellow-50 rounded-full">
              <AlertTriangle className="text-yellow-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Failed Jobs</p>
              <p className="text-2xl font-semibold text-yellow-600">
                {projectData?.id || 0}
              </p>
            </div>
          </div>
        </div>

        {/* 🔥 ACTIVITY LOG */}
        <div className="bg-white rounded-2xl shadow overflow-hidden">

          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-200">
            <h2 className="text-2xl font-semibold">Activity Log</h2>

            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-2.5 text-gray-200" size={16} />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-8 pr-3 py-2 border border-gray-200 rounded-xl text-sm 
             focus:outline-none focus:ring-0 focus:border-gray-200"
                />
              </div>

              <button
                onClick={() => setOpenFilter(true)}
                className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-xl text-xs
             focus:outline-none focus:ring-0"
              >
                <SlidersHorizontal size={14} />
                {selectedFilter}
              </button>
              {openFilter && (
                <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">

                  <div className="bg-white w-[400px] rounded-2xl shadow-lg p-6 relative">

                    {/* Header */}
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-semibold">Filter by Date</h2>
                      <button onClick={() => { setOpenFilter(false); }}>✕</button>
                    </div>

                    {/* Date Inputs */}
                    <div className="flex gap-3 mb-4">
                      <input
                        type="date"
                        className="w-full border rounded-lg p-2 text-sm"
                      />
                      <input
                        type="date"
                        className="w-full border rounded-lg p-2 text-sm"
                      />
                    </div>

                    {/* Options */}
                    <div className="flex flex-col gap-3">
                      {filterOptions.map((item) => (
                        <button
                          key={item}
                          className="w-full py-2 rounded-lg bg-gray-100 hover:bg-yellow-100 text-sm"
                          onClick={() => {
                            setSelectedFilter(item);
                            setOpenFilter(false);
                          }}
                        >
                          {item}
                        </button>
                      ))}
                    </div>

                  </div>
                </div>
              )}


              <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-xl text-xs 
                   hover:bg-gray-50 transition 
                   focus:outline-none focus:ring-0">
                <Download size={14} />
                Export CSV
              </button>
            </div>
          </div>

          {/* List */}
          <div>
            {projectData?.activities.map((item: any) => (
              <div
                key={item.id}
                className="flex justify-between items-center p-5 border-b border-gray-200 hover:bg-gray-50"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 flex items-center justify-center rounded-xl ${item.type === "success"
                      ? "bg-yellow-50"
                      : "bg-blue-50"
                      }`}
                  >
                    {item.type === "success" ? (
                      <CheckCircle2 className="text-yellow-500" size={18} />
                    ) : (
                      <Loader2 className="text-blue-500 animate-spin" size={18} />
                    )}
                  </div>

                  <p className="text-sm text-gray-700">
                    {item.message}
                  </p>
                </div>

                <span className="text-sm text-gray-500">
                  {item.time}
                </span>
              </div>
            ))}
            <div className="p-4 flex justify-between items-center text-sm text-gray-500 border-b border-gray-200">
              <span>
                Showing 1-1 of ~1 results
              </span>

              <div className="flex items-center gap-2">
                <button className="px-2 py-1 text-gray-400 cursor-not-allowed">
                  Prev
                </button>

                <span className="px-3 py-1 bg-yellow-500 text-white rounded-md">
                  1
                </span>

                <button className="px-2 py-1 text-gray-400 cursor-not-allowed">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
