"use client";

import { useState } from "react";

export default function CreateEventPage() {
  const [jobTitle, setJobTitle] = useState("");

  return (
    <div className="p-6 space-y-6">

      <h1 className="text-2xl font-semibold">Create New Event</h1>

      {/* Target Audience */}
      <div className="bg-white rounded-lg shadow p-5">
        <h2 className="font-semibold mb-4">
          Manage Target audience Options
        </h2>

        <div className="grid grid-cols-3 gap-4">

          <div className="flex flex-col">
            <label className="text-sm mb-1">Job Titles</label>
            <input
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="New Job Title"
              className="w-full border p-2 rounded"
            />
            <label className="text-[#CFA935] mt-2">Add Job Title</label>
          </div>

          <div className="flex flex-col">
            <label className="text-sm mb-1">Job Positions</label>
            <input
              placeholder="New Job Position"
              className="w-full border p-2 rounded"
            />
            <label className="text-[#CFA935] mt-2">Add Job Positions</label>
          </div>

          <div className="flex flex-col">
            <label className="text-sm mb-1">Target Locations</label>
            <input
              placeholder="New Location"
              className="w-full border p-2 rounded"
            />
            <label className="text-[#CFA935] mt-2">New Location</label>
          </div>

        </div>
      </div>

      {/* Event Details */}
      <div className="bg-white rounded-lg shadow p-5 space-y-4">

        <h2 className="font-semibold">Event Details</h2>

        <div className="flex flex-col">
          <label className="text-sm mb-1">Event Type</label>
          <input
            placeholder=""
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">

          <div className="flex flex-col">
            <label className="text-sm mb-1">Start Date</label>
            <input type="date" className="border p-2 rounded" />
          </div>

          <div className="flex flex-col">
            <label className="text-sm mb-1">End Date</label>
            <input type="date" className="border p-2 rounded" />
          </div>

          <div className="flex flex-col">
            <label className="text-sm mb-1">Start Time</label>
            <input type="time" className="border p-2 rounded" />
          </div>

          <div className="flex flex-col">
            <label className="text-sm mb-1">End Time</label>
            <input type="time" className="border p-2 rounded" />
          </div>

        </div>

        <div className="flex flex-col">
          <label className="text-sm mb-1">Event Meet/Team Link</label>
          <input className="w-full border p-2 rounded" />
        </div>

        <div className="flex flex-col">
          <label className="text-sm mb-1">Duration</label>
          <input className="w-full border p-2 rounded" />
        </div>

        <div className="flex flex-col">
          <label className="text-sm mb-1">Event Summary</label>
          <textarea className="w-full border p-2 rounded"></textarea>
        </div>

      </div>

      {/* Submit */}
      <button className="bg-yellow-500 text-white px-6 py-2 rounded">
        Submit Event
      </button>

    </div>
  );
}