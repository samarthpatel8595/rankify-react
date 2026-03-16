"use client";

import { useState } from "react"; 

export default function CreateEventPage() {
  const [jobTitle, setJobTitle] = useState("");

  return (
    <div className="p-6 space-y-6">  

       {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-800">
            Create New Event
          </h1>
 
          <p className="text-sm text-gray-500">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </p>
        </div>
 
 
        {/* Manage Target Audience */}
        <div className="bg-white border border-[#E6E8EC] rounded-xl p-6 mb-6 shadow-sm">
 
          <h2 className="font-semibold text-gray-700 mb-5">
            Manage Target audience Options
          </h2>
 
          <div className="grid grid-cols-3 gap-6">
 
            <div>
              <label className="text-sm text-gray-800">Job Titles</label>
 
              <input
                placeholder="New Job Title"
                className="w-full mt-2 bg-[#F1F2F4] border border-[#E6E8EC] rounded-lg px-3 py-2"
              />
 
              <p className="text-[#CFA935] text-sm mt-3 cursor-pointer">
                Add Job Title
              </p>
            </div>
 
            <div>
              <label className="text-sm text-gray-600">Job Positions</label>
 
              <input
                placeholder="New Job Position"
                className="w-full mt-2 bg-[#F1F2F4] border border-[#E6E8EC] rounded-lg px-3 py-2"
              />
 
              <p className="text-[#CFA935] text-sm mt-3 cursor-pointer">
                Add Job Position
              </p>
            </div>
 
            <div>
              <label className="text-sm text-gray-600">Target Locations</label>
 
              <input
                placeholder="New Location"
                className="w-full mt-2 bg-[#F1F2F4] border border-[#E6E8EC] rounded-lg px-3 py-2"
              />
 
              <p className="text-[#CFA935] text-sm mt-3 cursor-pointer">
                Add Location
              </p>
            </div>
 
          </div>
        </div>
 
 
        {/* Event Details */}
        <div className="bg-white border border-[#E6E8EC] rounded-xl p-6 mb-6 shadow-sm">
 
          <label className="text-sm text-gray-600">
            Event Type
          </label>
 
          <input className="w-full mt-2 mb-4 bg-[#F1F2F4] border border-[#E6E8EC] rounded-lg px-3 py-2"/>
 
          <div className="grid grid-cols-2 gap-6">
 
            <div>
              <label className="text-sm text-gray-600">Start Date</label>
              <input type="date" className="w-full mt-2 bg-[#F1F2F4] border border-[#E6E8EC] rounded-lg px-3 py-2"/>
            </div>
 
            <div>
              <label className="text-sm text-gray-600">End Date</label>
              <input type="date" className="w-full mt-2 bg-[#F1F2F4] border border-[#E6E8EC] rounded-lg px-3 py-2"/>
            </div>
 
            <div>
              <label className="text-sm text-gray-600">Start Time</label>
              <input type="time" className="w-full mt-2 bg-[#F1F2F4] border border-[#E6E8EC] rounded-lg px-3 py-2"/>
            </div>
 
            <div>
              <label className="text-sm text-gray-600">End Time</label>
              <input type="time" className="w-full mt-2 bg-[#F1F2F4] border border-[#E6E8EC] rounded-lg px-3 py-2"/>
            </div>
 
          </div>
 
          <div className="mt-4">
            <label className="text-sm text-gray-600">Event Meet/Team Link</label>
            <input className="w-full mt-2 bg-[#F1F2F4] border border-[#E6E8EC] rounded-lg px-3 py-2"/>
          </div>
 
          <div className="mt-4">
            <label className="text-sm text-gray-600">Duration</label>
            <input className="w-full mt-2 bg-[#F1F2F4] border border-[#E6E8EC] rounded-lg px-3 py-2"/>
          </div>
 
          <div className="mt-4">
            <label className="text-sm text-gray-600">Event Summary</label>
            <textarea className="w-full mt-2 h-24 bg-[#F1F2F4] border border-[#E6E8EC] rounded-lg px-3 py-2"/>
          </div>
 
        </div>
 
 
        {/* Target Audience */}
        <div className="bg-white border border-[#E6E8EC] rounded-xl p-6 mb-6 shadow-sm">
 
          <h2 className="font-semibold text-gray-700 mb-4">
            Target Audience
          </h2>
 
          <div className="space-y-4">
 
            <select className="w-full bg-[#F1F2F4] border border-[#E6E8EC] rounded-lg px-3 py-2">
              <option>Job Titles</option>
            </select>
 
            <select className="w-full bg-[#F1F2F4] border border-[#E6E8EC] rounded-lg px-3 py-2">
              <option>Job Positions</option>
            </select>
 
            <select className="w-full bg-[#F1F2F4] border border-[#E6E8EC] rounded-lg px-3 py-2">
              <option>Target Locations</option>
            </select>
 
            <input
              placeholder="e.g. 8124567890"
              className="w-full bg-[#F1F2F4] border border-[#E6E8EC] rounded-lg px-3 py-2"
            />
 
          </div>
 
        </div>
 
 
        {/* Submit */}
        <button className="bg-[#CFA935] text-white px-6 py-2 rounded-lg shadow hover:bg-[#b89228]">
          Submit Event
        </button>
 
 

    </div>
  );
}