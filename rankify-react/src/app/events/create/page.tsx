"use client";
import { useState, useEffect } from "react";   // 👈 add useEffect
import { getEvents, getEventDetails } from "@/services/event"; // 👈 ADD THIS LINE
import { useRouter } from "next/navigation";
import { Filter } from "lucide-react";
 
export default function CreateEventPage() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [events, setEvents] = useState<any[]>([]);
  const [page, setPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);
const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
const [eventDetails, setEventDetails] = useState<any>(null);
const [statusFilter, setStatusFilter] = useState("all");
const [contacts, setContacts] = useState<any[]>([]);
  useEffect(() => {
  fetchEvents();
}, [page]); // 👈 important
 
useEffect(() => {
  if (selectedEventId) {
    fetchEventDetails();
  }
}, [selectedEventId]);
 
const fetchEvents = async () => {
  try {
    const res = (await getEvents(page)) as any; // 👈 pass page
    console.log(res); // 👈 check data
  const data = res.data;
setEvents(data);
 
if (data.length > 0 && !selectedEventId) {
  setSelectedEventId(data[0].event_id);
}// 👈 IMPORTANT
    // 👇 total pages from API
setTotalPages(res.pagination?.total_pages || 1);
  } catch (err) {
    console.log(err);
  }
};
 
 
const fetchEventDetails = async () => {
  if (!selectedEventId) return;
 
  try {
    const res = (await getEventDetails(selectedEventId)) as any;
 
    // 🔥 FULL RESPONSE
    setEventDetails(res);
 
    // 🔥 Convert contacts object → array
    const contactsArray = Object.entries(res.contacts || {}).map(
      ([id, contact]: any) => ({
        ...contact,
        contact_id: Number(id),
      })
    );
 
    // 🔥 Merge with status data
    const mergedContacts = contactsArray.map((contact: any) => {
      const statusData = res.data.find(
        (d: any) => d.contact_id === contact.contact_id
      );
     
 
      return {
        ...contact,
        status: statusData?.webinar_status || "sent",
      };
    });
 
    setContacts(mergedContacts);
  } catch (err) {
    console.log(err);
  }
};
 
const firstTenEvents = events.slice(0, 10);
  const filteredContacts =
  statusFilter === "all"
    ? contacts
    : contacts.filter((c: any) => c.status === statusFilter);
 
 
 
  return (
    <div className="p-3 md:p-6 space-y-6 max-w-full overflow-hidden">
 
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
        <div>
          <h1 className="text-[18px] md:text-[20px] font-semibold text-[#1F2937]">
            Event Dashboard
          </h1>
          <p className="text-sm text-[#6B7280] mt-1">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </p>
        </div>
 
        {/* DROPDOWN */}
        <div className="relative w-full md:w-auto">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center justify-center md:justify-start gap-2 w-full md:w-auto bg-white hover:bg-gray-200 text-gray-700 px-5 py-3 rounded-xl shadow-sm transition"
          >
            <Filter className="w-4 h-6" />
            <span className="text-sm font-medium">Event Dashboard</span>
          </button>
 
          {open && (
            <div className="absolute right-0 mt-2 w-full md:w-52 bg-white border border-[#E5E7EB] rounded-lg shadow-md z-50">
 
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
 
      {/* ===== CARD 1 ===== */}
      <div className="bg-white border border-[#E5E7EB] rounded-lg p-4 md:p-5 shadow-sm">
 
        <h2 className="text-[13px] font-semibold text-[#374151] mb-4">
          All Events Overview
        </h2>
 
       <div className="overflow-x-auto w-full">
          <table className="min-w-[600px] w-full text-[11px] md:text-[12px]">
            <thead className="text-[#9CA3AF]">
  <tr className="[&>th]:py-4 [&>th]:text-left [&>th]:whitespace-nowrap">
    <th>Event #</th>
    <th>Title</th>
    <th>Date</th>
    <th>Targeted Users</th>
    <th>Registered</th>
  </tr>
</thead>
 
           
             
                <tbody className="text-[#1F2937]">
  {firstTenEvents.map((event: any) => (
    <tr
  key={event.event_id}
  className="border-t border-[#F1F1F1] [&>td]:py-4"
>
      <td className="py-4 whitespace-nowrap">{event.event_id}</td>
      <td className="py-4 whitespace-nowrap">{event.topic}</td>
      <td className="py-4 whitespace-nowrap">{event.event_date}</td>
      <td className="py-4 whitespace-nowrap">{event.targeted_users}</td>
      <td className="py-4 whitespace-nowrap">{event.registered_users}</td>
    </tr>
  ))}
</tbody>
           
          </table>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-6 gap-3">
  <p className="text-[12px] text-[#6B7280]">
    Page {page} · 10 per page
  </p>
 
  <div className="flex gap-2">
 
    <button
      onClick={() => setPage(page - 1)}
      disabled={page === 1}
      className={`px-4 py-2 text-[12px] rounded-lg border transition ${
        page === 1
          ? "text-gray-300 border-gray-200 cursor-not-allowed bg-gray-50"
          : "text-gray-600 border-gray-300 hover:bg-gray-100"
      }`}
    >
      Previous
    </button>
 
    <button
      onClick={() => setPage(page + 1)}
      disabled={page === totalPages}
      className={`px-4 py-2 text-[12px] rounded-lg border transition ${
        page === totalPages
          ? "text-gray-300 border-gray-200 cursor-not-allowed bg-gray-50"
          : "text-gray-600 border-gray-300 hover:bg-gray-100"
      }`}
    >
      Next
    </button>
 
  </div>
</div>
 
        <p className="text-[11px] text-[#D4A017] mt-3 cursor-pointer">
          ⬇ Download Events Summary (CSV)
        </p>
      </div>
 
      {/* ===== CARD 2 ===== */}
      <div className="bg-white border border-[#E5E7EB] rounded-lg p-4 md:p-5 shadow-sm">
 
        <h2 className="text-[13px] font-semibold text-[#374151] mb-4">
          Detailed Event Analytics
        </h2>
 
        {/* SELECT */}
        <select
  value={selectedEventId || ""}
  onChange={(e) => setSelectedEventId(Number(e.target.value))}
  className="w-full mb-3 border border-[#E5E7EB] rounded-md px-3 py-2 text-[12px] bg-[#F9FAFB]"
>
  {events.map((event: any) => (
    <option key={event.event_id} value={event.event_id}>
      {event.event_id}: {event.topic}
    </option>
  ))}
</select>
 
        <p className="text-[11px] text-[#9CA3AF] mb-3">
Showing targeted contacts for: {eventDetails?.topic || "No Event"}        </p>
 
        {/* LEGEND */}
        <div className="bg-[#F3F4F6] border border-[#E5E7EB] rounded-md p-4 mb-4">
          <p className="text-[12px] font-medium text-[#374151] mb-2">
            Webinar Status Legend
          </p>
 
          <div className="grid grid-cols-1 sm:grid-cols-1 gap-y-1 text-[11px] text-[#374151]">
            <p><span className="text-yellow-500">■</span> Email Sent - Awaiting Registration</p>
            <p><span className="text-green-500">■</span> Registered - Completed Webinar Registration</p>
            <p><span className="text-blue-500">■</span> Joined - Attended the Webinar</p>
            <p><span className="text-red-500">■</span> Not Joined - Registered but Did Not Attend</p>
          </div>
        </div>
 
        {/* FILTER */}
        <p className="text-[11px] text-[#9CA3AF] mb-1">
          Filter by Webinar Status
        </p>
 
        <select
  value={statusFilter}
  onChange={(e) => setStatusFilter(e.target.value)}
  className="w-full mb-4 border border-[#E5E7EB] rounded-md px-3 py-2 text-[12px] bg-[#F9FAFB]"
>
  <option value="all">All</option>
  <option value="sent">Email Sent</option>
  <option value="registered">Registered</option>
  <option value="joined">Joined</option>
  <option value="not_joined">Not Joined</option>
</select>
 
        {/* STATS */}
        {(() => {
          const stats = eventDetails?.status_breakdown || {};
          return (
<div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-4">
  {[
    { value: stats.email_sent || 0, label: "Email Sent" },
    { value: stats.registered || 0, label: "Registered" },
    { value: stats.joined || 0, label: "Joined" },
    { value: stats.not_joined || 0, label: "Not Joined" },
  ].map((item, i) => (
    <div key={i} className="border rounded-md p-3 text-center">
      <p className="text-[16px] font-semibold text-[#D4A017]">
        {item.value}
      </p>
      <p className="text-[11px] text-[#9CA3AF]">
        {item.label}
      </p>
    </div>
  ))}
</div>
          );
        })()}
 
        <p className="text-[11px] text-[#9CA3AF] mb-2">
  Showing {filteredContacts.length} contacts filtered view
</p>
 
        {/* TABLE */}
       <div className="overflow-x-auto w-full">
          <table className="min-w-[800px] w-full text-[11px] md:text-[12px]">
            <thead className="text-[#9CA3AF]">
              <tr>
                <th className="text-left py-2">Contact ID</th>
                <th className="text-left py-2">First Name</th>
                <th className="text-left py-2">Last Name</th>
                <th className="text-left py-2">Email</th>
                <th className="text-left py-2">Organization</th>
                <th className="text-left py-2">Status</th>
              </tr>
            </thead>
 
            <tbody className="text-[#1F2937]">
  {filteredContacts.map((contact: any) => (
    <tr key={contact.contact_id} className="border-t border-[#F1F1F1]">
 
      <td className="py-2 whitespace-nowrap">
        {contact.contact_id}
      </td>
 
      <td className="py-2 whitespace-nowrap">
        {contact.first_name}
      </td>
 
      <td className="py-2 whitespace-nowrap">
        {contact.last_name}
      </td>
 
      <td className="py-2 whitespace-nowrap">
        {contact.email}
      </td>
 
      <td className="py-2 whitespace-nowrap">
        {contact.organization}
      </td>
 
      <td className="py-2 whitespace-nowrap">
        {contact.status}
      </td>
 
    </tr>
  ))}
</tbody>
          </table>
 
           </div>
 
        {/* DOWNLOAD */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 mt-4 text-[11px] text-[#D4A017]">
          <p>⬇ Download Filtered Details (CSV)</p>
          <p>⬇ Download Filtered Details (Excel)</p>
        </div>
 
      </div>
    </div>
  );
}
 