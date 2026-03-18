"use client";

import LayoutShell from "@/components/common/LayoutShell";

export default function ImageGenerationPage() {
  return (
    
        <div className="p-2 space-y-2">
      {/* Header */}
        <div className="mb-3">
          <h1 className="text-2xl font-semibold text-[#111827]">
            Image Generation
          </h1>
          <p className="text-sm text-[#6B7280] mt-1">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-3 gap-6">

          {/* LEFT */}
          <div className="col-span-2 bg-white p-5 rounded-xl shadow space-y-4">
            <h2 className="font-semibold">
              Post Content (STRICT FORMAT)
            </h2>
             TITLE:
            <input placeholder="" className="w-full mt-2 bg-[#F3F4F6] border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm" />
             SUBTITLE:
            <input placeholder="" className="w-full mt-2 bg-[#F3F4F6] border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm" />
             Body:
            <textarea
              placeholder=""
              className="w-full h-32 bg-[#F3F4F6] border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm"
            />
             CTA BUTTON:
            <input placeholder="Start Now" className="w-full mt-2 bg-[#F3F4F6] border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm" />
          </div>

          {/* RIGHT */}
          <div className="bg-white p-5 rounded-xl shadow space-y-4">
            <h2 className="font-semibold">Configuration</h2>

            <select className="w-full border p-2 rounded">
              <option>Gemini 3 Pro Image Premium</option>
            </select>

            <div className="flex items-center gap-2">
              <button className="px-3 py-1 border rounded">-</button>
              <input value="1" className="w-full border p-2 rounded text-center" />
              <button className="px-3 py-1 border rounded">+</button>
            </div>

            <select className="w-full border p-2 rounded">
              <option>Aspect Ratio</option>
            </select>

            <select className="w-full border p-2 rounded">
              <option>Image Resolution</option>
            </select>

            <div className="border-2 border-dashed rounded-lg p-6 text-center text-sm text-gray-500">
              Drag and drop file here
            </div>

            <button className="w-full border rounded py-2">
              Browse files
            </button>
          </div>
        </div>

        {/* Button */}
        <button className="mt-4 w-220 bg-[#CFA935] text-white py-3 rounded-xl font-semibold">
          Generate Images
        </button>
    </div>

      
   
  );
}