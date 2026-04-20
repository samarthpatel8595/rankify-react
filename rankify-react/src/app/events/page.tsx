"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Filter } from "lucide-react";
import { createEvent } from "@/services/event";

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
    welcomeMessage: "", // default welcome message
    thankYouMessage: "", // default thank you message
  });
  const [errors, setErrors] = useState<any>({});


  // ✅ GENERIC INPUT HANDLER
  const handleChange = (e: any) => {
  const { name, value } = e.target;

  // 👉 1. Update form first
  setFormData((prev) => {
    const updated = { ...prev, [name]: value };

    // 🔥 DATE + TIME VALIDATION (KEEP THIS SAFE)
    
    

    

    if (
      name === "starttime" &&
      updated.startdate === updated.enddate &&
      updated.endtime &&
      updated.endtime <= value
    ) {
      updated.endtime = "";
    }

    return updated;
  });

  // 👉 2. FIX: HANDLE ERRORS SEPARATELY (IMPORTANT)
  setErrors((prev: any) => {
    const newErrors = { ...prev };

    // ✅ START DATE
if (name === "startdate") {
  const today = new Date();
  const startDate = new Date(value);

  if (!value) newErrors.startdate = "Start date is required";
  else if (startDate < new Date(today.toDateString()))
    newErrors.startdate = "Start date cannot be in the past";
  else delete newErrors.startdate;
}

// ✅ END DATE
if (name === "enddate") {
  const startDate = new Date(formData.startdate);
  const endDate = new Date(value);

  if (!value) newErrors.enddate = "End date is required";
  else if (formData.startdate && endDate < startDate)
    newErrors.enddate = "End date cannot be before start date";
  else delete newErrors.enddate;
}

// ✅ START TIME
if (name === "starttime") {
  if (!value) newErrors.starttime = "Start time is required";
  else delete newErrors.starttime;
}

// ✅ END TIME
if (name === "endtime") {
  if (!value) {
    newErrors.endtime = "End time is required";
  } else if (
    formData.startdate === formData.enddate &&
    formData.starttime &&
    value <= formData.starttime
  ) {
    newErrors.endtime = "End time must be after start time";
  } else {
    delete newErrors.endtime;
  }
}

    if (name === "eventType") {
      if (!value) newErrors.eventType = "Event type is required";
      else if (value.trim().split(/\s+/).length < 3)
        newErrors.eventType = "Minimum 3 words required";
      else delete newErrors.eventType;
    }

    if (name === "eventSummary") {
      if (!value) newErrors.eventSummary = "Event summary is required";
      else delete newErrors.eventSummary;
    }

    if (name === "zoomId") {
      if (!value) newErrors.zoomId = "Zoom ID is required";
      else delete newErrors.zoomId;
    }

    if (name === "eventLink") {
  if (!value) {
    newErrors.eventLink = "Event link is required";
  } else if (
    !/^https:\/\/(meet\.google\.com)/.test(value)
  ) {
    newErrors.eventLink = "Enter valid Google link )";
  } else {
    delete newErrors.eventLink; // ✅ remove error when correct
  }
}

  if (name === "duration") {
  const val = value.trim();

  if (!val) {
    newErrors.duration = "Duration is required";
  } else if (!/^\d+\s*(hour|hours|minute|minutes)$/i.test(val)) {
    newErrors.duration = "Format: 1 Hour / 2 Hours / 30 Minutes";
  } else {
    delete newErrors.duration;
  }
}

    if (name === "welcomeMessage") {
      if (!value) newErrors.welcomeMessage = "Welcome message is required";
      else delete newErrors.welcomeMessage;
    }

    if (name === "thankYouMessage") {
      if (!value) newErrors.thankYouMessage = "Thank you message is required";
      else delete newErrors.thankYouMessage;
    }

    return newErrors;
  });
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

    // ✅ REMOVE ERROR WHEN USER SELECTS
    setErrors((prev: any) => ({
      ...prev,
      [type]: "",
    }));
  };

  const removeAudience = (type: "jobTitles" | "jobPositions" | "targetLocations", value: string) => {
    setFormData((prev) => ({
      ...prev,
      [type]: prev[type].filter((item: any) => item !== value),
    }));
  };
  // ✅ INSERT TEXT INTO TEXTAREA
  const insertText = (field: "welcomeMessage" | "thankYouMessage", value: string) => {
  setFormData((prev) => {
    const updatedValue = prev[field] + value;

    // ✅ REMOVE ERROR WHEN USER INSERTS TEXT
    setErrors((prevErr: any) => {
      const newErrors = { ...prevErr };

      if (updatedValue.trim()) {
        delete newErrors[field];
      }

      return newErrors;
    });

    return {
      ...prev,
      [field]: updatedValue,
    };
  });
};


  const validateForm = () => {
    const newErrors: any = {};

    if (!formData.eventType) {
      newErrors.eventType = "Event type is required";
    } else if (formData.eventType.trim().split(/\s+/).length < 3) {
      newErrors.eventType = "Minimum 3 words required";
    }
    if (!formData.eventSummary) newErrors.eventSummary = "Event summary is required";
    if (!formData.zoomId) newErrors.zoomId = "Zoom ID is required";

    if (!formData.startdate) newErrors.startdate = "Start date is required";
    if (!formData.enddate) newErrors.enddate = "End date is required";
    if (!formData.starttime) newErrors.starttime = "Start time is required";
    if (!formData.endtime) newErrors.endtime = "End time is required";

    // 🔥 FINAL DATE/TIME VALIDATION

const today = new Date();
const startDate = new Date(formData.startdate);
const endDate = new Date(formData.enddate);

// ❌ Past start date
if (formData.startdate && startDate < new Date(today.toDateString())) {
  newErrors.startdate = "Start date cannot be in the past";
}

// ❌ End date before start
if (formData.startdate && formData.enddate && endDate < startDate) {
  newErrors.enddate = "End date cannot be before start date";
}

// ❌ Same date wrong time
if (
  formData.startdate &&
  formData.enddate &&
  formData.starttime &&
  formData.endtime &&
  formData.startdate === formData.enddate
) {
  const start = new Date(`1970-01-01T${formData.starttime}`);
  const end = new Date(`1970-01-01T${formData.endtime}`);

  if (end <= start) {
    newErrors.endtime = "End time must be after start time";
  }
}

    if (!formData.eventLink) {
      newErrors.eventLink = "Event link is required";
    }else if (
  !/^https:\/\/(meet\.google\.com)/.test(formData.eventLink)
) {
  newErrors.eventLink = "Enter valid Google link";
}
   if (!formData.duration) {
  newErrors.duration = "Duration is required";
} else if (!/^\d+\s(hour|hours|minute|minutes)$/i.test(formData.duration)) {
  newErrors.duration = "Format: 1 Hour / 2 Hours / 30 Minutes";
}

    if (formData.jobTitles.length === 0)
      newErrors.jobTitles = "Select at least one job title";

    if (formData.jobPositions.length === 0)
      newErrors.jobPositions = "Select at least one job position";

    if (formData.targetLocations.length === 0)
      newErrors.targetLocations = "Select at least one location";

    if (!formData.welcomeMessage)
      newErrors.welcomeMessage = "Welcome message is required";

    if (!formData.thankYouMessage)
      newErrors.thankYouMessage = "Thank you message is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  

  // ✅ SUBMIT FUNCTION
  const handleSubmit = async () => {
    const isValid = validateForm();

    if (!isValid) return;

    try {
      const payload = {
        topic: formData.eventType,
        event_date: formData.startdate,
        event_time: formData.starttime + ":00",
        end_event_date: formData.enddate,
        end_event_time: formData.endtime + ":00",
        meeting_link: formData.eventLink,
        duration: formData.duration,
        summary: formData.eventSummary,
        job_titles: formData.jobTitles,
        job_positions: formData.jobPositions,
        target_locations: formData.targetLocations,
        zoom_webinar_id: formData.zoomId,
        welcome_message: formData.welcomeMessage,
        prompt_first_time: formData.welcomeMessage,
        thank_you_attendee_template: formData.thankYouMessage,
      };

      const res = await createEvent(payload);

      console.log(res);
      alert("Event Created Successfully ✅");
      router.push("/events");
    } catch (err) {
      console.log(err);
      alert("Error creating event ❌");
    }
  };

  // ✅ TIME OPTIONS (ADD HERE)
const generateTimeOptions = () => {
  const times = [];
  for (let i = 0; i < 24; i++) {
    for (let j = 0; j < 60; j += 30) {
      const hour = i.toString().padStart(2, "0");
      const min = j.toString().padStart(2, "0");
      times.push(`${hour}:${min}`);
    }
  }
  return times;
};

const timeOptions = generateTimeOptions();

const getEndTimeOptions = () => {
  if (formData.startdate !== formData.enddate) {
    return timeOptions;
  }
  return timeOptions.filter(
    (time) => !formData.starttime || time > formData.starttime
  );
};
  return (
    <div className="p-3 md:p-6 max-w-6xl mx-auto space-y-6">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
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
            <div className="absolute right-0 mt-2 w-full md:w-52 bg-white border rounded-lg shadow-md z-50">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
            className={`w-full bg-[#F3F4F6] border ${errors.eventType ? "border-red-500" : "border-[#E5E7EB]"
              } rounded-lg px-3 py-2`}
          />
          {errors.eventType && (
            <p className="text-red-500 text-sm mt-1">
              {errors.eventType}
            </p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: "Start Date", name: "startdate", type: "date" },
              { label: "End Date", name: "enddate", type: "date" },
              { label: "Start Time", name: "starttime", type: "time" },
              { label: "End Time", name: "endtime", type: "time" },
            ].map((item) => (
              <div key={item.name}>
                <label className="text-sm text-[#6B7280]">{item.label}</label>
                {item.type === "time" ? (
  <select
    name={item.name}
    value={formData[item.name as keyof typeof formData] || ""}
    onChange={handleChange}
    className="w-full mt-2 bg-[#F3F4F6] border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm"
  >
    <option value="">Select {item.label}</option>

    {(item.name === "endtime"
      ? getEndTimeOptions()
      : timeOptions
    ).map((time) => (
      <option key={time} value={time}>
        {time}
      </option>
    ))}
  </select>
) : (
  <input
    type={item.type}
    name={item.name}
    min={
      item.name === "startdate"
        ? new Date().toISOString().split("T")[0]
        : item.name === "enddate"
        ? formData.startdate || new Date().toISOString().split("T")[0]
        : undefined
    }
    value={formData[item.name as keyof typeof formData] || ""}
    onChange={handleChange}
    className="w-full mt-2 bg-[#F3F4F6] border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm"
  />
)}
                {errors[item.name] && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors[item.name]}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="mt-4">
            <label className="text-sm text-[#6B7280]">Event Meet/Team Link</label>
            <input
              name="eventLink"
              value={formData.eventLink}
              onChange={handleChange}
              className={`w-full mt-2 bg-[#F3F4F6] border ${errors.eventLink ? "border-red-500" : "border-[#E5E7EB]"
                } rounded-lg px-3 py-2 text-sm`}
            />

            {errors.eventLink && (
              <p className="text-red-500 text-sm mt-1">{errors.eventLink}</p>
            )}
          </div>

          <div className="mt-4">
            <label className="text-sm text-[#6B7280]">Duration</label>
            <input
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full mt-2 bg-[#F3F4F6] border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm"
            />
            {errors.duration && (
              <p className="text-red-500 text-sm mt-1">
                {errors.duration}
              </p>
            )}
          </div>

          <div className="mt-4">
            <label className="text-sm text-[#6B7280]">Event Summary</label>
            <textarea
              name="eventSummary"
              value={formData.eventSummary}
              onChange={handleChange}
              className={`w-full mt-2 h-28 bg-[#F3F4F6] border ${errors.eventSummary ? "border-red-500" : "border-[#E5E7EB]"
                } rounded-lg px-3 py-2 text-sm`}
            />

            {errors.eventSummary && (
              <p className="text-red-500 text-sm mt-1">
                {errors.eventSummary}
              </p>
            )}
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
              <select
                onChange={(e) => handleAudience("jobTitles", e.target.value)}
                className={`w-full mt-2 bg-[#F3F4F6] border ${errors.jobTitles ? "border-red-500" : "border-[#E5E7EB]"
                  } rounded-xl px-3 py-2 text-sm`}
              >
                <option value="">Select Job Titles</option>
                <option>Marketing Manager</option>
                <option>Producter Designer</option>
                <option>Growth Lead</option>
              </select>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.jobTitles.map((item) => (
                  <div key={item} className="bg-gray-200 px-2 py-1 rounded">
                    {item} <button onClick={() => removeAudience("jobTitles", item)}>×</button>
                  </div>
                ))}
              </div>
              {errors.jobTitles && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.jobTitles}
                </p>
              )}
            </div>

            {/* Job Positions */}
            <div>
              <label className="text-sm text-[#6B7280]">Job Positions</label>
              <select
                onChange={(e) => handleAudience("jobPositions", e.target.value)}
                className={`w-full mt-2 bg-[#F3F4F6] border ${errors.jobPositions ? "border-red-500" : "border-[#E5E7EB]"
                  } rounded-xl px-3 py-2 text-sm`}
              >                <option value="">Select Job Positions</option>
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
              {errors.jobPositions && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.jobPositions}
                </p>
              )}
            </div>

            {/* Target Locations */}
            <div>
              <label className="text-sm text-[#6B7280]">Target Locations</label>
              <select
                onChange={(e) => handleAudience("targetLocations", e.target.value)}
                className={`w-full mt-2 bg-[#F3F4F6] border ${errors.targetLocations ? "border-red-500" : "border-[#E5E7EB]"
                  } rounded-xl px-3 py-2 text-sm`}
              >                <option value="">Select Locations</option>
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
              {errors.targetLocations && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.targetLocations}
                </p>
              )}
            </div>

            {/* Zoom Webinar ID */}
            <div>
              <label className="text-sm text-[#6B7280]">Zoom Webinar ID</label>
              <input
                name="zoomId"
                value={formData.zoomId}
                onChange={handleChange}
                className={`w-full mt-2 bg-[#F3F4F6] border ${errors.zoomId ? "border-red-500" : "border-[#E5E7EB]"
                  } rounded-lg px-3 py-2 text-sm`}
              />

              {errors.zoomId && (
                <p className="text-red-500 text-sm mt-1">{errors.zoomId}</p>
              )}
            </div>
          </div>
        </div>

        {/* Welcome Message */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-4 md:p-6">
          <h2 className="text-base font-semibold text-[#374151] mb-4">
            Welcome Message / First Time Prompt
          </h2>


          <p className="text-xs text-[#9CA3AF] mb-2">Insert Field</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {[
              { label: "Add (name)", value: "{name}" },
              { label: "Add (event_link)", value: "{event_link}" },
              { label: "Add (button_attending_link)", value: "{button_attending_link}" }
            ].map((item, i) => (
              <button
                key={i}
                onClick={() => insertText("welcomeMessage", item.value)}
                className="px-3 py-1 text-xs border border-[#E5E7EB] rounded-md bg-white text-[#374151]"
              >
                {item.label}
              </button>
            ))}
          </div>

          <textarea
            name="welcomeMessage"
            value={formData.welcomeMessage}
            onChange={handleChange}
            placeholder={`Hi {name},

Thanks for registering for {event_title}. We are excited to have you!

Best,
The Team`}
className={`w-full h-32 bg-[#F3F4F6] border ${
  errors.welcomeMessage ? "border-red-500" : "border-[#E5E7EB]"
} rounded-lg px-3 py-2 text-sm`}          />
          {errors.welcomeMessage && (
  <p className="text-red-500 text-sm mt-1">
    {errors.welcomeMessage}
  </p>
)}
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
            placeholder={`Hi {name},

Thanks for registering for {event_title}. We are excited to have you!

Best,
The Team`}
className={`w-full h-32 bg-[#F3F4F6] border ${
  errors.thankYouMessage ? "border-red-500" : "border-[#E5E7EB]"
} rounded-lg px-3 py-2 text-sm`}          />

          {errors.thankYouMessage && (
  <p className="text-red-500 text-sm mt-1">
    {errors.thankYouMessage}
  </p>
)}

          <p className="text-xs text-[#9CA3AF] mb-2">Insert Field</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {[
              { label: "Add (name)", value: "{name}" },
              { label: "Add (event_link)", value: "{event_link}" },
              { label: "Add (button_attending_link)", value: "{button_attending_link}" }
            ].map((item, i) => (
              <button
                key={i}
                onClick={() => insertText("thankYouMessage", item.value)}
                className="px-3 py-1 text-xs border border-[#E5E7EB] rounded-md bg-white text-[#374151]"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* SUBMIT */}
        <button onClick={handleSubmit} className="w-full md:w-auto bg-[#CFA935] text-white text-sm px-4 md:px-6 py-3 rounded-full">
          Submit Event
        </button>

      </div>
    </div>
  );
}