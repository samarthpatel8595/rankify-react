"use client";
import Link from "next/link";

export default function ImageGenerationPage() {
  return (
    <div className="p-3 md:p-6 space-y-6">

      {/* Header */}
      <div className="mb-5">
        <h1 className="text-[20px] md:text-[22px] font-semibold text-[#111827]">
          Image Generartion
        </h1>
        <p className="text-sm text-[#6B7280] mt-1">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* LEFT */}
        <div className="md:col-span-2 space-y-4">

          <div className="bg-white p-4 md:p-5 rounded-xl border border-[#E5E7EB]">

            <h2 className="text-sm font-semibold text-[#374151] mb-4">
              Post Content (STRICT FORMAT)
            </h2>

            {/* TITLE */}
            <label className="text-xs text-[#6B7280]">TITLE:</label>
            <input
              defaultValue="Future-Proof Your Career with AI CERTs®"
              className="w-full mt-1 mb-4 bg-[#F3F4F6] border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm"
            />

            {/* SUBTITLE */}
            <label className="text-xs text-[#6B7280]">SUBTITLE:</label>
            <input
              defaultValue="Become Certified. Become AI-Ready."
              className="w-full mt-1 mb-4 bg-[#F3F4F6] border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm"
            />

            {/* BODY */}
            <label className="text-xs text-[#6B7280]">BODY:</label>
            <textarea
              className="w-full h-32 mt-1 mb-4 bg-[#F3F4F6] border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm"
            />

            {/* CTA */}
            <label className="text-xs text-[#6B7280]">CTA BUTTON:</label>
            <input
              defaultValue="Start Now"
              className="w-full mt-1 bg-[#F3F4F6] border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm"
            />
          </div>

          {/* BUTTON */}
          <button className="w-full bg-[#C9A227] text-white py-3 rounded-xl font-medium">
            ✨ Generate Images
          </button>
        </div>

        {/* RIGHT */}
        <div className="bg-white p-4 md:p-5 rounded-xl border border-[#E5E7EB]">

          <h2 className="text-sm font-semibold text-[#374151] mb-4">
            ✨ Configuration
          </h2>

          {/* MODEL */}
          <label className="text-xs text-[#6B7280]">Gemini Model</label>
          <select className="w-full mt-1 mb-4 bg-[#F3F4F6] border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm">
            <option>Gemini 3 Pro Image Premium Gener</option>
          </select>

          {/* NUMBER */}
          <label className="text-xs text-[#6B7280]">Number of Images</label>
          <div className="flex items-center gap-2 mt-1 mb-4">
            <button className="w-8 h-8 border border-[#E5E7EB] rounded-md">-</button>
            <input
              value="1"
              readOnly
              className="flex-1 border border-[#E5E7EB] rounded-lg text-center py-1 bg-[#F3F4F6]"
            />
            <button className="w-8 h-8 border border-[#E5E7EB] rounded-md">+</button>
          </div>

          {/* ASPECT */}
          <label className="text-xs text-[#6B7280]">Aspect Ratio</label>
          <select className="w-full mt-1 mb-4 bg-[#F3F4F6] border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm">
            <option></option>
          </select>

          {/* RESOLUTION */}
          <label className="text-xs text-[#6B7280]">Image Resolution</label>
          <select className="w-full mt-1 mb-4 bg-[#F3F4F6] border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm">
            <option></option>
          </select>

          {/* UPLOAD */}
          <label className="text-xs text-[#6B7280]">Upload Logo (Optional)</label>
          <div className="mt-1 border-2 border-dashed border-[#E5E7EB] rounded-xl p-4 md:p-6 text-center text-[#6B7280] text-sm">
            ⬆️
            <p className="mt-2">Drag and drop file here</p>
            <p className="text-xs mt-1">Limit 200MB per file • PNG, JPG, ...</p>
          </div>

          <button className="w-full mt-3 border border-[#E5E7EB] rounded-lg py-2 text-sm">
            Browse files
          </button>
        </div>
      </div>
    </div>
  );
}