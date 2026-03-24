"use client";
import { Filter } from "lucide-react";

export default function CreateEventPage() {
  return (
    <div className="p-3 md:p-6 space-y-6">

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

        {/* BUTTON */}
        <button className="flex items-center justify-center md:justify-start gap-2 w-full md:w-auto bg-white hover:bg-gray-200 text-gray-700 px-5 py-3 rounded-xl shadow-sm transition">
          <Filter className="w-4 h-6" />
          <span className="text-sm font-medium">Event Dashboard</span>
        </button>
      </div>

      {/* ===== CARD 1 ===== */}
      <div className="bg-white border border-[#E5E7EB] rounded-lg p-4 md:p-5 shadow-sm">

        <h2 className="text-[13px] font-semibold text-[#374151] mb-4">
          All Events Overview
        </h2>

        {/* TABLE SCROLL */}
        <div className="overflow-x-auto">
          <table className="min-w-[600px] w-full text-[12px]">
            <thead className="text-[#9CA3AF]">
              <tr>
                <th className="text-left py-2">Event #</th>
                <th className="text-left">Title</th>
                <th className="text-left">Date</th>
                <th className="text-left">Targeted Users</th>
                <th className="text-left">Registered</th>
              </tr>
            </thead>

            <tbody className="text-[#1F2937]">
              {[
                ["1","AI at Work: Live Business Problems, Real-Time Solutions","2026-02-19","6","6"],
                ["2","Applied AI: Real-World Problems, Live Solutions","2026-02-19","3","3"],
                ["3","Monthly Partner’s Meet – AI Edition","2026-02-19","6","6"],
                ["4","Operational AI: Solving Today’s Business Problems","2026-02-19","4","4"],
              ].map((row, i) => (
                <tr key={i} className="border-t border-[#F1F1F1]">
                  {row.map((cell, j) => (
                    <td key={j} className="py-2 whitespace-nowrap">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
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
        <select className="w-full mb-3 border border-[#E5E7EB] rounded-md px-3 py-2 text-[12px] bg-[#F9FAFB] text-[#374151]">
          <option>
            1: AI at Work: Live Business Problems, Real-Time Solutions
          </option>
        </select>

        <p className="text-[11px] text-[#9CA3AF] mb-3">
          Showing targeted contacts for: AI at Work: Live Business Problems, Real-Time Solutions
        </p>

        {/* LEGEND */}
        <div className="bg-[#F3F4F6] border border-[#E5E7EB] rounded-md p-4 mb-4">
          <p className="text-[12px] font-medium text-[#374151] mb-2">
            Webinar Status Legend
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1 text-[11px] text-[#374151]">
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

        <select className="w-full mb-4 border border-[#E5E7EB] rounded-md px-3 py-2 text-[12px] bg-[#F9FAFB]">
          <option>All (6)</option>
        </select>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          {[
            { value: 4, label: "Email Sent" },
            { value: 1, label: "Registered" },
            { value: 1, label: "Joined" },
            { value: 0, label: "Not Joined" },
          ].map((item, i) => (
            <div
              key={i}
              className="border border-[#E5E7EB] rounded-md p-3 text-center bg-white"
            >
              <p className="text-[16px] font-semibold text-[#D4A017]">
                {item.value}
              </p>
              <p className="text-[11px] text-[#9CA3AF]">
                {item.label}
              </p>
            </div>
          ))}
        </div>

        <p className="text-[11px] text-[#9CA3AF] mb-2">
          Showing 6 contacts filtered view
        </p>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="min-w-[800px] w-full text-[12px]">
            <thead className="text-[#9CA3AF]">
              <tr>
                <th className="text-left py-2">Contact ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Organization</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody className="text-[#1F2937]">
              {[
                ["2","Thomas","Nunez","thomas.nunez@unity3d.com","Unity","Sent"],
                ["5","Nicuqi","Malick","malick.nequi@datagalaxy.com","DataGalaxy","Sent"],
                ["6","Valentin","Nguyen","valentin.nguyen@photobuster.com","PhotonBuster","Sent"],
                ["8","Samuel","Akintola","s.akintola@verslog.fr","Verslog","Sent"],
                ["9","Yassine","Soulaimani","yassine.soulaimani@arcadi.it","Arcadi","Sent"],
                ["10","Mohamed","Sowabi","mohamed.sowabi@edubafrica.com","LinkWay","Sent"],
              ].map((row, i) => (
                <tr key={i} className="border-t border-[#F1F1F1]">
                  {row.map((cell, j) => (
                    <td key={j} className="py-2 whitespace-nowrap">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* DOWNLOAD */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 mt-4 text-[11px] text-[#D4A017]">
          <p>⬇ Download Filtered Details (CSV)</p>
          <p>⬇ Download Filtered Details (Excel)</p>
        </div>

      </div>
    </div>
  );
}