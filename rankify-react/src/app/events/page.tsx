"use client";
 
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Filter } from "lucide-react";
 
export default function CreateEventPage() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  // ✅ SINGLE FORM DATA STATE
  const [formData, setFormData] = useState({
    eventType: "",
    eventSummary: "",
    zoomId: "",
    startdate: "",
    enddate: "",
    starttime: "",
    endtime: "",
    eventLink: "",
    duration: "",
    jobTitles: [] as string[],
    jobPositions: [] as string[],
    targetLocations: [] as string[],
    welcomeMessage: "Hi {name},", // default welcome message
    thankYouMessage: `Thank you for attending {event_title}.\n\nYou can watch the recording here: {session_link}\n\nBest regards`, // default thank you message
  });
 
  // ✅ GENERIC INPUT HANDLER
  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
 
  // ✅ HANDLER FOR MULTI-SELECT DROPDOWNS
  const handleAudience = (type: "jobTitles" | "jobPositions" | "targetLocations", value: string) => {
    if (!value) return;
    setFormData((prev) => {
      if (prev[type].includes(value)) return prev;
      return {
        ...prev,
        [type]: [...prev[type], value],
      };
    });
  };
 
  const removeAudience = (type: "jobTitles" | "jobPositions" | "targetLocations", value: string) => {
    setFormData((prev) => ({
      ...prev,
      [type]: prev[type].filter((item: any) => item !== value),
    }));
  };
 
  // ✅ SUBMIT FUNCTION
  const handleSubmit = () => {
    console.log("FULL FORM DATA:", formData);
  };
 
  return (
    <div className="p-3 md:p-6 space-y-4">
 
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-[#111827]">
            Create New Event
          </h1>
          <p className="text-sm text-[#6B7280] mt-1">
Configure event details, audience filters and scheduling parameters.
 
 
          </p>
        </div>
 
        {/* DROPDOWN MENU */}
        <div className="relative w-full md:w-auto">
          <button
            onClick={() => setOpen(!open)}
            className="w-full md:w-auto flex items-center justify-center gap-2 bg-white hover:bg-gray-200 text-gray-700 px-5 py-3 rounded-xl shadow-sm transition"
          >
            <Filter className="w-4 h-6" />
            <span className="text-sm font-medium">Create New Event</span>
          </button>
 
          {open && (
            <div className="absolute right-0 mt-2 w-52 bg-white border rounded-lg shadow-md z-50">
              <button
                onClick={() => {
                  router.push("/events");
                  setOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                Create New Event
              </button>
 
              <button
                onClick={() => {
                  router.push("/events/create");
                  setOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                Event Dashboard
              </button>
            </div>
          )}
        </div>
      </div>
 
      {/* ===== ALL CONTENT START ===== */}
      <div className="space-y-6">
 
        {/* Manage Target Audience */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-4 md:p-6">
          <h2 className="text-base font-semibold text-[#374151] mb-6">
            Manage Target audience Options
          </h2>
 
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-4 md:p-6">
          <h2 className="text-base font-semibold text-[#374151] mb-4">
            Event Type
          </h2>
 
          <input
            name="eventType"
            value={formData.eventType}
            onChange={handleChange}
            className="w-full mb-4 bg-[#F3F4F6] border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm"
          />
 
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {["Start Date", "End Date", "Start Time", "End Time"].map((item) => {
              const key = item.replace(" ", "").toLowerCase() as keyof typeof formData;
              return (
              <div key={item}>
                <label className="text-sm text-[#6B7280]">{item}</label>
                <input
                  type={item.includes("Time") ? "time" : "date"}
                  name={key}
                  value={formData[key] || ""}
                  onChange={handleChange}
                  className="w-full mt-2 bg-[#F3F4F6] border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm"
                />
              </div>
              );
            })}
          </div>
 
          <div className="mt-4">
            <label className="text-sm text-[#6B7280]">Event Meet/Team Link</label>
            <input
              name="eventLink"
              value={formData.eventLink}
              onChange={handleChange}
              className="w-full mt-2 bg-[#F3F4F6] border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm"
            />
          </div>
 
          <div className="mt-4">
            <label className="text-sm text-[#6B7280]">Duration</label>
            <input
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full mt-2 bg-[#F3F4F6] border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm"
            />
          </div>
 
          <div className="mt-4">
            <label className="text-sm text-[#6B7280]">Event Summary</label>
            <textarea
              name="eventSummary"
              value={formData.eventSummary}
              onChange={handleChange}
              className="w-full mt-2 h-28 bg-[#F3F4F6] border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm"
            />
          </div>
        </div>
 
        {/* Target Audience */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-4 md:p-6">
          <h2 className="text-base font-semibold text-[#374151] mb-5">
            Target Audience
          </h2>
 
          <div className="space-y-4">
            {/* Job Titles */}
            <div>
              <label className="text-sm text-[#6B7280]">Job Titles</label>
              <select onChange={(e) => handleAudience("jobTitles", e.target.value)} className="w-full mt-2 bg-[#F3F4F6] border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm">
                <option value="">Select Job Titles</option>
                <option>Marketing Manager</option>
                <option>Producter Designer</option>
                <option>Growth Lead</option>
              </select>
              <div className="flex gap-2 mt-2">
                {formData.jobTitles.map((item) => (
                  <div key={item} className="bg-gray-200 px-2 py-1 rounded">
                    {item} <button onClick={() => removeAudience("jobTitles", item)}>×</button>
                  </div>
                ))}
              </div>
            </div>
 
            {/* Job Positions */}
            <div>
              <label className="text-sm text-[#6B7280]">Job Positions</label>
              <select onChange={(e) => handleAudience("jobPositions", e.target.value)} className="w-full mt-2 bg-[#F3F4F6] border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm">
                <option value="">Select Job Positions</option>
                <option>Senior</option>
                <option>Mid-level</option>
                <option>Entry</option>
              </select>
              <div className="flex gap-2 mt-2">
                {formData.jobPositions.map((item) => (
                  <div key={item} className="bg-gray-200 px-2 py-1 rounded">
                    {item} <button onClick={() => removeAudience("jobPositions", item)}>×</button>
                  </div>
                ))}
              </div>
            </div>
 
            {/* Target Locations */}
            <div>
              <label className="text-sm text-[#6B7280]">Target Locations</label>
              <select onChange={(e) => handleAudience("targetLocations", e.target.value)} className="w-full mt-2 bg-[#F3F4F6] border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm">
                <option value="">Select Locations</option>
                <option>North America</option>
                <option>Europe</option>
                <option>APAC</option>
              </select>
              <div className="flex gap-2 mt-2">
                {formData.targetLocations.map((item) => (
                  <div key={item} className="bg-gray-200 px-2 py-1 rounded">
                    {item} <button onClick={() => removeAudience("targetLocations", item)}>×</button>
                  </div>
                ))}
              </div>
            </div>
 
            {/* Zoom Webinar ID */}
            <div>
              <label className="text-sm text-[#6B7280]">Zoom Webinar ID</label>
              <input
                name="zoomId"
                value={formData.zoomId}
                onChange={handleChange}
                placeholder="e.g. 8124567890"
                className="w-full mt-2 bg-[#F3F4F6] border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm"
              />
            </div>
          </div>
        </div>
 
        {/* Welcome Message */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-4 md:p-6">
          <h2 className="text-base font-semibold text-[#374151] mb-4">
            Welcome Message / First Time Prompt
          </h2>
 
          <input
            name="welcomeMessage"
            value={formData.welcomeMessage}
            onChange={handleChange}
            placeholder="Hi {name},"
            className="w-full mb-4 bg-[#F3F4F6] border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm"
          />
 
          <p className="text-xs text-[#9CA3AF] mb-2">Insert Field</p>
 
          <div className="flex flex-wrap gap-2 mb-4">
            {["Add (name)", "Add (event_link)", "Add (button_attending_link)"].map((btn, i) => (
              <button key={i} className="px-3 py-1 text-xs border border-[#E5E7EB] rounded-md bg-white text-[#374151]">
                {btn}
              </button>
            ))}
          </div>
 
          <textarea
            name="welcomeMessage"
            value={formData.welcomeMessage}
            onChange={handleChange}
            className="w-full h-32 bg-[#F3F4F6] border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm"
          />
        </div>
 
        {/* Thank You Email */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-4 md:p-6">
          <h2 className="text-base font-semibold text-[#374151] mb-4">
            Thank You Email Template
          </h2>
 
          <textarea
            name="thankYouMessage"
            value={formData.thankYouMessage}
            onChange={handleChange}
            className="w-full h-32 bg-[#F3F4F6] border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm"
          />
 
          <p className="text-xs text-[#9CA3AF] mb-2">Insert Field</p>
 
          <div className="flex flex-wrap gap-2 mb-4">
            {["Add (name)", "Add (event_link)", "Add (button_attending_link)"].map((btn, i) => (
              <button key={i} className="px-3 py-1 text-xs border border-[#E5E7EB] rounded-md bg-white text-[#374151]">
                {btn}
              </button>
            ))}
          </div>
        </div>
 
        {/* SUBMIT */}
        <button onClick={handleSubmit} className="w-full md:w-auto bg-[#CFA935] text-white text-sm px-6 py-3 rounded-full">
          Submit Event
        </button>
 
      </div>
    </div>
  );
}
 
 