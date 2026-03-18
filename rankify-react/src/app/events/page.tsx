"use client";

import { useState } from "react"; 
import { Filter } from "lucide-react";
export default function CreateEventPage() {
  const [jobTitle, setJobTitle] = useState("");

  return (
    <div className="p-2 space-y-2">  

      {/* Page Title */}
      <div className="mb-4 flex items-center justify-between">
  
  {/* Left Side */}
  <div>
    <h1 className="text-2xl font-semibold text-[#111827]">
      Create New Event
    </h1>
    <p className="text-sm text-[#6B7280] mt-1">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
    </p>
  </div>

  {/* Right Side Button */}
  <button className="flex items-center gap-2 bg-white hover:bg-gray-200 text-gray-700 px-5 py-3 rounded-xl shadow-sm transition">
    <Filter className="w-4 h-6" />
    <span className="text-sm font-medium">Create New Event</span>
  </button>

</div>

      <div className="space-y-6">

        {/* Manage Target Audience */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-6">
          <h2 className="text-base font-semibold text-[#374151] mb-6">
            Manage Target audience Options
          </h2>

          <div className="grid grid-cols-3 gap-6 ">
            {[
              { label: "Job Titles", placeholder: "New Job Title", btn: "Add Job Title" },
              { label: "Job Positions", placeholder: "New Job Position", btn: "Add Job Position" },
              { label: "Target Locations", placeholder: "New Location", btn: "Add Location" }
            ].map((item, i) => (
              <div key={i}>
                <label className="text-sm text-[#6B7280] font-bold">{item.label}</label>

                <input
                  placeholder={item.placeholder}
                  className="w-full mt-2 bg-[#F3F4F6] border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm"
                />

                <p className="text-[#CFA935] text-sm mt-3 cursor-pointer">
                  {item.btn}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Event Type */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-6">
          <h2 className="text-base font-semibold text-[#374151] mb-4">
            Event Type
          </h2>

          <input className="w-full mb-4 bg-[#F3F4F6] border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm" />

          <div className="grid grid-cols-2 gap-6">
            {["Start Date", "End Date", "Start Time", "End Time"].map((item, i) => (
              <div key={i}>
                <label className="text-sm text-[#6B7280]">{item}</label>
                <input
                  type={item.includes("Time") ? "time" : "date"}
                  className="w-full mt-2 bg-[#F3F4F6] border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm"
                />
              </div>
            ))}
          </div>

          <div className="mt-4">
            <label className="text-sm text-[#6B7280]">Event Meet/Team Link</label>
            <input className="w-full mt-2 bg-[#F3F4F6] border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm" />
          </div>

          <div className="mt-4">
            <label className="text-sm text-[#6B7280]">Duration</label>
            <input className="w-full mt-2 bg-[#F3F4F6] border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm" />
          </div>

          <div className="mt-4">
            <label className="text-sm text-[#6B7280]">Event Summary</label>
            <textarea className="w-full mt-2 h-28 bg-[#F3F4F6] border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm" />
          </div>
        </div>

        {/* Target Audience */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-6">
          <h2 className="text-base font-semibold text-[#374151] mb-5">
            Target Audience
          </h2>

          <div className="space-y-4">
            {["Job Titles", "Job Positions", "Target Locations"].map((item, i) => (
              <div key={i}>
                <label className="text-sm text-[#6B7280]">{item}</label>
                <select className="w-full mt-2 bg-[#F3F4F6] border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm">
                  <option>Select {item}</option>
                </select>
              </div>
            ))}

            <div>
              <label className="text-sm text-[#6B7280]">Zoom Webinar ID</label>
              <input
                placeholder="e.g. 8124567890"
                className="w-full mt-2 bg-[#F3F4F6] border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Welcome Message */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-6">
          <h2 className="text-base font-semibold text-[#374151] mb-4">
            Welcome Message / First Time Prompt
          </h2>

          <input
            placeholder="Hi {name},"
            className="w-full mb-4 bg-[#F3F4F6] border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm"
          />

          <p className="text-xs text-[#9CA3AF] mb-2">Insert Field</p>

          <div className="flex gap-2 mb-4 flex-wrap">
            {["Add (name)", "Add (event_link)", "Add (button_attending_link)"].map((btn, i) => (
              <button key={i} className="px-3 py-1 text-xs border border-[#E5E7EB] rounded-md bg-white text-[#374151]">
                {btn}
              </button>
            ))}
          </div>

          <textarea
            className="w-full h-32 bg-[#F3F4F6] border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm"
            defaultValue={`Thanks for registering for {event_title}. We are excited to have you!

Best,
The Team`}
          />
        </div>

        {/* Thank You Email */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-6">
          <h2 className="text-base font-semibold text-[#374151] mb-4">
            Thank You Email Template
          </h2>

          <input
            placeholder="Hi {name},"
            className="w-full mb-4 bg-[#F3F4F6] border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm"
          />

          <p className="text-xs text-[#9CA3AF] mb-2">Insert Field</p>

          <div className="flex gap-2 mb-4 flex-wrap">
            {["Add (name)", "Add (event_link)", "Add (button_attending_link)"].map((btn, i) => (
              <button key={i} className="px-3 py-1 text-xs border border-[#E5E7EB] rounded-md bg-white text-[#374151]">
                {btn}
              </button>
            ))}
          </div>

          <textarea
            className="w-full h-32 bg-[#F3F4F6] border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm"
            defaultValue={`Thank you for attending {event_title}.

You can watch the recording here: {session_link}

Best regards,`}
          />
        </div>

        {/* Submit */}
        <button className="bg-[#CFA935] text-white text-sm px-6 py-2 rounded-full shadow-sm hover:bg-[#b89228]">
          Submit Event
        </button>

      </div>
    </div>           
  );
}



